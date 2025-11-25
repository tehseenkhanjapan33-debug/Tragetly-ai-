
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { useToast } from '../context/ToastContext';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError('');
    setIsLoading(true);
    const success = await signup(email, password);
    setIsLoading(false);
    if (success) {
      addToast('Account created successfully! Please verify your email.', 'success');
      navigate('/dashboard');
    } else {
      setError('An account with this email already exists.');
      addToast('An account with this email already exists.', 'error');
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
              sign in to an existing account
            </Link>
          </p>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
                Sign up
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
