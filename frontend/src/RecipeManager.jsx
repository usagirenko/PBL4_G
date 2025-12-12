import React, { useState, useEffect } from 'react';
import { Book, Plus, Edit2, Trash2, X, Search, Calendar, LogOut, User, ShoppingCart } from 'lucide-react';


// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";


const api = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Login failed' };

const RecipesView = ({ recipes, loading, searchQuery, setSearchQuery, selectedTags, setSelectedTags, allTags, onAddRecipe, onEditRecipe, onDeleteRecipe }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Recipes</h2>
        <button 
          onClick={onAddRecipe} 
          className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Recipe</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search recipes or ingredients..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
          />
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => setSelectedTags(
                  selectedTags.includes(tag) 
                    ? selectedTags.filter(t => t !== tag) 
                    : [...selectedTags, tag]
                )} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedTags.includes(tag) 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Active Filters Display */}
        {(searchQuery || selectedTags.length > 0) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing {recipes.length} result{recipes.length !== 1 ? 's' : ''}</span>
            {(searchQuery || selectedTags.length > 0) && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
                className="text-orange-500 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          {searchQuery || selectedTags.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Clear Filters
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes yet</h3>
              <p className="text-gray-500 mb-6">Start building your recipe collection!</p>
              <button 
                onClick={onAddRecipe}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Add Your First Recipe
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEditRecipe(recipe)} 
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => onDeleteRecipe(recipe.id)} 
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ShoppingListView = ({ shoppingList, setShoppingList }) => {
  const toggleItem = (index) => {
    setShoppingList(shoppingList.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  const uncheckedCount = shoppingList.filter(item => !item.checked).length;
  const totalCount = shoppingList.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Shopping List</h2>
        {totalCount > 0 && (
          <div className="text-sm text-gray-600">
            {uncheckedCount} of {totalCount} items remaining
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {shoppingList.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items in your list</h3>
            <p className="text-gray-500">Add recipes to your meal planner to generate a shopping list</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {shoppingList.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition group"
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => toggleItem(index)} 
                    className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer" 
                  />
                  <span className={`flex-1 text-lg ${
                    item.checked 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-800'
                  }`}>
                    {item.item}
                  </span>
                  {item.count > 1 && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.checked 
                        ? 'bg-gray-100 text-gray-400' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      ×{item.count}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {totalCount > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShoppingList(shoppingList.map(item => ({ ...item, checked: true })))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
                  >
                    Check All
                  </button>
                  <button
                    onClick={() => setShoppingList(shoppingList.map(item => ({ ...item, checked: false })))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
                  >
                    Uncheck All
                  </button>
                  <button
                    onClick={() => setShoppingList(shoppingList.filter(item => !item.checked))}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    Clear Checked
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const RecipeFormModal = ({ recipe, onClose, onSave }) => {
  const [title, setTitle] = useState(recipe?.title || '');
  const [image, setImage] = useState(recipe?.image || '');
  const [tags, setTags] = useState(recipe?.tags?.join(', ') || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients?.join('\n') || '');
  const [instructions, setInstructions] = useState(recipe?.instructions || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    setError('');
    
    if (!title.trim()) {
      setError('Recipe title is required');
      return;
    }
    if (!ingredients.trim()) {
      setError('Ingredients are required');
      return;
    }
    if (!instructions.trim()) {
      setError('Instructions are required');
      return;
    }

    onSave({
      title: title.trim(),
      image: image.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      ingredients: ingredients.split('\n').map(i => i.trim()).filter(Boolean),
      instructions: instructions.trim()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {recipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Title *
              </label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Spaghetti Carbonara"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input 
                type="url" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <input 
                type="text" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                placeholder="e.g., Italian, Dinner, Quick"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients (one per line) *
              </label>
              <textarea 
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)} 
                rows={6}
                placeholder="200g spaghetti&#10;100g pancetta&#10;2 eggs&#10;50g parmesan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions *
              </label>
              <textarea 
                value={instructions} 
                onChange={(e) => setInstructions(e.target.value)} 
                rows={6}
                placeholder="1. Cook pasta according to package directions...&#10;2. While pasta cooks, fry pancetta...&#10;3. Mix eggs and parmesan..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={onClose} 
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                {recipe ? 'Update Recipe' : 'Create Recipe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MealPlannerView = ({ recipes, mealPlan, setMealPlan, onSavePlan }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  const addRecipeToMeal = (day, meal, recipeId) => {
    const newPlan = {
      ...mealPlan,
      [day]: {
        ...(mealPlan[day] || {}),
        [meal]: recipeId
      }
    };
    setMealPlan(newPlan);
    onSavePlan(newPlan);
  };

  const removeRecipeFromMeal = (day, meal) => {
    const newPlan = { ...mealPlan };
    if (newPlan[day]) {
      delete newPlan[day][meal];
      if (Object.keys(newPlan[day]).length === 0) {
        delete newPlan[day];
      }
    }
    setMealPlan(newPlan);
    onSavePlan(newPlan);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Weekly Meal Planner</h2>
      
      {recipes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes available</h3>
          <p className="text-gray-500">Add some recipes first to start planning your meals</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Day</th>
                {meals.map(meal => (
                  <th key={meal} className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                    {meal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{day}</td>
                  {meals.map(meal => {
                    const recipeId = mealPlan[day]?.[meal];
                    const recipe = recipes.find(r => r.id === recipeId);
                    return (
                      <td key={meal} className="p-3">
                        {recipe ? (
                          <div className="bg-orange-100 rounded-lg p-3 relative">
                            <p className="text-sm font-medium text-gray-800 pr-6">{recipe.title}</p>
                            {recipe.tags && recipe.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {recipe.tags.slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <button 
                              onClick={() => removeRecipeFromMeal(day, meal)} 
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <select 
                            onChange={(e) => {
                              if (e.target.value) {
                                addRecipeToMeal(day, meal, parseInt(e.target.value));
                                e.target.value = '';
                              }
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white hover:border-orange-400 transition"
                          >
                            <option value="">+ Add recipe</option>
                            {recipes.map(r => (
                              <option key={r.id} value={r.id}>{r.title}</option>
                            ))}
                          </select>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },
  
  signup: async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Signup failed' };
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },
  
  // TODO: Step 3 - Recipe CRUD APIs
  getRecipes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Failed to fetch recipes' };
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },

  createRecipe: async (recipe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Failed to create recipe' };
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },

  updateRecipe: async (id, recipe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Failed to update recipe' };
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },

  deleteRecipe: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const data = await response.json();
        return { error: data.detail || 'Failed to delete recipe' };
      }
      return { success: true };
    } catch (err) {
      return { error: 'Network error' };
    }
  },
  
  // Step 5 - Meal Plan APIs
  getMealPlan: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/meal-plan`);
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Failed to fetch meal plan' };
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },

  updateMealPlan: async (plan) => {
    try {
      const response = await fetch(`${API_BASE_URL}/meal-plan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan)
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.detail || 'Failed to update meal plan' };
      }
      return data;
    } catch (err) {
      return { error: 'Network error' };
    }
  },
};

const RecipeManager = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentView, setCurrentView] = useState('recipes');
  const [mealPlan, setMealPlan] = useState({});
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    if (user) {
      loadRecipes();
      loadMealPlan();
    }
  }, [user]);

  useEffect(() => {
    generateShoppingList();
  }, [mealPlan, recipes]);

  const loadRecipes = async () => {
    setLoading(true);
    setError('');
    const result = await api.getRecipes();
    if (result.error) {
      setError(result.error);
    } else {
      setRecipes(result.recipes || result);
    }
    setLoading(false);
  };

  const loadMealPlan = async () => {
    const result = await api.getMealPlan();
    if (result.error) {
      console.error('Failed to load meal plan:', result.error);
    } else {
      setMealPlan(result.plan || result);
    }
  };

  const generateShoppingList = () => {
    const ingredients = {};
    
    // Collect all ingredients from meal plan
    Object.values(mealPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(recipeId => {
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe && recipe.ingredients) {
          recipe.ingredients.forEach(ing => {
            ingredients[ing] = (ingredients[ing] || 0) + 1;
          });
        }
      });
    });
    
    // Convert to array format
    const list = Object.entries(ingredients).map(([item, count]) => ({
      item,
      count,
      checked: false
    }));
    
    setShoppingList(list);
  };

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setShowRecipeForm(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowRecipeForm(true);
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }
    const result = await api.deleteRecipe(id);
    if (result.error) {
      setError(result.error);
    } else {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  };

  const handleSaveRecipe = async (recipe) => {
    setError('');
    if (editingRecipe) {
      const result = await api.updateRecipe(editingRecipe.id, recipe);
      if (result.error) {
        setError(result.error);
      } else {
        setRecipes(recipes.map(r => r.id === editingRecipe.id ? result : r));
        setShowRecipeForm(false);
      }
    } else {
      const result = await api.createRecipe(recipe);
      if (result.error) {
        setError(result.error);
      } else {
        setRecipes([...recipes, result]);
        setShowRecipeForm(false);
      }
    }
  };

  // Filter recipes based on search query and selected tags
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = searchQuery === '' || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => recipe.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Get all unique tags from recipes
  const allTags = [...new Set(recipes.flatMap(r => r.tags || []))];

  if (!user) {
    return <AuthScreen onAuth={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Book className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-800">Recipe Manager</h1>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setCurrentView('recipes')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  currentView === 'recipes' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Book className="w-5 h-5" />
                <span>Recipes</span>
              </button>
              <button 
                onClick={() => setCurrentView('planner')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  currentView === 'planner' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Meal Planner</span>
              </button>
              <button 
                onClick={() => setCurrentView('shopping')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  currentView === 'shopping' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shopping List</span>
              </button>
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span>{user.name}</span>
              </div>
              <button onClick={() => setUser(null)} className="text-gray-500 hover:text-red-500">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {currentView === 'recipes' && (
          <RecipesView
            recipes={filteredRecipes}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            allTags={allTags}
            onAddRecipe={handleAddRecipe}
            onEditRecipe={handleEditRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        )}

        {currentView === 'planner' && (
          <MealPlannerView
            recipes={recipes}
            mealPlan={mealPlan}
            setMealPlan={setMealPlan}
            onSavePlan={async (plan) => {
              const result = await api.updateMealPlan(plan);
              if (result.error) {
                setError(result.error);
              }
            }}
          />
        )}

        {currentView === 'shopping' && (
          <ShoppingListView
            shoppingList={shoppingList}
            setShoppingList={setShoppingList}
          />
        )}
        
      </main>

      {showRecipeForm && (
        <RecipeFormModal
          recipe={editingRecipe}
          onClose={() => setShowRecipeForm(false)}
          onSave={handleSaveRecipe}
        />
      )}
    </div>
  );
};

const AuthScreen = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }
    if (!isLogin && !name) {
      setError('Name is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const result = await api.login(email, password);
        if (result.error) {
          setError(result.error);
        } else {
          onAuth(result.user);
        }
      } else {
        const result = await api.signup(name, email, password);
        if (result.error) {
          setError(result.error);
        } else {
          onAuth(result.user);
        }
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Book className="w-10 h-10 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800">Recipe Manager</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
          />
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-orange-500 font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecipeManager;