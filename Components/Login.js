'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, registerUser } from './LoginService';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const router = useRouter();

  const toggleMode = () => {
    // Create a smooth transition by first setting loading to clear the form
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setError('');
    setShowForgotPassword(false);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await loginUser(username, password);

        if (response && !response.errorMessage) {
          // Ensure firstName and lastName are present in the response

          // Redirect to dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
          return;
        }
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (password.length < 8) {
          setError('Password must be at least 8 characters long');
          setLoading(false);
          return;
        }
        
        response = await registerUser(username, password, firstName, lastName);

        if (response && !response.errorMessage) {
        
          // Redirect to login page
          setTimeout(() => {
            setIsLogin(true);
          }, 500);
          return;
        }
      }

      if (response && response.errorMessage) {
        setError(response.errorMessage);
        return;
      }

      if (response) {
        // Show success animation before redirecting
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } else {
        setError('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Main container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  };
  
  // Individual field animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Simplified animations to ensure they work properly
  const formVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const renderLoginSignupForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-blue-800">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="mt-2 text-sm text-blue-600">
          {isLogin ? 'Sign in to your account' : 'Fill in your details to get started'}
        </p>
      </div>
      
      <div className="min-h-[48px]"> {/* Reserve space for the error message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black"
              placeholder="username"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                Password
              </label>
              {isLogin && (
                <div className="text-sm">
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black"
            />
            {!isLogin && (
              <p className="mt-1 text-xs text-blue-500">Password must be at least 8 characters</p>
            )}
          </div>
          
          {!isLogin && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-black"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-blue-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-blue-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign in' : 'Create account'
            )}
          </button>
        </motion.div>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-blue-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <motion.button 
            type="button"
            onClick={toggleMode} 
            className="font-medium text-blue-700 hover:text-blue-900 underline focus:outline-none transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </motion.button>
        </p>
      </div>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-blue-800">Reset Password</h1>
        <p className="mt-2 text-sm text-blue-600">
          Enter your email to receive a password reset link
        </p>
      </div>
      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}
      
      {resetSent ? (
        <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
          <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-bold text-green-800 mb-2">Reset Link Sent</h3>
          <p className="text-green-700">
            We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleForgotPassword}>
          <div>
            <label htmlFor="forgotEmail" className="block text-sm font-medium text-blue-700">
              Email Address
            </label>
            <input
              id="forgotEmail"
              name="forgotEmail"
              type="email"
              autoComplete="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <motion.button
              type="submit"
              disabled={loading}
              className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setResetSent(false);
                setForgotEmail('');
                setError('');
              }}
              className="py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <motion.div 
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {showForgotPassword ? renderForgotPasswordForm() : renderLoginSignupForm()}
      </motion.div>
    </div>
  );
};

export default Login;