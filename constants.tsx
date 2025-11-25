// Fix: Import React to resolve namespace issue for React.ReactNode
import React from 'react';
import { Objective, Platform, Gender } from './types';
import { Instagram, Facebook, Youtube, MessageSquare, Eye, Share2, Download, LineChart, Star, Users } from 'lucide-react';

export const USDT_WALLET_ADDRESS = '0x5d8fe67ea5bd4e9f2a786f0784a7745c7677b317';

export const OBJECTIVES = Object.values(Objective);
export const PLATFORMS = Object.values(Platform);
export const GENDERS = Object.values(Gender);

export const PLATFORM_ICONS: { [key in Platform]: React.ReactNode } = {
  [Platform.Instagram]: <Instagram className="w-5 h-5" />,
  [Platform.Facebook]: <Facebook className="w-5 h-5" />,
  [Platform.TikTok]: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.52.02C13.84.02 15.14.32 16.29 1c1.2.74 2.13 1.74 2.76 2.9.64 1.15.96 2.43.96 3.82V19.4c0 .48-.12.9-.35 1.28-.23.38-.56.66-.98.86-.42.2-.89.3-1.4.3-.58 0-1.1-.12-1.57-.35a3.36 3.36 0 0 1-1.28-.98c-.35-.42-.6-.9-.75-1.45-.15-.55-.22-1.14-.22-1.77v-4.4H7.95v4.4c0 .63-.07 1.22-.22 1.77-.15.55-.4.98-.75 1.45-.35.47-.8.85-1.28.98a3.1 3.1 0 0 1-1.57.35c-.5 0-.97-.1-1.4-.3-.42-.2-.75-.48-.98-.86-.23-.38-.35-.8-.35-1.28V4.92c0-1.4.32-2.67.96-3.82.63-1.16 1.56-2.16 2.76-2.9C6.6 1.32 7.9.02 9.22.02c1.33 0 2.55.3 3.65.9.9.52 1.63 1.2 2.2 2.05.58-.85 1.3-1.53 2.2-2.05.9-.52 2.12-.81 3.65-.81h.01zM15.1 8.52H9.22c-.63 0-1.2.1-1.7.3-.5.2-.94.5-1.3.9-.35.4-.6.8-.75 1.25-.15.45-.22.9-.22 1.35v4.4c0 .45.07.85.22 1.25.15.4.4.75.75 1.05.36.3.77.52 1.25.68.48.15.98.23 1.5.23.52 0 1.02-.08 1.5-.23.48-.16.9-.38 1.25-.68.35-.3.6-.65.75-1.05.15-.4.22-.8.22-1.25v-8.8c0-.45-.07-.9-.22-1.35-.15-.45-.4-.85-.75-1.25-.36-.4-.8-.7-1.3-.9-.5-.2-1.07-.3-1.7-.3z"/></svg>,
  [Platform.YouTube]: <Youtube className="w-5 h-5" />,
};

export const OBJECTIVE_ICONS: { [key in Objective]: React.ReactNode } = {
    [Objective.Views]: <Eye className="w-5 h-5 mr-2" />,
    [Objective.Shares]: <Share2 className="w-5 h-5 mr-2" />,
    [Objective.Comments]: <MessageSquare className="w-5 h-5 mr-2" />,
    [Objective.Downloads]: <Download className="w-5 h-5 mr-2" />,
    [Objective.Leads]: <Users className="w-5 h-5 mr-2" />,
    [Objective.Sales]: <LineChart className="w-5 h-5 mr-2" />,
    [Objective.Follows]: <Star className="w-5 h-5 mr-2" />,
};