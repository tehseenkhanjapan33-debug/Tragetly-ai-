
export enum Objective {
  Views = 'Views',
  Shares = 'Shares',
  Comments = 'Comments',
  Downloads = 'Downloads',
  Leads = 'Leads',
  Sales = 'Sales',
  Follows = 'Follows',
}

export enum Platform {
  Instagram = 'Instagram',
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
}

export enum Gender {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
}

export enum CampaignStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
}

export interface Audience {
  ageRange: [number, number];
  gender: Gender;
  interests: string[];
}

export interface Performance {
  views: number;
  engagements: number;
  leads: number;
  sales: number;
  follows: number;
}

export interface Campaign {
  id: string;
  name: string;
  objective: Objective;
  platform: Platform;
  mediaUrl: string;
  budget: number;
  audience: Audience;
  status: CampaignStatus;
  createdAt: string;
  paymentHash?: string;
  performance: Performance;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}
