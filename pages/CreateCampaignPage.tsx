
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clipboard, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCampaigns } from '../hooks/useCampaigns';
import { useToast } from '../context/ToastContext';
import { Objective, Platform, Gender, Audience } from '../types';
import { OBJECTIVES, PLATFORMS, GENDERS, USDT_WALLET_ADDRESS } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';

const CreateCampaignPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { addCampaign, updateCampaignStatus } = useCampaigns();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [campaignName, setCampaignName] = useState('');
  const [objective, setObjective] = useState<Objective>(Objective.Views);
  const [platform, setPlatform] = useState<Platform>(Platform.Instagram);
  const [mediaUrl, setMediaUrl] = useState('');
  const [budget, setBudget] = useState(0.1);
  const [audience, setAudience] = useState<Audience>({
    ageRange: [18, 65],
    gender: Gender.All,
    interests: [],
  });
  const [interestsInput, setInterestsInput] = useState('');
  const [paymentHash, setPaymentHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [createdCampaignId, setCreatedCampaignId] = useState<string | null>(null);

  const handleAudienceChange = <K extends keyof Audience,>(key: K, value: Audience[K]) => {
    setAudience(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateCampaign = () => {
    if (budget < 0.1) {
      addToast('Budget must be at least $0.10', 'error');
      return;
    }
    if (!campaignName || !mediaUrl) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    const interests = interestsInput.split(',').map(i => i.trim()).filter(Boolean);
    const newCampaign = addCampaign({
      name: campaignName,
      objective,
      platform,
      mediaUrl,
      budget,
      audience: { ...audience, interests },
    });
    setCreatedCampaignId(newCampaign.id);
    if (isAdmin) {
      updateCampaignStatus(newCampaign.id, 'Active');
      addToast('Admin campaign created and activated!', 'success');
      navigate('/dashboard');
    } else {
      setFormStep(2);
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentHash) {
      addToast('Please enter a transaction hash', 'error');
      return;
    }
    if (!createdCampaignId) return;

    setIsLoading(true);
    // Simulate payment confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateCampaignStatus(createdCampaignId, 'Active', paymentHash);
    setIsLoading(false);
    addToast('Payment confirmed! Your campaign is now active.', 'success');
    navigate('/dashboard');
  };
  
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(USDT_WALLET_ADDRESS);
    addToast('Wallet address copied to clipboard!', 'info');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Campaign</h1>
      {formStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <Input label="Campaign Name" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="e.g. Summer Sale Promotion" required />
                <Select label="Objective" value={objective} onChange={e => setObjective(e.target.value as Objective)}>
                  {OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
                </Select>
                <Select label="Platform" value={platform} onChange={e => setPlatform(e.target.value as Platform)}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
                <Input label="Media/Link URL" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="https://..." type="url" required />
                <Input label="Budget (USDT)" value={budget} onChange={e => setBudget(parseFloat(e.target.value))} type="number" min="0.1" step="0.01" required />
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold mb-4">Targeting</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Min Age" type="number" value={audience.ageRange[0]} onChange={e => handleAudienceChange('ageRange', [parseInt(e.target.value), audience.ageRange[1]])} />
                  <Input label="Max Age" type="number" value={audience.ageRange[1]} onChange={e => handleAudienceChange('ageRange', [audience.ageRange[0], parseInt(e.target.value)])} />
                </div>
                <Select label="Gender" value={audience.gender} onChange={e => handleAudienceChange('gender', e.target.value as Gender)}>
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </Select>
                <Input label="Interests" value={interestsInput} onChange={e => setInterestsInput(e.target.value)} placeholder="e.g. fitness, travel, cooking (comma-separated)" />
              </div>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><strong>Name:</strong> {campaignName || '...'}</p>
                <p><strong>Objective:</strong> {objective}</p>
                <p><strong>Platform:</strong> {platform}</p>
                <p><strong>Total Budget:</strong> ${budget.toFixed(2)} USDT</p>
              </div>
              <Button onClick={handleCreateCampaign} className="w-full mt-6">
                {isAdmin ? 'Create & Activate Campaign' : 'Proceed to Payment'}
              </Button>
            </Card>
          </div>
        </div>
      )}
      {formStep === 2 && (
        <Card className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Complete Your Payment</h2>
          <div className="bg-gray-100 p-4 rounded-lg text-center space-y-2">
             <p className="text-sm text-text-secondary">Send exactly <strong className="text-text">${budget.toFixed(2)} USDT</strong> (ERC-20) to the address below.</p>
             <div className="flex items-center justify-center bg-white p-2 rounded w-full">
                <p className="font-mono text-xs sm:text-sm break-all">{USDT_WALLET_ADDRESS}</p>
                <button onClick={copyWalletAddress} className="ml-2 p-1 text-gray-500 hover:text-primary"><Clipboard size={16} /></button>
             </div>
             <div className="flex items-center text-yellow-600 bg-yellow-50 p-3 rounded-md text-sm">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Ensure you are sending on the ERC-20 (Ethereum) network. Other networks are not supported.</span>
             </div>
          </div>
          <div className="mt-6 space-y-4">
             <Input label="Transaction Hash (TxID)" value={paymentHash} onChange={e => setPaymentHash(e.target.value)} placeholder="0x..." required />
             <Button onClick={handleConfirmPayment} isLoading={isLoading} disabled={isLoading} className="w-full">
                Confirm Payment
             </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CreateCampaignPage;
