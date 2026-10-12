import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import {
  Building2,
  ChevronDown,
  Briefcase,
  PlusCircle,
  Sparkles,
  User,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Stethoscope,
  ShieldCheck,
  Users,
  Compass
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const [employerDropdownOpen, setEmployerDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const employerDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (employerDropdownRef.current && !employerDropdownRef.current.contains(event.target as Node)) {
        setEmployerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handlePortalSwitchAndOpen = (e: React.MouseEvent, role: 'PROFESSIONAL' | 'ORGANIZATION_ADMIN' | 'SUPER_ADMIN', path: string) => {
    switchRole(role);
    setEmployerDropdownOpen(false);
    openInNewTab(e, path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 border-b border-slate-200/80 backdrop-blur-md shadow-xs transition-all duration-200">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src="/logo.png"
              alt="MedDhatri"
              className="h-8 sm:h-11 md:h-14 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-200"
            />
          </Link>

          {/* Center: Standard Navigation Links */}
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

          {/* Right Action Items: [Login] [Sign Up] | [💼 For Employers ∨] */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* 1. Login Button */}
            <Link
              to="/login"
              className="text-[#0F394C] hover:text-[#20B2AA] hover:bg-slate-100/80 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-150 inline-flex items-center justify-center shrink-0 cursor-pointer"
            >
              Login
            </Link>

            {/* 2. Sign Up Button */}
            <Link
              to="/register"
              className="bg-[#20B2AA] hover:bg-[#179A93] text-white px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-150 inline-flex items-center justify-center shrink-0 cursor-pointer"
            >
              Sign Up
            </Link>

            {/* 3. For Employers Pill Button with Dropdown (Desktop & Tablet) */}
            <div className="relative hidden md:block" ref={employerDropdownRef}>
              <button
                onClick={() => setEmployerDropdownOpen(!employerDropdownOpen)}
                className="bg-[#0F394C] hover:bg-[#154E70] text-white px-4 sm:px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-xs hover:shadow-md transition-all duration-150 shrink-0 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-teal-300 shrink-0" />
                <span className="whitespace-nowrap">For Employers</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${employerDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* For Employer & Portal Access Dropdown Menu */}
              {employerDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95 text-slate-800">
                  {/* Header */}
                  <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#0F766E]" />
                      <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">PORTALS & EMPLOYER HUB</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                      New Tab ↗
                    </span>
                  </div>

                  {/* Section 1: Employer & Hiring Solutions */}
                  <div className="py-2 px-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                      Employer Actions
                    </span>

                    <a
                      href="/organization/jobs/create"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        setEmployerDropdownOpen(false);
                        handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/jobs/create');
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-teal-50/70 hover:text-teal-900 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <PlusCircle className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                        <span>Post a Healthcare Job</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                    </a>

                    <a
                      href="/organization/candidates"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        setEmployerDropdownOpen(false);
                        handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/candidates');
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-teal-50/70 hover:text-teal-900 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                        <span>Find Healthcare Candidates</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                    </a>

                    <a
                      href="/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        setEmployerDropdownOpen(false);
                        openInNewTab(e, '/pricing');
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-teal-50/70 hover:text-teal-900 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                        <span>Pricing & Hiring Plans</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                    </a>
                  </div>

                  {/* Section 2: Balanced Switch Portal Grid (Guide, Doctor, Recruiter, Admin) */}
                  <div className="pt-2 border-t border-slate-100 px-3 pb-2 bg-slate-50/70 rounded-xl mx-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                      Switch Portal (New Tab):
                    </span>

                    <div className="grid grid-cols-2 gap-1.5">
                      {/* 1. Guide */}
                      <a
                        href="/portals"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          setEmployerDropdownOpen(false);
                          openInNewTab(e, '/portals');
                        }}
                        className="py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 text-slate-700 hover:text-teal-900 transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer"
                        title="Open Portals Guide"
                      >
                        <div className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>Guide</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>

                      {/* 2. Doctor */}
                      <button
                        type="button"
                        onClick={(e) => handlePortalSwitchAndOpen(e, 'PROFESSIONAL', '/professional/dashboard')}
                        className={`py-2 px-2.5 rounded-xl border transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer ${user?.role === 'PROFESSIONAL'
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-black ring-1 ring-teal-400/30'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-900'
                          }`}
                        title="Open Clinician Portal (Doctor / Specialist)"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>👨‍⚕️</span>
                          <span>Doctor</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-teal-600" />
                      </button>

                      {/* 3. Recruiter */}
                      <button
                        type="button"
                        onClick={(e) => handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/dashboard')}
                        className={`py-2 px-2.5 rounded-xl border transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer ${user?.role === 'ORGANIZATION_ADMIN' || user?.role === 'RECRUITER'
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-black ring-1 ring-teal-400/30'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-900'
                          }`}
                        title="Open Employer Portal (Hospital / Recruiter)"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>🏥</span>
                          <span>Recruiter</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-teal-600" />
                      </button>

                      {/* 4. Admin */}
                      <button
                        type="button"
                        onClick={(e) => handlePortalSwitchAndOpen(e, 'SUPER_ADMIN', '/admin/dashboard')}
                        className={`py-2 px-2.5 rounded-xl border transition flex items-center justify-between font-bold text-xs shadow-2xs cursor-pointer ${user?.role === 'SUPER_ADMIN'
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-black ring-1 ring-teal-400/30'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-900'
                          }`}
                        title="Open Admin Portal"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>🛡️</span>
                          <span>Admin</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-teal-600" />
                      </button>
                    </div>
                  </div>

                  {/* Clean User Account Footer */}
                  {user && (
                    <div className="pt-2.5 border-t border-slate-100 px-3 mt-1 flex items-center justify-between gap-2">
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-[10px] text-teal-700 font-semibold capitalize truncate">
                          Active: {user.role?.toLowerCase().replace('_', ' ')}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEmployerDropdownOpen(false);
                          logout();
                        }}
                        className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer border border-rose-200 shadow-2xs"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden ml-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname === '/') {
                  document.getElementById('job-board-section')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/jobs');
                }
              }}
              className="block w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
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
              className="block w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              How It Works
            </button>
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              For Employers
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              About
            </Link>
            <Link
              to="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              Contact Us
            </Link>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handlePortalSwitchAndOpen(e, 'ORGANIZATION_ADMIN', '/organization/dashboard');
                }}
                className="py-2 px-3 rounded-lg bg-teal-50 text-teal-800 text-xs font-bold text-center"
              >
                Employer Portal ↗
              </button>
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handlePortalSwitchAndOpen(e, 'PROFESSIONAL', '/professional/dashboard');
                }}
                className="py-2 px-3 rounded-lg bg-[#0F394C] text-white text-xs font-bold text-center"
              >
                Clinician Portal ↗
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
