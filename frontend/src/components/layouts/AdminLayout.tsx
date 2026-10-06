import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  FileCheck2, 
  BookOpen, 
  CreditCard, 
  Settings, 
  LogOut, 
  Home
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, switchRolePersona } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
      <aside className="w-full md:w-64 bg-white text-slate-700 border-r border-slate-200 flex flex-col shrink-0 select-none shadow-sm md:h-screen md:sticky md:top-0 z-30">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col items-center justify-center text-center gap-1.5 shrink-0">
          <Link to="/" className="flex items-center justify-center group w-full">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-12 sm:h-14 w-auto max-w-[190px] object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-extrabold tracking-wider">
            SUPER ADMIN
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
