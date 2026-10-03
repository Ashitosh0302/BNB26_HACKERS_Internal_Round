import React, { useState } from 'react';
import { useUIStore } from './stores/useUIStore';

// Common Components
import { SpiderWebBackground } from './components/common/SpiderWebBackground';
import { SpiderIntroAnimation } from './components/common/SpiderIntroAnimation';
import { Navbar } from './components/common/Navbar';
import { AICommandBar } from './components/common/AICommandBar';
import { SpiderNotificationsDrawer } from './components/common/SpiderNotificationsDrawer';
import { SpiderToast } from './components/common/SpiderToast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ProjectsList } from './pages/ProjectsList';
import { ScriptStudio } from './pages/ScriptStudio';
import { RecordingUpload } from './pages/RecordingUpload';
import { AIAnalysis } from './pages/AIAnalysis';
import { ScriptAlignmentPage } from './pages/ScriptAlignmentPage';
import { ClipHunterPage } from './pages/ClipHunterPage';
import { WebStudioPage } from './pages/WebStudioPage';
import { RepurposePage } from './pages/RepurposePage';
import { ContentGraphPage } from './pages/ContentGraphPage';
import { WebVaultPage } from './pages/WebVaultPage';
import { CalendarPage } from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CreatorDNAPage } from './pages/CreatorDNAPage';
import { AuthPages } from './pages/AuthPages';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const { activeTab, hasSeenIntro, setHasSeenIntro } = useUIStore();
  const [showIntro, setShowIntro] = useState(!hasSeenIntro);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectsList />;
      case 'script':
        return <ScriptStudio />;
      case 'recording':
        return <RecordingUpload />;
      case 'analysis':
        return <AIAnalysis />;
      case 'alignment':
        return <ScriptAlignmentPage />;
      case 'clips':
        return <ClipHunterPage />;
      case 'editor':
        return <WebStudioPage />;
      case 'repurpose':
        return <RepurposePage />;
      case 'content-graph':
        return <ContentGraphPage />;
      case 'assets':
        return <WebVaultPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'creator-dna':
        return <CreatorDNAPage />;
      case 'auth':
        return <AuthPages />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070D] text-[#F2F5F7] font-sans overflow-x-hidden">
      {/* Cinematic Intro Animation */}
      {showIntro && <SpiderIntroAnimation onComplete={handleIntroComplete} />}

      {/* Spider-Web Dynamic Canvas */}
      <SpiderWebBackground />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        {activeTab !== 'auth' && activeTab !== 'landing' && <Navbar />}

        {/* Active Route Content */}
        <main className="flex-1">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Global AI Command Bar (Ctrl+K) */}
      <AICommandBar />

      {/* Real-time Spider-Sense Notifications Drawer */}
      <SpiderNotificationsDrawer />

      {/* Floating Spider-Sense Alert Toast */}
      <SpiderToast />
    </div>
  );
}

export default App;
