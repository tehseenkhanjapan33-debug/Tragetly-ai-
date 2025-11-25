
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { useToast } from '../context/ToastContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('user@tragetly.ai');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      addToast('Login successful!', 'success');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
      addToast('Invalid email or password.', 'error');
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-hover">
              create a new account
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-gray-500">
            Hint: use user@tragetly.ai / user123 or admin@tragetly.ai / admin123
          </p>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
                Sign in
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
