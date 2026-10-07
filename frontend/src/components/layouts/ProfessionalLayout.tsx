import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  LayoutDashboard, 
  Briefcase, 
  Sparkles, 
  FileCheck2, 
  Bookmark, 
  UserCircle2, 
  ShieldCheck, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Stethoscope,
  Home
} from 'lucide-react';
import { AICareerAssistantModal } from '../ai/AICareerAssistantModal.js';
import { ResumeReviewModal } from '../ai/ResumeReviewModal.js';

export const ProfessionalLayout: React.FC = () => {
  const { user, logout, switchRolePersona } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/login');
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/professional/dashboard', icon: LayoutDashboard },
    { name: 'Find Jobs', path: '/professional/jobs', icon: Briefcase },
    { name: 'AI Recommended', path: '/professional/recommended', icon: Sparkles, badge: 'AI' },
    { name: 'My Applications', path: '/professional/applications', icon: FileCheck2 },
    { name: 'Saved Opportunities', path: '/professional/saved', icon: Bookmark },
    { name: 'My Profile', path: '/professional/profile', icon: UserCircle2 },
    { name: 'Credential Verification', path: '/professional/verification', icon: ShieldCheck, badge: user?.verificationStatus === 'VERIFIED' ? 'Verified' : 'Pending' },
    { name: 'Messages', path: '/professional/messages', icon: MessageSquare },
    { name: 'Settings', path: '/professional/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Mobile Top App Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            aria-label="Open Clinician Menu"
          >
            <Menu className="w-5 h-5 text-[#1B5F85]" />
          </button>
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 font-extrabold tracking-wider ml-0.5">
            PRO
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => switchRolePersona('recruiter')}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition cursor-pointer"
          >
            Recruiter ➔
          </button>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
          </button>
          <Link
            to="/professional/profile"
            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#2DC4B4]/40"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="MedDhatri"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 font-extrabold">
                  CLINICIAN
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Doctor Info Card */}
            <div className="p-3.5 m-3 rounded-2xl border border-teal-100 bg-teal-50/40 flex items-center gap-3 shrink-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#2DC4B4]"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name}</h4>
                <p className="text-[11px] text-[#1B5F85] font-semibold truncate">{user?.headline || user?.profession || 'Doctor'}</p>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto min-h-0">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#1B5F85] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#2DC4B4]' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-700 border border-teal-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* AI Tools & Actions */}
            <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/90 shrink-0 mt-auto">
              <button
                onClick={() => { setSidebarOpen(false); setResumeModalOpen(true); }}
                className="w-full bg-white text-teal-700 p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-teal-200 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                AI Resume Audit
              </button>
              <button
                onClick={() => { setSidebarOpen(false); setAiModalOpen(true); }}
                className="w-full bg-teal-50 text-teal-900 p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-teal-200 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                AI Career Advisor
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 p-2.5 rounded-xl text-xs font-bold transition cursor-pointer bg-rose-50"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white text-slate-700 border-r border-slate-200 shrink-0 select-none shadow-sm h-screen sticky top-0 z-30">
        {/* Brand */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col items-center justify-center text-center gap-1.5 shrink-0">
          <Link to="/" className="flex items-center justify-center group w-full">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-14 sm:h-16 w-auto max-w-[210px] object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 font-extrabold tracking-wider">
            CLINICIAN PRO
          </span>
        </div>

        {/* User Card */}
        <div className="p-3 mx-3 my-2 rounded-2xl border border-slate-100 bg-slate-50/80 flex items-center gap-3 shrink-0">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
            alt={user?.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80';
            }}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/20"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name}</h4>
            <p className="text-[11px] text-[#1B5F85] font-semibold truncate">{user?.headline || user?.profession || 'Specialist'}</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-1.5 space-y-1 overflow-y-auto min-h-0">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-[#1B5F85] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2DC4B4]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.badge === 'AI'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Tools Quick Trigger & Logout */}
        <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/80 shrink-0 mt-auto">
          <button
            onClick={() => setResumeModalOpen(true)}
            className="w-full bg-white hover:bg-slate-50 text-teal-700 p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-teal-200 shadow-2xs transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            AI Resume Audit
          </button>
          <button
            onClick={() => setAiModalOpen(true)}
            className="w-full bg-teal-50 hover:bg-teal-100/80 text-teal-900 p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-teal-200 transition cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            AI Career Advisor
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 p-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-2xs cursor-pointer bg-rose-50/70"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-6 py-3.5 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-medium text-slate-500 hover:text-teal-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Platform Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800">Professional Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRolePersona('recruiter')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition cursor-pointer"
            >
              Test as Recruiter ➔
            </button>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </header>

        <main className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Responsive Mobile Bottom Navigation with Safe Area */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-2 z-40 flex items-center justify-around text-[10px] font-bold text-slate-600 shadow-xl mobile-safe-bottom">
        <Link to="/professional/dashboard" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/professional/dashboard' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <LayoutDashboard className="w-4 h-4 text-[#2DC4B4]" />
          <span>Dashboard</span>
        </Link>
        <Link to="/professional/jobs" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname.startsWith('/professional/jobs') ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <Briefcase className="w-4 h-4 text-[#2DC4B4]" />
          <span>Jobs</span>
        </Link>
        <Link to="/professional/applications" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/professional/applications' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <FileCheck2 className="w-4 h-4 text-[#2DC4B4]" />
          <span>Applied</span>
        </Link>
        <Link to="/professional/messages" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/professional/messages' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <MessageSquare className="w-4 h-4 text-[#2DC4B4]" />
          <span>Chat</span>
        </Link>
        <Link to="/professional/profile" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/professional/profile' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <UserCircle2 className="w-4 h-4 text-[#2DC4B4]" />
          <span>Profile</span>
        </Link>
      </nav>

      {/* Floating AI Assistant Trigger */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-[#1B5F85] hover:bg-[#154E70] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(27,95,133,0.35)] hover:shadow-[0_6px_25px_rgba(27,95,133,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group ring-2 ring-[#2DC4B4]/40 cursor-pointer"
        title="MedDhatri AI Healthcare Career Advisor"
        aria-label="Open AI Career Assistant Chatbot"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-xs leading-tight tracking-tight text-white flex items-center gap-1">
            AI Advisor
          </span>
          <span className="text-[9px] text-teal-200 hidden sm:inline leading-none font-medium">Healthcare Career Bot</span>
        </div>
      </button>

      {/* Modals */}
      <AICareerAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      <ResumeReviewModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </div>
  );
};
