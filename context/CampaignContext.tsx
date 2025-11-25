
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Campaign, CampaignStatus, Performance } from '../types';
import { AuthContext } from './AuthContext';

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'status' | 'performance' | 'userId'>) => Campaign;
  updateCampaignStatus: (id: string, status: CampaignStatus, paymentHash?: string) => void;
  getCampaignsForCurrentUser: () => Campaign[];
}

export const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const storedCampaigns = localStorage.getItem('tragetly-campaigns');
    return storedCampaigns ? JSON.parse(storedCampaigns) : [];
  });
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const { user } = authContext;

  useEffect(() => {
    localStorage.setItem('tragetly-campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Simulate dynamic performance updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns(prevCampaigns => {
        return prevCampaigns.map(campaign => {
          if (campaign.status === CampaignStatus.Active) {
            const performanceCopy: Performance = { ...campaign.performance };
            const budgetSpent = (performanceCopy.views / 1000) * 0.05 + performanceCopy.engagements * 0.01 + performanceCopy.leads * 0.1 + performanceCopy.sales * 1 + performanceCopy.follows * 0.02;

            if (budgetSpent >= campaign.budget) {
              return { ...campaign, status: CampaignStatus.Completed };
            }

            performanceCopy.views += Math.floor(Math.random() * 100);
            performanceCopy.engagements += Math.floor(Math.random() * 5);
            if (Math.random() > 0.9) performanceCopy.leads += 1;
            if (Math.random() > 0.98) performanceCopy.sales += 1;
            if (Math.random() > 0.8) performanceCopy.follows += 1;
            
            return { ...campaign, performance: performanceCopy };
          }
          return campaign;
        });
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'status' | 'performance' | 'userId'>): Campaign => {
    if (!user) throw new Error("User not logged in");
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: CampaignStatus.Pending,
      userId: user.id,
      performance: { views: 0, engagements: 0, leads: 0, sales: 0, follows: 0 },
    };
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const updateCampaignStatus = (id: string, status: CampaignStatus, paymentHash?: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status, paymentHash: paymentHash || c.paymentHash } : c));
  };
  
  const getCampaignsForCurrentUser = () => {
      if (!user) return [];
      return campaigns.filter(c => c.userId === user.id);
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, updateCampaignStatus, getCampaignsForCurrentUser }}>
      {children}
    </CampaignContext.Provider>
  );
};
