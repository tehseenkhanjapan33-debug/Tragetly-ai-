
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CampaignProvider } from './context/CampaignContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CampaignProvider>
        <ToastProvider>
          <HashRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/create-campaign" element={<CreateCampaignPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </HashRouter>
        </ToastProvider>
      </CampaignProvider>
    </AuthProvider>
  );
};

export default App;
