import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../common/Navbar.js';
import { Footer } from '../common/Footer.js';
import { AICareerAssistantModal } from '../ai/AICareerAssistantModal.js';
import { 
  Home, 
  Briefcase, 
  Building2, 
  HelpCircle, 
  PhoneCall, 
  Sparkles,
  Users
} from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const location = useLocation();

  const mobileNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'About', path: '/about', icon: Building2 },
    { name: 'Leadership', path: '/leadership', icon: Users },
    { name: 'FAQs', path: '/faqs', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] w-full max-w-[100vw] overflow-x-hidden pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />

      {/* Mobile Fixed Bottom Navigation Bar (Dock) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-teal-500/20 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-[#1B5F85] font-black scale-105' 
                  : 'text-slate-500 hover:text-[#2DC4B4] font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-[#2DC4B4]/15 text-[#1B5F85]' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1B5F85]' : 'text-slate-500'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Floating AI Assistant Trigger */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-gradient-to-r from-teal-700 to-[#102A43] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group ring-4 ring-teal-500/20"
        title="MedDhatri AI Career Advisor"
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300 animate-pulse" />
        <span className="font-bold text-xs pr-1 hidden sm:inline">Ask AI Career Assistant</span>
      </button>

      <AICareerAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
};
