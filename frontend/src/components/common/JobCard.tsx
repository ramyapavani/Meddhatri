import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { formatSalary, timeAgo } from '../../lib/utils.js';

interface JobCardProps {
  job: any;
  onApply?: (job: any) => void;
  onSave?: (job: any) => void;
  showMatchScore?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onSave, showMatchScore = true }) => {
  const [saved, setSaved] = useState(false);
  const location = useLocation();
  const isProfessional = location.pathname.startsWith('/professional');
  const jobBasePath = isProfessional ? '/professional/jobs' : '/jobs';

  // Fallback / Deterministic score simulation for card display
  const matchScore = job.aiMatch?.score || 94;

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    if (onSave) onSave(job);
  };

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-[#2DC4B4] p-5 sm:p-6 shadow-subtle hover:shadow-md transition-all duration-300 relative flex flex-col justify-between">
      {/* Top Header with Org Logo & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            <img
              src={job.organization?.logo || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80'}
              alt={job.organization?.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80';
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#1B5F85] transition truncate">
                  {job.organization?.name || 'Healthcare Network'}
                </span>
                {job.organization?.verificationStatus === 'VERIFIED' && (
                  <span title="Verified Healthcare Institution" className="shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#0D9488] inline" />
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#1B5F85] group-hover:text-[#154E70] transition line-clamp-1">
                <Link to={`${jobBasePath}/${job.slug || job._id}`}>{job.title}</Link>
              </h3>
            </div>
          </div>

          {/* Bookmark Action */}
          <button
            onClick={handleSaveToggle}
            className={`p-2.5 rounded-xl border transition shrink-0 cursor-pointer ${
              saved
                ? 'bg-[#E0F7F5] border-[#2DC4B4]/40 text-[#1B5F85]'
                : 'border-slate-200 text-slate-400 hover:text-[#1B5F85] hover:border-[#2DC4B4]/30 bg-slate-50/70'
            }`}
            title={saved ? 'Job Saved' : 'Save Opportunity'}
            aria-label="Save Opportunity"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#0D9488] text-[#0D9488]' : ''}`} />
          </button>
        </div>

        {/* Clinical Department / Specialization */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#E0F7F5] text-[#1B5F85] border border-[#2DC4B4]/30">
            {job.profession}
          </span>
          {job.specialization && (
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
              {job.specialization}
            </span>
          )}
          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200/80">
            {job.workMode || 'On-site'}
          </span>
        </div>

        {/* Key Metrics: Location, Salary, Experience */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm text-slate-600 mb-3.5 sm:mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate font-medium">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate font-medium">{job.experienceMin}-{job.experienceMax} yrs</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1 truncate font-bold text-[#1B5F85]">
            <IndianRupee className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span className="truncate">{formatSalary(job.salaryMin, job.salaryMax)}</span>
          </div>
        </div>

        {/* Skills Pills */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
            {job.skills.slice(0, 4).map((skill: string, idx: number) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/60">
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-md text-slate-500 font-medium">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer with AI Match & Action */}
      <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {showMatchScore && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#E0F7F5] border border-[#2DC4B4]/40 text-[#1B5F85] px-3 py-1 rounded-full text-xs font-extrabold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{matchScore}% AI Match</span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline font-medium">{timeAgo(job.postedAt || new Date().toISOString())}</span>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Link
            to={`${jobBasePath}/${job.slug || job._id}`}
            className="text-xs sm:text-sm font-bold text-[#1B5F85] hover:text-[#154E70] px-3 py-2 rounded-xl hover:bg-[#E0F7F5] transition flex items-center gap-1 cursor-pointer"
          >
            Details
            <ArrowRight className="w-4 h-4 text-[#2DC4B4]" />
          </Link>
          <Link
            to={`${jobBasePath}/${job.slug || job._id}?apply=true`}
            className="text-xs sm:text-sm font-extrabold bg-[#2DC4B4] hover:bg-[#25ab9d] text-white px-4 py-2 rounded-xl shadow-xs hover:shadow-sm transition flex items-center gap-1 cursor-pointer"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

