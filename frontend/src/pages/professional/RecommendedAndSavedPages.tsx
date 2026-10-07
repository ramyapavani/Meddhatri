import React from 'react';
import { Sparkles, Bookmark } from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';

export const RecommendedJobsPage: React.FC = () => {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1B5F85] flex items-center gap-2 tracking-tight">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#2DC4B4]" />
            AI Recommended Healthcare Openings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked based on your medical specialization, procedural scope, and clinical credentials
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {INITIAL_MOCK_JOBS.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export const SavedJobsPage: React.FC = () => {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#1B5F85] flex items-center gap-2 tracking-tight">
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-[#2DC4B4]" />
          Saved Opportunities
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Bookmarked healthcare roles for review and application</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {INITIAL_MOCK_JOBS.slice(0, 2).map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};
