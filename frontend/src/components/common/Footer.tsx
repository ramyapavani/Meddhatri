import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  HelpCircle, 
  PhoneCall, 
  Users, 
  Sparkles, 
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const mainSections = [
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'About', path: '/about', icon: Building2 },
    { name: 'Leadership', path: '/leadership', icon: Users },
    { name: 'How It Works', path: '/how-it-works', icon: Sparkles },
    { name: 'FAQs', path: '/faqs', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <footer className="bg-[#1B5F85] text-slate-100 border-t border-[#2DC4B4]/30 pt-6 sm:pt-10 pb-20 md:pb-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Desktop-Only Sitemap Quick Bar */}
        <div className="hidden md:flex items-center justify-between bg-black/20 border border-[#2DC4B4]/20 rounded-2xl p-3 px-5 mb-8 shadow-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#2DC4B4] uppercase tracking-wider">Platform Sitemap:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {mainSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={sec.path}
                  to={sec.path}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#2DC4B4] text-white hover:text-[#1B5F85] text-xs font-bold transition border border-white/10 shadow-2xs group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#2DC4B4] group-hover:text-[#1B5F85] transition-colors" />
                  <span>{sec.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Structured Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-700/60">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2 space-y-2.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <Link to="/" className="inline-block bg-white px-4 py-2 rounded-2xl shadow-xs transition hover:shadow-md">
                <img
                  src="/logo.png"
                  alt="MedDhatri"
                  className="h-10 sm:h-12 md:h-14 w-auto max-w-[220px] object-contain"
                />
              </Link>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 max-w-sm mx-auto sm:mx-0 leading-relaxed">
              Healthcare career & talent ecosystem connecting certified clinicians with accredited hospitals and health networks.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-[10px] text-teal-300 font-semibold">
                <ShieldCheck className="w-3 h-3 text-teal-400" /> Council Verified
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-[10px] text-cyan-300 font-semibold">
                <Lock className="w-3 h-3 text-cyan-400" /> HIPAA Compliant
              </span>
            </div>
          </div>

          {/* Quick Links 1: Professionals */}
          <div className="text-left">
            <h4 className="text-white font-bold text-xs sm:text-sm mb-2 text-[#2DC4B4]">For Clinicians</h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-300 font-medium">
              <li><Link to="/jobs" className="hover:text-teal-300 transition">Explore Jobs</Link></li>
              <li><Link to="/professional/recommended" className="hover:text-teal-300 transition">AI Recommendations</Link></li>
              <li><Link to="/professional/verification" className="hover:text-teal-300 transition">Verification Vault</Link></li>
              <li><Link to="/faqs" className="hover:text-teal-300 transition">Knowledge FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-teal-300 transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Quick Links 2: Organizations */}
          <div className="text-left">
            <h4 className="text-white font-bold text-xs sm:text-sm mb-2 text-[#2DC4B4]">For Hospitals</h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-300 font-medium">
              <li><Link to="/organization/jobs/create" className="hover:text-teal-300 transition">Post Job Openings</Link></li>
              <li><Link to="/organization/candidates" className="hover:text-teal-300 transition">Candidate Pool</Link></li>
              <li><Link to="/organization/applications" className="hover:text-teal-300 transition">Pipeline Kanban</Link></li>
              <li><Link to="/pricing" className="hover:text-teal-300 transition">Hospital Plans</Link></li>
              <li><Link to="/organizations" className="hover:text-teal-300 transition">Partner Networks</Link></li>
            </ul>
          </div>

          {/* Quick Links 3: Top Hubs */}
          <div className="col-span-2 sm:col-span-1 text-left hidden sm:block">
            <h4 className="text-white font-bold text-xs sm:text-sm mb-2 text-[#2DC4B4]">Medical Hubs</h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-300 font-medium">
              <li><Link to="/jobs?location=Hyderabad" className="hover:text-teal-300 transition">Hyderabad Doctors</Link></li>
              <li><Link to="/jobs?location=Bangalore" className="hover:text-teal-300 transition">Bangalore Hospitals</Link></li>
              <li><Link to="/jobs?profession=Nurse" className="hover:text-teal-300 transition">Critical Care Nurses</Link></li>
              <li><Link to="/jobs?profession=Pharmacist" className="hover:text-teal-300 transition">Clinical Pharmacists</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2.5 text-center sm:text-left">
          <p>&copy; 2026 MedDhatri AI. Healthcare Career & Talent Platform.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="/leadership" className="hover:text-white transition">Leadership</Link>
            <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link to="/faqs" className="hover:text-white transition">FAQs</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
            <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
