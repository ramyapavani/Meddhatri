import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import {
  Briefcase,
  ChevronDown,
  PlusCircle,
  Sparkles,
  User,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Users,
  Compass,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole, switchRolePersona } = useAuth();
  const [employerDropdownOpen, setEmployerDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isGuideActive = location.pathname === '/portals';
  const isProfessionalActive = !isGuideActive && (location.pathname.startsWith('/professional') || location.pathname.startsWith('/jobs') || location.pathname === '/' || user?.role === 'PROFESSIONAL');
  const isOrganizationActive = !isGuideActive && (location.pathname.startsWith('/organization') || (location.pathname !== '/' && (user?.role === 'ORGANIZATION_ADMIN' || user?.role === 'RECRUITER')));
  const isAdminActive = !isGuideActive && (location.pathname.startsWith('/admin') || (location.pathname !== '/' && user?.role === 'SUPER_ADMIN'));

  const employerDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close open popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
      if (employerDropdownRef.current && !employerDropdownRef.current.contains(target)) {
        setEmployerDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close open menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setEmployerDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Ensure public landing page defaults to logged-out state with Login / Sign Up visible
  useEffect(() => {
    const saved = localStorage.getItem('meddhatri_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed?._id?.startsWith('user_') ||
          parsed?.email?.includes('demo') ||
          parsed?.name?.includes('Rajesh') ||
          parsed?.name?.includes('Ananya')
        ) {
          localStorage.removeItem('meddhatri_current_user');
          localStorage.removeItem('meddhatri_token');
          logout();
        }
      } catch {
        logout();
      }
    }
  }, [logout]);

  const openInNewTab = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handlePortalSwitchAndOpen = (
    e: React.MouseEvent,
    role: 'PROFESSIONAL' | 'ORGANIZATION_ADMIN' | 'SUPER_ADMIN',
    path: string,
    persona?: 'doctor' | 'recruiter' | 'admin'
  ) => {
    if (persona && switchRolePersona) {
      switchRolePersona(persona);
    } else {
      switchRole(role);
    }
    setEmployerDropdownOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    openInNewTab(e, path);
  };

  return (
    <>
      {/* Backdrop overlay for floating menus on mobile/tablet */}
      {(mobileMenuOpen || employerDropdownOpen || userDropdownOpen) && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-2xs z-40 animate-in fade-in duration-150"
          onClick={() => {
            setMobileMenuOpen(false);
            setEmployerDropdownOpen(false);
            setUserDropdownOpen(false);
          }}
        />
      )}

      <nav className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b border-slate-200/80 shadow-xs">
        <div className="w-full max-w-7xl mx-auto px-3 min-[390px]:px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Brand Logo (Prominent, crisp, matching reference screenshot) */}
            <Link to="/" className="flex items-center group shrink-0">
              <div className="h-9 min-[390px]:h-10 sm:h-12 md:h-14 lg:h-16 flex items-center overflow-hidden shrink-0">
                <img
                  src="/logo.png"
                  alt="MedDhatri"
                  className="h-[50px] min-[390px]:h-[56px] sm:h-14 md:h-16 lg:h-18 w-auto max-w-none object-contain transition-transform group-hover:scale-[1.02] shrink-0"
                  style={{
                    mixBlendMode: 'multiply',
                    filter: 'contrast(1.16) brightness(1.02)',
                    imageRendering: '-webkit-optimize-contrast'
                  }}
                />
              </div>
            </Link>

            {/* Center: Standard Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-slate-700">
              <button
                onClick={() => {
                  if (location.pathname === '/') {
                    document.getElementById('job-board-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/jobs');
                  }
                }}
                className={`py-2 transition-colors hover:text-[#20B2AA] cursor-pointer ${location.pathname.startsWith('/jobs') ? 'text-[#20B2AA] font-black' : ''}`}
              >
                Find Jobs
              </button>
              <button
                onClick={() => {
                  if (location.pathname === '/') {
                    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/how-it-works');
                  }
                }}
                className={`py-2 transition-colors hover:text-[#20B2AA] cursor-pointer ${location.pathname === '/how-it-works' ? 'text-[#20B2AA] font-black' : ''}`}
              >
                How It Works
              </button>
              <Link
                to="/pricing"
                className={`py-2 transition-colors hover:text-[#20B2AA] ${location.pathname === '/pricing' ? 'text-[#20B2AA] font-black' : ''}`}
              >
                For Employers
              </Link>
              <Link
                to="/about"
                className={`py-2 transition-colors hover:text-[#20B2AA] ${location.pathname === '/about' ? 'text-[#20B2AA] font-black' : ''}`}
              >
                About
              </Link>
              <Link
                to="/contact-us"
                className={`py-2 transition-colors hover:text-[#20B2AA] ${location.pathname === '/contact-us' || location.pathname === '/contact' ? 'text-[#20B2AA] font-black' : ''}`}
              >
                Contact Us
              </Link>
            </div>

            {/* Right Action Items: [Login] [Sign Up] | [💼 For Employer ⌵] [ ≡ ] */}
            <div className="flex items-center gap-1.5 min-[390px]:gap-2 sm:gap-2.5 shrink-0">

              {/* 1. Auth Controls */}
              {!user ? (
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Link
                    to="/login"
                    className="bg-[#0F2E50] hover:bg-[#0A223E] text-white px-3 min-[390px]:px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-150 inline-flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white border border-[#0F2E50] hover:bg-slate-50 text-[#0F2E50] px-3 min-[390px]:px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-150 inline-flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                /* User profile pill with dedicated dropdown (when logged in) */
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(!userDropdownOpen);
                      setEmployerDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 text-teal-900 text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700 shrink-0" />
                    <span className="truncate max-w-[80px] sm:max-w-[130px]">{user.name?.split(' ')[0]}</span>
                    <ChevronDown className={`w-3 h-3 text-teal-700 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dedicated User Profile & Sign Out Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 text-slate-800 animate-in fade-in zoom-in-95">
                      <div className="px-2 py-1.5 border-b border-slate-100">
                        <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 uppercase tracking-wider">
                          {user.role?.toLowerCase().replace('_', ' ')}
                        </span>
                      </div>

                      <div className="py-2">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            if (user.role === 'SUPER_ADMIN') navigate('/admin/dashboard');
                            else if (user.role === 'ORGANIZATION_ADMIN' || user.role === 'RECRUITER') navigate('/organization/dashboard');
                            else navigate('/professional/dashboard');
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 rounded-xl transition cursor-pointer"
                        >
                          <span>My Portal Dashboard</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition cursor-pointer border border-rose-200/80"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Vertical Separator Bar | (Desktop only, hidden on mobile/tablet) */}
              <span className="hidden md:inline text-slate-300 font-light text-base mx-1 select-none">
                |
              </span>

              {/* 2. For Employer Button (Perfect Geometric Circle on Mobile, Standard Pill on Desktop) */}
              <div className="relative shrink-0 flex-none" ref={employerDropdownRef}>
                <button
                  onClick={() => {
                    setEmployerDropdownOpen(!employerDropdownOpen);
                    setUserDropdownOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  className="bg-[#A31D24] hover:bg-[#8B1A1E] text-white w-9 h-9 min-w-9 min-h-9 max-w-9 max-h-9 sm:max-w-none sm:max-h-none sm:w-auto sm:min-w-0 sm:min-h-0 sm:px-4 sm:h-9 rounded-full aspect-square sm:aspect-auto p-0 sm:py-0 sm:px-4 font-bold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs hover:shadow-md transition-all duration-150 shrink-0 flex-none cursor-pointer"
                  title="For Employer"
                  aria-label="For Employers Menu"
                >
                  <Briefcase className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">For Employer</span>
                  <ChevronDown className={`w-3 h-3 text-white transition-transform duration-200 shrink-0 ${employerDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* For Employers Dropdown Card with Switch Portal (matching floating Switch Portal dock) */}
                {employerDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-72 min-[390px]:w-[300px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 z-50 text-slate-800 animate-in fade-in zoom-in-95 max-w-[calc(100vw-1.5rem)]">
                    {/* Section 1: For Employers */}
                    <div className="pb-3 border-b border-slate-100">
                      <div className="text-center font-extrabold text-xs text-[#0F394C] uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#A31D24]" />
                        <span>For Employers</span>
                      </div>

                      <div className="flex flex-col space-y-1 text-center">
                        <button
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/dashboard', 'recruiter');
                          }}
                          className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/70 rounded-lg transition cursor-pointer text-center"
                        >
                          {user?.role === 'ORGANIZATION_ADMIN' || user?.role === 'RECRUITER' ? 'Employer Dashboard' : 'Employer Login'}
                        </button>

                        <a
                          href="/organization/jobs/create"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/jobs/create', 'recruiter');
                          }}
                          className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/70 rounded-lg transition cursor-pointer text-center block"
                        >
                          Post a Healthcare Job
                        </a>

                        <a
                          href="/organization/candidates"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/candidates', 'recruiter');
                          }}
                          className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/70 rounded-lg transition cursor-pointer text-center block"
                        >
                          Find Candidates
                        </a>

                        <a
                          href="/pricing"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            openInNewTab(e, '/pricing');
                          }}
                          className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 hover:text-teal-900 hover:bg-teal-50/70 rounded-lg transition cursor-pointer text-center block"
                        >
                          Pricing & Plans
                        </a>
                      </div>
                    </div>

                    {/* Section 2: Switch Portal (Role Portals) */}
                    <div className="pt-3">
                      <div className="flex items-center justify-between mb-2.5 px-0.5">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
                            Switch Portal
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                          New Tab ↗
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* 1. Professional Portal (Doctor & Clinicians) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            handlePortalSwitchAndOpen(e, 'PROFESSIONAL', '/professional/dashboard', 'doctor');
                          }}
                          className={`py-2.5 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-2xs group ${isProfessionalActive
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-extrabold ring-1 ring-teal-400/30'
                            : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold'
                            }`}
                          title="Healthcare Professional Portal (Doctor, Clinician)"
                        >
                          <span className="text-sm shrink-0">🩺</span>
                          <span className="whitespace-nowrap">Professional</span>
                        </button>

                        {/* 2. Organization Portal (Hospitals & Employers) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/dashboard', 'recruiter');
                          }}
                          className={`py-2.5 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-2xs group ${isOrganizationActive
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-extrabold ring-1 ring-teal-400/30'
                            : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold'
                            }`}
                          title="Healthcare Organization Portal (Hospitals & Employers)"
                        >
                          <span className="text-sm shrink-0">🏢</span>
                          <span className="whitespace-nowrap">Organization</span>
                        </button>

                        {/* 3. Super Admin Portal */}
                        <button
                          type="button"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            handlePortalSwitchAndOpen(e, 'SUPER_ADMIN', '/admin/dashboard', 'admin');
                          }}
                          className={`py-2.5 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-2xs group ${isAdminActive
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-extrabold ring-1 ring-teal-400/30'
                            : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold'
                            }`}
                          title="Super Admin Portal (Platform Management)"
                        >
                          <span className="text-sm shrink-0">🛡️</span>
                          <span className="whitespace-nowrap">Super Admin</span>
                        </button>

                        {/* 4. Interactive Portals Guide */}
                        <a
                          href="/portals"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            setEmployerDropdownOpen(false);
                            openInNewTab(e, '/portals');
                          }}
                          className={`py-2.5 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-2xs group ${isGuideActive
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-extrabold ring-1 ring-teal-400/30'
                            : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold'
                            }`}
                          title="Interactive Portals Guide"
                        >
                          <span className="text-sm shrink-0">🧭</span>
                          <span className="whitespace-nowrap">Guide</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Mobile Menu Hamburger / Close Button */}
              <div className="lg:hidden" ref={mobileMenuRef}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                    setEmployerDropdownOpen(false);
                    setUserDropdownOpen(false);
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 text-slate-800 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition shrink-0 flex-none flex items-center justify-center cursor-pointer p-0"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-slate-800" /> : <Menu className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-slate-800" />}
                </button>

                {/* Classic Floating Mobile Navigation Dropdown Card */}
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2.5 w-52 bg-white rounded-3xl shadow-2xl border border-slate-100/90 py-4 px-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800">
                    <div className="flex flex-col space-y-1 text-center">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (location.pathname === '/') {
                            document.getElementById('job-board-section')?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            navigate('/jobs');
                          }
                        }}
                        className="w-full py-2 px-3 text-sm font-semibold text-slate-800 hover:text-[#20B2AA] hover:bg-slate-50/80 rounded-xl transition cursor-pointer text-center"
                      >
                        Find Jobs
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (location.pathname === '/') {
                            document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            navigate('/how-it-works');
                          }
                        }}
                        className="w-full py-2 px-3 text-sm font-semibold text-slate-800 hover:text-[#20B2AA] hover:bg-slate-50/80 rounded-xl transition cursor-pointer text-center"
                      >
                        How It Works
                      </button>

                      <Link
                        to="/pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-2 px-3 text-sm font-semibold text-slate-800 hover:text-[#20B2AA] hover:bg-slate-50/80 rounded-xl transition cursor-pointer block text-center"
                      >
                        For Employers
                      </Link>

                      <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-2 px-3 text-sm font-semibold text-slate-800 hover:text-[#20B2AA] hover:bg-slate-50/80 rounded-xl transition cursor-pointer block text-center"
                      >
                        About Us
                      </Link>

                      <Link
                        to="/contact-us"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-2 px-3 text-sm font-semibold text-slate-800 hover:text-[#20B2AA] hover:bg-slate-50/80 rounded-xl transition cursor-pointer block text-center"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
