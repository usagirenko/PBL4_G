import React, { useState, useEffect } from 'react';
import { Book, Plus, Edit2, Trash2, X } from 'lucide-react';

// API configuration
const API_BASE_URL = 'http://localhost:8000';

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

const RecipesView = ({ recipes, loading, onAddRecipe, onEditRecipe, onDeleteRecipe }) => {
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

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes yet</h3>
          <p className="text-gray-500 mb-6">Start building your recipe collection!</p>
          <button 
            onClick={onAddRecipe}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Add Your First Recipe
          </button>
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
  
  // TODO: Step 5 - Meal Plan APIs
};

const RecipeManager = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    if (user) {
      loadRecipes();
    }
  }, [user]);

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

  if (!user) {
    return <AuthScreen onAuth={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Book className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">Recipe Manager</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <RecipesView
          recipes={recipes}
          loading={loading}
          onAddRecipe={handleAddRecipe}
          onEditRecipe={handleEditRecipe}
          onDeleteRecipe={handleDeleteRecipe}
        />
        
        {/* TODO: Step 4 - Add Search and Filter */}
        {/* TODO: Step 5 - Add Meal Planner */}
        {/* TODO: Step 6 - Add Shopping List */}
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