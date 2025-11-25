
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Target, CreditCard, BarChart2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  
  const handleCreateCampaign = () => {
    if (isAuthenticated) {
      navigate('/create-campaign');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text tracking-tight">
          Create social campaigns from <span className="text-primary">$0.10</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary">
          Reach your target audience effectively and affordably. Tragetly AI helps you launch, manage, and track high-performing social media campaigns with ease.
        </p>
        <div className="mt-8">
          <Button onClick={handleCreateCampaign} size="lg">
            Create Campaign Now
          </Button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text">How It Works</h2>
            <p className="mt-2 text-text-secondary">A simple, three-step process to get your campaign live.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white rounded-full p-4 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create</h3>
              <p className="text-text-secondary">Define your campaign objective, select your platform, and pinpoint your target audience with our precise targeting options.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white rounded-full p-4 mb-4">
                <CreditCard size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Pay</h3>
              <p className="text-text-secondary">Fund your campaign with a secure crypto payment. Simply send USDT and confirm your transaction to activate.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-white rounded-full p-4 mb-4">
                <BarChart2 size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Track</h3>
              <p className="text-text-secondary">Monitor your campaign's performance in real-time through our intuitive dashboard. Watch your views, leads, and sales grow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
