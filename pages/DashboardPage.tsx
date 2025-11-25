
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCampaigns } from '../hooks/useCampaigns';
import Button from '../components/Button';
import Card from '../components/Card';
import { Campaign, CampaignStatus } from '../types';
import { PLATFORM_ICONS } from '../constants';
import { PlusCircle, BarChartHorizontal, Users, DollarSign, Calendar, Hash } from 'lucide-react';

const StatusBadge: React.FC<{ status: CampaignStatus }> = ({ status }) => {
  const styles = {
    [CampaignStatus.Pending]: 'bg-yellow-100 text-yellow-800',
    [CampaignStatus.Active]: 'bg-green-100 text-green-800 animate-pulse',
    [CampaignStatus.Completed]: 'bg-gray-100 text-gray-800',
  };
  return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { name, status, platform, budget, createdAt, audience, performance, paymentHash, objective } = campaign;
  const totalEngagements = performance.engagements + performance.follows + performance.leads + performance.sales;

  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-text">{name}</h3>
          <div className="flex items-center text-sm text-text-secondary mt-1">
            {PLATFORM_ICONS[platform]}
            <span className="ml-2">{platform} / {objective}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
        <div>
          <p className="text-xs text-text-secondary">Views</p>
          <p className="text-xl font-semibold">{performance.views.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Engagements</p>
          <p className="text-xl font-semibold">{totalEngagements.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Leads</p>
          <p className="text-xl font-semibold">{performance.leads.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Sales</p>
          <p className="text-xl font-semibold">{performance.sales.toLocaleString()}</p>
        </div>
         <div>
          <p className="text-xs text-text-secondary">Follows</p>
          <p className="text-xl font-semibold">{performance.follows.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200 text-xs text-text-secondary space-y-2">
        <div className="flex items-center"><DollarSign size={14} className="mr-2" /> Budget: ${budget.toFixed(2)} USDT</div>
        <div className="flex items-center"><Users size={14} className="mr-2" /> Audience: {audience.ageRange[0]}-{audience.ageRange[1]}, {audience.gender}, {audience.interests.join(', ').substring(0, 30)}{audience.interests.join(', ').length > 30 ? '...' : ''}</div>
        <div className="flex items-center"><Calendar size={14} className="mr-2" /> Created: {new Date(createdAt).toLocaleDateString()}</div>
        {paymentHash && <div className="flex items-center break-all"><Hash size={14} className="mr-2 flex-shrink-0" /> Tx: <span className="truncate ml-1">{paymentHash}</span></div>}
      </div>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { getCampaignsForCurrentUser } = useCampaigns();
  const navigate = useNavigate();
  const userCampaigns = getCampaignsForCurrentUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Campaigns</h1>
        <Button onClick={() => navigate('/create-campaign')}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Campaign
        </Button>
      </div>

      {userCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {userCampaigns.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <BarChartHorizontal className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new campaign.</p>
          <div className="mt-6">
             <Button onClick={() => navigate('/create-campaign')}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Campaign
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
