import React, { useState } from 'react';
import { Book } from 'lucide-react';

// API configuration
const API_BASE_URL = 'http://localhost:8000';

const api = {
  login: async (email, password) => {
    // TODO: Step 2 - Implement authentication
    return { user: { name: 'Demo User', email } };
  },
  
  signup: async (name, email, password) => {
    // TODO: Step 2 - Implement authentication
    return { user: { name, email } };
  },
  
  // TODO: Step 3 - Recipe CRUD APIs
  // TODO: Step 5 - Meal Plan APIs
};

const RecipeManager = () => {
  const [user, setUser] = useState(null);

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
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Recipe management features coming soon...</p>
          {/* TODO: Step 3 - Add Recipe CRUD UI */}
          {/* TODO: Step 4 - Add Search and Filter */}
          {/* TODO: Step 5 - Add Meal Planner */}
          {/* TODO: Step 6 - Add Shopping List */}
        </div>
      </main>
    </div>
  );
};

const AuthScreen = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (isLogin) {
      const result = await api.login(email, password);
      onAuth(result.user);
    } else {
      const result = await api.signup(name, email, password);
      onAuth(result.user);
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
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
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