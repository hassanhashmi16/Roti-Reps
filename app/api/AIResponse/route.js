import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
    try {
        const { goal, weight, height, ingredients, suggestions, pantryItems } = await request.json();

        if (!goal || !weight || !ingredients) {
            return NextResponse.json({
                message: "Please fill all of the input fields"
            }, { status: 400 });
        }

        let items = pantryItems ? "have the pantry items eg rice,oil, spices, salt etc" : "do not have the pantry items eg rice,oil, spices, salt etc";

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API || "");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-001",
            tools: [
                {
                    codeExecution: {},
                },
            ],
        });

        const prompt = `
You are a desi meal planning assistant.
Return ONLY valid JSON in the following format, no extra text.

{
  "meals": [
    {
      "type": "Breakfast",
      "emoji": "🌅",
      "dish": "Paneer Bhurji",
      "recipe": "Step 1... Step 2...",
      "macros": { "protein": 25, "carbs": 30, "calories": 350 }
    },
    {
      "type": "Lunch",
      "emoji": "🍽️",
      "dish": "Chicken Curry",
      "recipe": "Step 1... Step 2...",
      "macros": { "protein": 40, "carbs": 45, "calories": 500 }
    }
  ]
}

User Details:
- Goal: ${goal}
- Weight: ${weight}kg  
- Height: ${height}cm
- Available Ingredients: ${ingredients}
- Pantry Access: ${items}
- Suggestions: ${suggestions}


Rules:
- Follow the JSON structure exactly
- No extra text or explanation
- Recipes must be desi-style and match the fitness goal
- Macros are integers only
- Include Breakfast, Lunch, Dinner, and optionally Snack
`;

        const result = await model.generateContent(prompt);
        let aiResponseText = result.response.text();
        
        // Clean up the response text (remove any markdown formatting or extra text)
        aiResponseText = aiResponseText.trim();
        
        // Remove any potential markdown code blocks
        if (aiResponseText.startsWith('```json')) {
            aiResponseText = aiResponseText.replace(/```json\n?/g, '').replace(/\n?```$/g, '');
        } else if (aiResponseText.startsWith('```')) {
            aiResponseText = aiResponseText.replace(/```\n?/g, '').replace(/\n?```$/g, '');
        }
        
        // Parse the JSON response
        let parsedMealPlan;
        try {
            parsedMealPlan = JSON.parse(aiResponseText);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            console.error('Raw response:', aiResponseText);
            
            return NextResponse.json({
                message: "Failed to parse AI response. Please try again.",
                error: "Invalid JSON format from AI"
            }, { status: 500 });
        }
        
        // Validate the parsed response structure
        if (!parsedMealPlan.meals || !Array.isArray(parsedMealPlan.meals)) {
            return NextResponse.json({
                message: "Invalid meal plan format received from AI",
                error: "Missing or invalid meals array"
            }, { status: 500 });
        }
        
        // Return the parsed meal plan
        return NextResponse.json({
            success: true,
            mealPlan: parsedMealPlan,
            message: "Meal plan generated successfully"
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            message: "Something went wrong fetching AI response",
            error: error.message
        }, { status: 500 });
    }
}