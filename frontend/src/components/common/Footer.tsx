import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  HelpCircle, 
  PhoneCall, 
  Users, 
  Sparkles, 
  Lock, 
  Award,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const mainSections = [
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'About Us', path: '/about', icon: Building2 },
    { name: 'Leadership', path: '/leadership', icon: Users },
    { name: 'How It Works', path: '/how-it-works', icon: Sparkles },
    { name: 'FAQs', path: '/faqs', icon: HelpCircle },
    { name: 'Contact Us', path: '/contact', icon: PhoneCall },
  ];

  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-[#1B5F85]/40 pt-10 sm:pt-14 pb-12 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* 1. Dedicated Quick Section Navigator Bar */}
        <div className="bg-[#1B5F85]/60 border border-teal-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-10 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#2DC4B4] uppercase tracking-wider block">Platform Sitemap</span>
              <h3 className="text-base sm:text-lg font-black text-white">Explore All MedDhatri Sections</h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {mainSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <Link
                    key={sec.path}
                    to={sec.path}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#2DC4B4] text-white hover:text-[#102A43] text-xs font-bold transition border border-white/15 shadow-2xs group"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#2DC4B4] group-hover:text-[#102A43] transition-colors" />
                    <span>{sec.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Structured Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-700/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 text-center sm:text-left">
            <Link to="/" className="inline-block group bg-white px-4 py-2 rounded-2xl shadow-sm transition">
              <img
                src="/logo.png"
                alt="MedDhatri"
                className="h-9 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto sm:mx-0 leading-relaxed font-normal">
              The premier healthcare career & talent ecosystem connecting certified clinicians, specialists, and nursing officers with accredited hospitals and health networks.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-teal-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Medical Council Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-cyan-300 font-semibold">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> HIPAA Compliant Data
              </span>
            </div>
          </div>

          {/* Quick Links 1: Professionals */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-sm mb-3.5 text-[#2DC4B4]">For Professionals</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link to="/jobs" className="hover:text-teal-300 transition">Explore Healthcare Jobs</Link></li>
              <li><Link to="/professional/recommended" className="hover:text-teal-300 transition">AI Job Recommendations</Link></li>
              <li><Link to="/professional/verification" className="hover:text-teal-300 transition">Credential Verification</Link></li>
              <li><Link to="/faqs" className="hover:text-teal-300 transition">FAQs & Knowledge Base</Link></li>
              <li><Link to="/how-it-works" className="hover:text-teal-300 transition">How Platform Works</Link></li>
              <li><Link to="/contact" className="hover:text-teal-300 transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Quick Links 2: Organizations */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-sm mb-3.5 text-[#2DC4B4]">For Hospitals & Employers</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link to="/organization/jobs/create" className="hover:text-teal-300 transition">Post Clinical Openings</Link></li>
              <li><Link to="/organization/candidates" className="hover:text-teal-300 transition">Search Candidate Pool</Link></li>
              <li><Link to="/organization/applications" className="hover:text-teal-300 transition">Recruitment Pipeline Kanban</Link></li>
              <li><Link to="/pricing" className="hover:text-teal-300 transition">Enterprise Hospital Plans</Link></li>
              <li><Link to="/organizations" className="hover:text-teal-300 transition">Explore Partner Hospitals</Link></li>
            </ul>
          </div>

          {/* Quick Links 3: Top Hubs & Specialities */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-sm mb-3.5 text-[#2DC4B4]">Top Medical Hubs</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link to="/jobs?location=Hyderabad" className="hover:text-teal-300 transition">Doctors in Hyderabad</Link></li>
              <li><Link to="/jobs?location=Bangalore" className="hover:text-teal-300 transition">Hospitals in Bangalore</Link></li>
              <li><Link to="/jobs?profession=Nurse" className="hover:text-teal-300 transition">Critical Care Nurses</Link></li>
              <li><Link to="/jobs?profession=Pharmacist" className="hover:text-teal-300 transition">Clinical Pharmacists</Link></li>
              <li><Link to="/jobs?profession=Healthcare+IT" className="hover:text-teal-300 transition">Health Informatics & AI</Link></li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
          <p>&copy; 2026 MedDhatri AI Platform. All rights reserved. Healthcare Career & Talent Marketplace.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/about" className="hover:text-white transition">About Us</Link>
            <Link to="/leadership" className="hover:text-white transition">Leadership</Link>
            <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link to="/faqs" className="hover:text-white transition">FAQs</Link>
            <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
            <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
