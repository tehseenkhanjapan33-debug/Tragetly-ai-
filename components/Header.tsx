
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Tragetly AI
          </Link>
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-text-secondary hidden sm:inline">Welcome, {user?.email}</span>
                <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Button onClick={handleLogout} size="sm" variant="secondary">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                  Login
                </Link>
                <Button onClick={() => navigate('/signup')} size="sm">
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
