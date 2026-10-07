import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  Compass, 
  Stethoscope, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Layers, 
  UserCheck, 
  Briefcase
} from 'lucide-react';

interface PortalInfo {
  id: 'public' | 'doctor' | 'nurse' | 'recruiter' | 'admin';
  name: string;
  badge: string;
  badgeColor: string;
  role: string;
  icon: any;
  targetUrl: string;
  personaName: string;
  headline: string;
  color: string;
  highlights: string[];
}

export const PORTALS_LIST: PortalInfo[] = [
  {
    id: 'public',
    name: 'Public Healthcare Marketplace',
    badge: 'Discovery & SEO',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    role: 'Guest / Public Visitor',
    icon: Compass,
    targetUrl: '/',
    personaName: 'Public Explorer',
    headline: 'Healthcare Job Search, Hospital Directories & Career Resources',
    color: 'bg-[#1B5F85]',
    highlights: [
      'Multi-filter clinical search (Specialty, Location, Experience)',
      'Hospital credentials directory (NABH & JCI accredited)',
      '2026 Healthcare salary reports & compensation guide',
      'Interactive AI match score preview on job cards'
    ]
  },
  {
    id: 'doctor',
    name: 'Doctor & Specialist Portal',
    badge: 'Verified Clinician',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    role: 'PROFESSIONAL',
    icon: Stethoscope,
    targetUrl: '/professional/dashboard',
    personaName: 'Dr. Ananya Rao (DM Cardiology)',
    headline: 'AI Matching, Procedural Scope & Career Command Center',
    color: 'bg-[#1B5F85]',
    highlights: [
      'Dynamic Profile Strength bar (92% completion calculator)',
      'AI Recommended jobs scored against clinical credentials',
      'Multi-stage application milestone tracker',
      'Medical Council license verification document vault'
    ]
  },
  {
    id: 'nurse',
    name: 'Nursing & Allied Health Portal',
    badge: 'Critical Care Staff',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    role: 'PROFESSIONAL',
    icon: UserCheck,
    targetUrl: '/professional/dashboard',
    personaName: 'Priya Nair (Lead ICU Staff Nurse)',
    headline: 'ICU Shifts, ACLS Certifications & Hospital Direct Chat',
    color: 'bg-[#1B5F85]',
    highlights: [
      'Critical care shift & ventilator competency tracking',
      'Direct messaging with quaternary hospital HR leads',
      'Interview schedule manager with video meeting links',
      'AI Resume Audit tool for healthcare keyword optimization'
    ]
  },
  {
    id: 'recruiter',
    name: 'Hospital Recruiter SaaS Suite',
    badge: 'Talent Acquisition',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    role: 'ORGANIZATION_ADMIN',
    icon: Building2,
    targetUrl: '/organization/dashboard',
    personaName: 'NovaCare Health HR Team',
    headline: '6-Stage Kanban Pipeline, Candidate Search & Job Wizard',
    color: 'bg-[#1B5F85]',
    highlights: [
      '6-Step Guided Vacancy Publishing Wizard with Zod checks',
      'Interactive Drag-and-Drop Recruitment Kanban Board',
      'Search verified candidate pool with instant shortlisting',
      'Hiring funnel conversion analytics & view velocity charts'
    ]
  },
  {
    id: 'admin',
    name: 'Super Admin Console',
    badge: 'Platform Governance',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    role: 'SUPER_ADMIN',
    icon: ShieldCheck,
    targetUrl: '/admin/dashboard',
    personaName: 'Dr. Rajesh Sharma (Super Admin)',
    headline: 'Medical Board Verification Audits & Platform KPIs',
    color: 'bg-[#1B5F85]',
    highlights: [
      'Audit State Medical Council licenses and grant verified badges',
      'Platform-wide user and hospital moderation tools',
      'Institutional growth telemetry & revenue tracking',
      'Clinical content CMS & compliance management'
    ]
  }
];

export const PortalGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { switchRolePersona } = useAuth();
  const navigate = useNavigate();
  const [selectedPortal, setSelectedPortal] = useState<PortalInfo>(PORTALS_LIST[1]);

  if (!isOpen) return null;

  const handleLaunchPortal = (portal: PortalInfo) => {
    const targetUrl = portal.targetUrl.startsWith('http') ? portal.targetUrl : `${window.location.origin}${portal.targetUrl}`;
    if (portal.id === 'doctor' || portal.id === 'nurse') {
      if (portal.id === 'doctor') switchRolePersona('doctor');
      else switchRolePersona('nurse');
      window.open(targetUrl, '_blank');
      onClose();
      return;
    }
    if (portal.id === 'recruiter') switchRolePersona('recruiter');
    else if (portal.id === 'admin') switchRolePersona('admin');
    window.open(targetUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#1B5F85] text-white p-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-teal-300 border border-white/10">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg">MedDhatri AI — Guided Portal Navigator</h2>
              <p className="text-xs text-teal-200">Switch roles & explore all 4 full-stack portals with 1-click</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Portal Selector List */}
          <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 p-4 space-y-2 overflow-y-auto shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
              Select Portal to Explore
            </span>
            {PORTALS_LIST.map((portal) => {
              const Icon = portal.icon;
              const isSelected = selectedPortal.id === portal.id;
              return (
                <button
                  key={portal.id}
                  onClick={() => setSelectedPortal(portal)}
                  className={`w-full text-left p-3 rounded-2xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#1B5F85] text-white' : 'bg-slate-200 text-slate-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{portal.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{portal.personaName}</p>
                    <span className={`inline-block mt-1.5 px-2 py-0.2 rounded-md text-[10px] font-bold border ${portal.badgeColor}`}>
                      {portal.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Preview Panel */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white">
            <div className={`${selectedPortal.color} text-white p-6 rounded-3xl shadow-md space-y-3`}>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Active Portal Preview</span>
              <h3 className="text-2xl font-black">{selectedPortal.name}</h3>
              <p className="text-xs text-slate-200 leading-relaxed max-w-xl">{selectedPortal.headline}</p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
                  👤 Role: <strong>{selectedPortal.role}</strong>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-teal-300">
                  {selectedPortal.personaName}
                </span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-700" />
                Key Features & Workflows to Test in This Portal
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPortal.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Instant jump with configured permissions</span>
              <button
                onClick={() => handleLaunchPortal(selectedPortal)}
                className="bg-[#1B5F85] hover:bg-[#154E70] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                Launch {selectedPortal.name}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subtle, collapsible widget in the corner
export const FloatingPortalDock: React.FC<{ onOpenGuide: () => void }> = ({ onOpenGuide }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { switchRolePersona } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="bg-[#1B5F85] hover:bg-[#154E70] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group ring-4 ring-[#2DC4B4]/20 cursor-pointer"
          title="Switch Role Portal"
        >
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#2DC4B4]" />
          <span className="font-bold text-xs pr-1 hidden sm:inline">Switch Portal</span>
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl p-2 rounded-2xl flex items-center gap-1.5 animate-in fade-in zoom-in-95 ring-4 ring-slate-900/5">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B5F85] text-white text-xs font-bold cursor-pointer hover:bg-[#154E70] transition"
          >
            <Layers className="w-3.5 h-3.5 text-[#2DC4B4]" />
            Guide
          </button>

          <button
            onClick={() => {
              switchRolePersona('doctor');
              window.open(`${window.location.origin}/professional/dashboard`, '_blank');
              setCollapsed(true);
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-[#E0F7F5] hover:text-[#1B5F85] transition cursor-pointer"
          >
            👨‍⚕️ Doctor
          </button>

          <button
            onClick={() => {
              switchRolePersona('recruiter');
              window.open(`${window.location.origin}/organization/dashboard`, '_blank');
              setCollapsed(true);
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-[#E0F7F5] hover:text-[#1B5F85] transition cursor-pointer"
          >
            🏥 Recruiter
          </button>

          <button
            onClick={() => {
              switchRolePersona('admin');
              window.open(`${window.location.origin}/admin/dashboard`, '_blank');
              setCollapsed(true);
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-[#E0F7F5] hover:text-[#1B5F85] transition cursor-pointer"
          >
            🛡️ Admin
          </button>

          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
