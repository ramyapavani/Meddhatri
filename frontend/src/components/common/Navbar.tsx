import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { useNotifications } from '../../contexts/NotificationContext.js';
import { 
  Stethoscope, 
  Bell, 
  User, 
  Building2, 
  ShieldCheck, 
  ChevronDown,
  LogOut,
  Briefcase,
  Layers,
  PlusCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openInNewTab = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    const targetUrl = path.startsWith('http') ? path : `${window.location.origin}${path}`;
    const newWindow = window.open(targetUrl, '_blank');
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

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'SUPER_ADMIN') return '/admin/dashboard';
    if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') return '/organization/dashboard';
    return '/professional/dashboard';
  };

  const getDashboardLabel = () => {
    if (!user) return 'My Portal';
    if (user.role === 'SUPER_ADMIN') return 'Admin Portal';
    if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') return 'Employer Portal';
    return 'Clinician Portal';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#2DC4B4]/20 backdrop-blur-md shadow-xs">
      <div className="w-full px-2.5 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between min-h-[64px] sm:min-h-[76px] py-1 sm:py-1.5">
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center group shrink-0 py-0.5">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto max-w-[170px] sm:max-w-[220px] md:max-w-[260px] object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-xs"
            />
          </Link>

          {/* Center: Desktop Navigation Links (Expanded to fill space elegantly) */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-10 2xl:gap-12 text-[15px] xl:text-base font-extrabold text-slate-800 tracking-normal">
            <Link 
              to="/jobs" 
              className={`px-2 py-1 rounded-lg transition hover:text-[#2DC4B4] hover:bg-teal-50/40 ${location.pathname.startsWith('/jobs') ? 'text-[#2DC4B4]' : ''}`}
            >
              Jobs
            </Link>
            <Link 
              to="/about" 
              className={`px-2 py-1 rounded-lg transition hover:text-[#2DC4B4] hover:bg-teal-50/40 ${location.pathname === '/about' && !location.hash ? 'text-[#2DC4B4]' : ''}`}
            >
              About Us
            </Link>
            <Link 
              to="/leadership" 
              className={`px-2 py-1 rounded-lg transition hover:text-[#2DC4B4] hover:bg-teal-50/40 ${location.pathname === '/leadership' ? 'text-[#2DC4B4]' : ''}`}
            >
              Leadership
            </Link>
            <Link 
              to="/how-it-works" 
              className={`px-2 py-1 rounded-lg transition hover:text-[#2DC4B4] hover:bg-teal-50/40 ${location.pathname === '/how-it-works' ? 'text-[#2DC4B4]' : ''}`}
            >
              How It Works
            </Link>
            <Link 
              to="/faqs" 
              className={`px-2 py-1 rounded-lg transition hover:text-[#2DC4B4] hover:bg-teal-50/40 ${location.pathname === '/faqs' || location.pathname === '/faq' ? 'text-[#2DC4B4]' : ''}`}
            >
              FAQs
            </Link>
            <Link 
              to="/contact" 
              className={`px-2 py-1 rounded-lg transition hover:text-[#2DC4B4] hover:bg-teal-50/40 ${location.pathname === '/contact' || location.pathname === '/contact-us' ? 'text-[#2DC4B4]' : ''}`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Notification Bell (Only when logged in or with alerts) */}
            {user && (
              <div className="relative" ref={notifDropdownRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-full transition"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-teal-700 hover:underline font-semibold"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 transition ${!n.isRead ? 'bg-teal-50/50' : ''}`}>
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Authenticated User Menu */}
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-3">
                {user.role === 'PROFESSIONAL' ? (
                  <a
                    href="/professional/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => openInNewTab(e, '/professional/dashboard')}
                    className="bg-[#1B5F85] hover:bg-[#154E70] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold shadow-xs sm:shadow-sm transition flex items-center gap-1 sm:gap-2 shrink-0 border border-teal-400/30 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#2DC4B4] shrink-0" />
                    <span className="hidden sm:inline">Clinician Portal</span>
                    <span className="sm:hidden">Clinician</span>
                    <ExternalLink className="w-3 h-3 text-[#2DC4B4] hidden xs:inline shrink-0" />
                  </a>
                ) : user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER' ? (
                  <a
                    href="/organization/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => openInNewTab(e, '/organization/dashboard')}
                    className="bg-[#1B5F85] hover:bg-[#154E70] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold shadow-xs sm:shadow-sm transition flex items-center gap-1 sm:gap-2 shrink-0 border border-teal-400/30 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#2DC4B4] shrink-0" />
                    <span className="hidden sm:inline">Employer Portal</span>
                    <span className="sm:hidden">Employer</span>
                    <ExternalLink className="w-3 h-3 text-[#2DC4B4] hidden xs:inline shrink-0" />
                  </a>
                ) : (
                  <a
                    href="/admin/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => openInNewTab(e, '/admin/dashboard')}
                    className="bg-[#1B5F85] hover:bg-[#154E70] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold shadow-xs sm:shadow-sm transition flex items-center gap-1 sm:gap-2 shrink-0 border border-teal-400/30 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#2DC4B4] shrink-0" />
                    <span className="hidden sm:inline">Admin Portal</span>
                    <span className="sm:hidden">Admin</span>
                    <ExternalLink className="w-3 h-3 text-[#2DC4B4] hidden xs:inline shrink-0" />
                  </a>
                )}

                {/* User Profile Pill & Dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80';
                      }}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-600/30"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-teal-700 font-semibold truncate capitalize">{user.role?.toLowerCase().replace('_', ' ')}</p>
                      </div>

                      <div className="py-1">
                        {user.role === 'PROFESSIONAL' ? (
                          <a
                            href="/professional/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              setUserDropdownOpen(false);
                              openInNewTab(e, '/professional/dashboard');
                            }}
                            className="flex items-center justify-between px-4 py-2 text-xs text-[#1B5F85] hover:bg-slate-50 font-bold cursor-pointer"
                          >
                            <span>Open Clinician Portal</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#2DC4B4]" />
                          </a>
                        ) : (
                          <a
                            href={getDashboardLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              setUserDropdownOpen(false);
                              openInNewTab(e, getDashboardLink());
                            }}
                            className="flex items-center justify-between px-4 py-2 text-xs text-[#1B5F85] hover:bg-slate-50 font-bold cursor-pointer"
                          >
                            <span>Open {getDashboardLabel()}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#2DC4B4]" />
                          </a>
                        )}
                        {user.role === 'PROFESSIONAL' && (
                          <>
                            <Link
                              to="/professional/profile"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              Edit Profile & CV
                            </Link>
                            <Link
                              to="/professional/verification"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              License & Credentials
                            </Link>
                            <Link
                              to="/professional/applications"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              My Applications
                            </Link>
                          </>
                        )}
                        {(user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') && (
                          <>
                            <Link
                              to="/organization/candidates"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              Find Candidates
                            </Link>
                            <Link
                              to="/organization/applications"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              Recruitment Pipeline
                            </Link>
                            <Link
                              to="/organization/jobs/create"
                              onClick={() => setUserDropdownOpen(false)}
                              className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                            >
                              + Post New Job
                            </Link>
                          </>
                        )}
                      </div>

                      {/* Quick Portal Switcher */}
                      <div className="pt-2 border-t border-slate-100 px-3 pb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Switch View / Persona:</span>
                        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold">
                          <button
                            onClick={() => {
                              switchRole('PROFESSIONAL');
                              setUserDropdownOpen(false);
                              window.open('/professional/dashboard', '_blank', 'noopener,noreferrer');
                            }}
                            className={`py-1 px-1.5 rounded-lg border text-center transition ${user.role === 'PROFESSIONAL' ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            Doctor ↗
                          </button>
                          <button
                            onClick={() => {
                              switchRole('ORGANIZATION_ADMIN');
                              setUserDropdownOpen(false);
                              window.open('/organization/dashboard', '_blank', 'noopener,noreferrer');
                            }}
                            className={`py-1 px-1.5 rounded-lg border text-center transition ${user.role === 'ORGANIZATION_ADMIN' ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            Employer ↗
                          </button>
                          <button
                            onClick={() => {
                              switchRole('SUPER_ADMIN');
                              setUserDropdownOpen(false);
                              window.open('/admin/dashboard', '_blank', 'noopener,noreferrer');
                            }}
                            className={`py-1 px-1.5 rounded-lg border text-center transition ${user.role === 'SUPER_ADMIN' ? 'bg-teal-50 border-teal-300 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            Admin ↗
                          </button>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 mt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Public Logged-Out Actions */
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="bg-[#1B5F85] hover:bg-[#154E70] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-sm transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-[#2DC4B4] text-[#1B5F85] hover:bg-[#2DC4B4] hover:text-white text-xs sm:text-sm font-bold px-5 py-1.5 rounded-full transition"
                >
                  Sign Up
                </Link>

                <div className="hidden sm:block h-6 w-px bg-slate-300 mx-1" />

                {/* For Employer Button (Opens in new tab) */}
                <div className="relative group">
                  <a
                    href="/organization/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1B5F85] hover:bg-[#154E70] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-1.5 border border-[#2DC4B4]/40"
                  >
                    <Briefcase className="w-4 h-4 text-[#2DC4B4]" />
                    <span>For Employer</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#2DC4B4]" />
                  </a>

                  {/* Dropdown on Hover/Click */}
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95">
                    <a
                      href="/organization/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-xs text-slate-800 hover:bg-slate-50 font-bold"
                    >
                      Employer Talent SaaS ↗
                    </a>
                    <a
                      href="/organization/jobs/create"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-xs text-slate-800 hover:bg-slate-50 font-bold"
                    >
                      + Post a Healthcare Job ↗
                    </a>
                    <a
                      href="/organization/candidates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-xs text-slate-800 hover:bg-slate-50 font-bold"
                    >
                      Browse Talent Pool ↗
                    </a>
                    <Link
                      to="/pricing"
                      className="block px-4 py-2 text-xs text-[#1B5F85] hover:bg-slate-50 font-bold border-t border-slate-100"
                    >
                      View Pricing & Plans
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
