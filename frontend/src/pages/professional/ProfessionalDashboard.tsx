import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  FileCheck2, 
  Calendar, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';

export const ProfessionalDashboard: React.FC = () => {
  const { user } = useAuth();

  const profileCompletion = 92;

  const upcomingInterviews = [
    {
      id: 'int_1',
      hospital: 'NovaCare Health Institute',
      role: 'Senior Interventional Cardiologist',
      date: 'April 18, 2026',
      time: '11:00 AM IST',
      type: 'Video Medical Round',
      meetingLink: 'https://meet.meddhatri.ai/room-novacare-cardio'
    }
  ];

  const recentApplications = [
    {
      id: 'app_1',
      hospital: 'NovaCare Health Institute',
      role: 'Senior Interventional Cardiologist',
      status: 'INTERVIEW',
      appliedDate: '2 days ago',
      matchScore: 96
    },
    {
      id: 'app_2',
      hospital: 'Medisphere Hospitals',
      role: 'Consultant Clinical Cardiologist',
      status: 'SHORTLISTED',
      appliedDate: '5 days ago',
      matchScore: 91
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome & Profile Strength Banner */}
      <div className="bg-[#1B5F85] text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-teal-500/20 border border-teal-300/30 text-teal-200 text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" /> Medical Registration Verified
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Dr. Ananya Rao'}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
              {user?.headline || 'Senior Interventional Cardiologist • MD, DM Cardiology'}
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl w-full lg:w-72 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Profile Strength</span>
              <span className="font-extrabold text-teal-300">{profileCompletion}% Complete</span>
            </div>
            <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
              <div className="bg-[#2DC4B4] h-full rounded-full" style={{ width: `${profileCompletion}%` }} />
            </div>
            <Link to="/professional/profile" className="text-[11px] text-teal-200 hover:text-white font-semibold block text-right">
              Edit Clinical Credentials ➔
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Blocks (2 columns on mobile, 4 columns on large screens) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Link to="/professional/recommended" className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-subtle hover:border-[#2DC4B4] transition flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xl sm:text-2xl font-black text-[#1B5F85]">8</span>
            <span className="text-xs font-semibold text-slate-500 block mt-0.5 truncate">AI Recommended</span>
          </div>
          <div className="p-2 sm:p-3 bg-[#E0F7F5] text-[#1B5F85] rounded-xl shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#2DC4B4]" />
          </div>
        </Link>

        <Link to="/professional/applications" className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-subtle hover:border-[#2DC4B4] transition flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xl sm:text-2xl font-black text-[#1B5F85]">4</span>
            <span className="text-xs font-semibold text-slate-500 block mt-0.5 truncate">Active Applied</span>
          </div>
          <div className="p-2 sm:p-3 bg-[#E0F7F5] text-[#1B5F85] rounded-xl shrink-0">
            <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#2DC4B4]" />
          </div>
        </Link>

        <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-subtle flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xl sm:text-2xl font-black text-[#1B5F85]">1</span>
            <span className="text-xs font-semibold text-slate-500 block mt-0.5 truncate">Upcoming Meet</span>
          </div>
          <div className="p-2 sm:p-3 bg-[#E0F7F5] text-[#1B5F85] rounded-xl shrink-0">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#2DC4B4]" />
          </div>
        </div>

        <Link to="/professional/saved" className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-subtle hover:border-[#2DC4B4] transition flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-xl sm:text-2xl font-black text-[#1B5F85]">5</span>
            <span className="text-xs font-semibold text-slate-500 block mt-0.5 truncate">Saved Jobs</span>
          </div>
          <div className="p-2 sm:p-3 bg-[#E0F7F5] text-[#1B5F85] rounded-xl shrink-0">
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-[#2DC4B4]" />
          </div>
        </Link>
      </div>

      {/* Grid: Recommended Jobs (Left) + Upcoming Interviews & Applications (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Recommended Opportunities */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-base sm:text-lg text-[#1B5F85] flex items-center gap-2 tracking-tight">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#2DC4B4]" />
              High-Match Clinical Openings
            </h2>
            <Link to="/professional/recommended" className="text-xs font-bold text-[#1B5F85] hover:text-[#2DC4B4]">
              View All ➔
            </Link>
          </div>

          <div className="space-y-4">
            {INITIAL_MOCK_JOBS.slice(0, 2).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </div>

        {/* Right: Upcoming Interviews & Applications Tracker */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interview Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-subtle space-y-4">
            <h3 className="font-extrabold text-sm text-[#1B5F85] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2DC4B4]" /> Upcoming Hospital Interview
            </h3>
            {upcomingInterviews.map((int) => (
              <div key={int.id} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#E0F7F5]/50 border border-[#2DC4B4]/40 space-y-3">
                <div>
                  <span className="font-extrabold text-xs text-[#1B5F85] block">{int.role}</span>
                  <span className="text-xs text-[#2DC4B4] font-bold">{int.hospital}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 font-medium">
                  <p><strong>Date:</strong> {int.date} at {int.time}</p>
                  <p><strong>Format:</strong> {int.type}</p>
                </div>
                <a
                  href={int.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-[#2DC4B4] hover:bg-[#25ab9d] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Join Clinical Meeting
                </a>
              </div>
            ))}
          </div>

          {/* Recent Applications Mini Tracker */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-subtle space-y-4">
            <h3 className="font-extrabold text-sm text-[#1B5F85] flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#2DC4B4]" /> Active Application Status
            </h3>
            <div className="space-y-2.5 sm:space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-[#1B5F85] truncate">{app.role}</h4>
                    <span className="text-xs text-slate-500 truncate block font-medium">{app.hospital}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-[#E0F7F5] text-[#1B5F85] border border-[#2DC4B4]/30 shrink-0">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/professional/applications" className="text-xs font-bold text-[#1B5F85] block text-center hover:text-[#2DC4B4] pt-2">
              Open Complete Applications Tracker ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
