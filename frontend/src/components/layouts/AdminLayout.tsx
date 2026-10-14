import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Stethoscope,
  Compass,
  ExternalLink,
  Home
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, switchRolePersona } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/login');
  };

  const openInNewTab = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    const targetUrl = path.startsWith('http') ? path : `${window.location.origin}${path}`;
    const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      const link = document.createElement('a');
      link.href = targetUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const navItems = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Organization Verifications', path: '/admin/organizations', icon: Building2 },
    { name: 'Job Moderation', path: '/admin/jobs', icon: Briefcase },
    { name: 'Medical Credential Audits', path: '/admin/verifications', icon: ShieldCheck, badge: 'Active' },
    { name: 'Settings & Security', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Mobile Top App Header */}
      <header className="portal-mobile-header md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5 text-[#1B5F85]" />
          </button>
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-14 min-[380px]:h-16 sm:h-18 w-auto object-contain scale-[1.15] min-[380px]:scale-[1.22] sm:scale-100 origin-left transition-transform"
            />
          </Link>
          <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-extrabold tracking-wider ml-0.5">
            ADMIN
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
          </button>
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
                  className="h-14 min-[380px]:h-16 sm:h-18 w-auto object-contain scale-[1.15] min-[380px]:scale-[1.22] sm:scale-100 origin-left transition-transform"
                />
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-extrabold">
                  SUPER ADMIN
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Admin Info Card */}
            <div className="p-3.5 m-3 rounded-2xl border border-purple-100 bg-purple-50/40 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                🛡️
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Administrator'}</h4>
                <p className="text-[11px] text-purple-700 font-semibold truncate">Platform Governance</p>
              </div>
            </div>

            {/* Navigation List */}
            <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto min-h-0">
              {navItems.map((item) => {
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
                        isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Switch Portal Section (Website-matched Mobile Navigation) */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/70 space-y-2 shrink-0">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
                    Switch Portal
                  </span>
                </div>
                <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                  New Tab ↗
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href="/portals"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    setSidebarOpen(false);
                    openInNewTab(e, '/portals');
                  }}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs">🧭</span>
                    <span className="text-[11px] text-slate-800 truncate">Guide</span>
                  </div>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    setSidebarOpen(false);
                    switchRolePersona('doctor');
                    openInNewTab(e, '/professional/dashboard');
                  }}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs">🩺</span>
                    <span className="text-[11px] text-slate-800 truncate">Clinician</span>
                  </div>
                  <ExternalLink className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    setSidebarOpen(false);
                    switchRolePersona('recruiter');
                    openInNewTab(e, '/organization/dashboard');
                  }}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs">🏢</span>
                    <span className="text-[11px] text-slate-800 truncate">Hospital</span>
                  </div>
                  <ExternalLink className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                </button>

                <div className="p-2 rounded-xl border border-purple-300 bg-purple-50 font-black text-xs text-purple-900 flex items-center justify-between shadow-2xs ring-1 ring-purple-400/30">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs">🛡️</span>
                    <span className="text-[11px] truncate">Admin</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/90 shrink-0 mt-auto">
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
      <aside className="hidden md:flex w-64 bg-white text-slate-700 border-r border-slate-200 flex-col shrink-0 select-none shadow-sm md:h-screen md:sticky md:top-0 z-30">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col items-center justify-center text-center gap-1.5 shrink-0">
          <Link to="/" className="flex items-center justify-center group w-full">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-20 sm:h-24 w-auto max-w-[240px] object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-extrabold tracking-wider">
            SUPER ADMIN CONSOLE
          </span>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto min-h-0">
          {navItems.map((item) => {
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
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/80 shrink-0 mt-auto">
          <button
            onClick={() => {
              switchRolePersona('doctor');
              window.open('/professional/dashboard', '_blank', 'noopener,noreferrer');
            }}
            className="w-full bg-white hover:bg-slate-50 text-teal-700 border border-slate-200 p-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
          >
            Open Clinician Portal ↗
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 p-2.5 rounded-xl text-xs font-bold transition cursor-pointer bg-rose-50/70"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex bg-white border-b border-slate-200 px-6 py-3.5 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-medium text-slate-500 hover:text-teal-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Platform Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold text-slate-800">Super Administrator Console</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </header>

        <main className="portal-main-content flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Responsive Mobile Bottom Navigation */}
      <nav className="portal-bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-2 z-40 flex items-center justify-around text-[10px] font-bold text-slate-600 shadow-xl mobile-safe-bottom">
        <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/admin/dashboard' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <LayoutDashboard className="w-4 h-4 text-[#2DC4B4]" />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/admin/users' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <Users className="w-4 h-4 text-[#2DC4B4]" />
          <span>Users</span>
        </Link>
        <Link to="/admin/organizations" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/admin/organizations' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <Building2 className="w-4 h-4 text-[#2DC4B4]" />
          <span>Orgs</span>
        </Link>
        <Link to="/admin/verifications" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/admin/verifications' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <ShieldCheck className="w-4 h-4 text-[#2DC4B4]" />
          <span>Audits</span>
        </Link>
        <Link to="/admin/settings" className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${location.pathname === '/admin/settings' ? 'text-[#1B5F85] bg-teal-50 font-black' : 'hover:text-slate-900'}`}>
          <Settings className="w-4 h-4 text-[#2DC4B4]" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};
