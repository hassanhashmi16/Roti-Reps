'use client'
import React, { useState } from 'react';
import { Target, Weight, ChefHat, Package, ArrowLeft, Sparkles, Ruler, Loader2, Notebook, Pen } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';


// MealCard component for displaying individual meals
const MealCard = ({ title, dish, steps, macros }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <div className="text-base text-gray-400 bg-white/10 rounded-full px-4 py-2 font-medium">
                {macros}
            </div>
        </div>
        <h4 className="text-xl font-medium text-yellow-400 mb-4">{dish}</h4>
        <div className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
            {steps}
        </div>
    </div>
);

const Page = () => {
    // Form state variables
    const [goal, setGoal] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [pantryItems, setPantryItems] = useState(true);

    // Loading and response state
    const [loading, setLoading] = useState(false);
    const [mealPlan, setMealPlan] = useState(null); // Changed from response to mealPlan
    const [error, setError] = useState('');

    // Handle form submission and API call
    const handleClick = async () => {
        // Clear previous responses
        setMealPlan(null);
        setError('');
        setLoading(true);

        try {
            const res = await axios.post("/api/AIResponse", {
                goal,
                weight,
                height,
                ingredients,
                suggestions,
                pantryItems
            });

            // Check if the response is successful
            if (res.data.success && res.data.mealPlan) {
                setMealPlan(res.data.mealPlan);
                console.log('Meal plan received:', res.data.mealPlan);
            } else {
                throw new Error(res.data.message || 'Failed to generate meal plan');
            }

        } catch (error) {
            // Handle errors
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again!";
            setError(errorMessage);
            console.error("API Error:", error);

        } finally {
            // Stop loading spinner
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/20 to-black">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-60 right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 py-8">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href='/home'>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Home</span>
                        </button>
                    </Link>
                    <div className="flex items-center space-x-3">
                        <ChefHat className="w-8 h-8 text-yellow-400" />
                        <span className="text-xl font-bold text-white">Roti & Reps</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Create Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400"> Perfect Meal</span>
                        </h1>
                        <p className="text-gray-300 text-lg">Tell us about your goals and ingredients - we will handle the rest</p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 space-y-10">

                        {/* Goal Selection */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Target className="w-5 h-5 text-yellow-400" />
                                <label className="text-md font-semibold text-white">Choose your goal</label>
                            </div>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all appearance-none cursor-pointer"
                                disabled={loading}
                            >
                                <option value="" disabled className="bg-gray-800 text-gray-300">Pick your fitness goal</option>
                                <option value="cut" className="bg-gray-800 text-white">🔥 Cut - Lose fat while maintaining muscle</option>
                                <option value="bulk" className="bg-gray-800 text-white">💪 Bulk - Build muscle and gain weight</option>
                                <option value="maintain" className="bg-gray-800 text-white">⚖️ Maintain - Stay at current weight</option>
                            </select>
                        </div>

                        {/* Weight Input */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Weight className="w-5 h-5 text-amber-400" />
                                <label className="text-md font-semibold text-white">Enter your weight</label>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Enter weight in kg"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Height Input */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Ruler className="w-5 h-5 text-amber-400" />
                                <label className="text-md font-semibold text-white">Enter your height</label>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="Enter height in cm"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Ingredients Input */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <ChefHat className="w-5 h-5 text-orange-400" />
                                <label className="text-md font-semibold text-white">What ingredients do you have?</label>
                            </div>
                            <textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                placeholder="e.g., paneer, chicken, spinach, onions, tomatoes, masala..."
                                rows={5}
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all resize-none"
                                disabled={loading}
                            />
                        </div>

                        {/* Suggestions */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Pen className="w-5 h-5 text-orange-400" />
                                <label className="text-md font-semibold text-white">Suggestions</label>
                            </div>
                            <textarea
                                value={suggestions}
                                onChange={(e) => setSuggestions(e.target.value)}
                                placeholder="Any specific preferences or requirements..."
                                rows={5}
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition-all resize-none"
                                disabled={loading}
                            />
                        </div>

                        {/* Pantry Toggle */}
                        <div className="flex items-center justify-between p-8 bg-white/5 rounded-xl border border-white/10">
                            <div className="flex items-center space-x-3">
                                <Package className="w-5 h-5 text-yellow-400" />
                                <div>
                                    <p className="text-white font-medium text-md">Include basic pantry items?</p>
                                    <p className="text-gray-400 text-base">Rice, oil, basic spices, salt, etc.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={pantryItems}
                                    onChange={(e) => setPantryItems(e.target.checked)}
                                    className="sr-only peer"
                                    disabled={loading}
                                />
                                <div className="w-12 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300/20 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-amber-500"></div>
                            </label>
                        </div>

                        {/* Generate Button with Loading State */}
                        <button
                            className="group relative w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold py-5 px-8 rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            onClick={handleClick}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span className="text-xl">Generating Your Meals...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6" />
                                    <span className="text-xl">Generate My Desi Meals</span>
                                </>
                            )}

                            {/* Button glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                        </button>

                        {/* Helper Text */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                Our AI will create personalized desi recipes based on your goals and available ingredients
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-8 bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <p className="text-red-300 font-medium">Error</p>
                            </div>
                            <p className="text-red-200 mt-2">{error}</p>
                        </div>
                    )}

                    {/* AI Response Display - Updated to handle new structure */}
                    {mealPlan && mealPlan.meals && (
                        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
                            <div className="flex items-center space-x-3 mb-8">
                                <ChefHat className="w-8 h-8 text-yellow-400" />
                                <h2 className="text-3xl font-bold text-white">Your Personalized Desi Meal Plan</h2>
                            </div>

                            {/* Response content with better formatting */}
                            <div className="space-y-4">
                                {mealPlan.meals.map((meal, i) => (
                                    <MealCard
                                        key={i}
                                        title={`${meal.emoji || ''} ${meal.type}`.replace(/snack\s+snack/i, 'Snack').replace(/\s+/g, ' ').trim()}
                                        dish={meal.dish}
                                        steps={meal.recipe}
                                        macros={`${meal.macros.protein}g P, ${meal.macros.carbs}g C, ${meal.macros.calories} cal`}
                                    />
                                ))}
                            </div>

                            {/* Generate another button */}
                            <button
                                onClick={handleClick}
                                className="mt-8 bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-xl transition-colors flex items-center space-x-2 text-lg font-medium"
                                disabled={loading}
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Generate Another Plan</span>
                            </button>
                        </div>
                    )}

                    {/* Info Cards - Only show when not loading and no response */}
                    {!loading && !mealPlan && (
                        <div className="grid md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center">
                                <div className="text-yellow-400 font-bold text-lg">30+</div>
                                <div className="text-gray-400 text-sm">Recipe Variations</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center">
                                <div className="text-amber-400 font-bold text-lg">5 sec</div>
                                <div className="text-gray-400 text-sm">Generation Time</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center">
                                <div className="text-orange-400 font-bold text-lg">100%</div>
                                <div className="text-gray-400 text-sm">Desi Authentic</div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Page;