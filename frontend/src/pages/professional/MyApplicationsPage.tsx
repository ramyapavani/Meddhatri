import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck2, 
  Building2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';

export const MyApplicationsPage: React.FC = () => {
  const applications = [
    {
      id: 'app_01',
      job: INITIAL_MOCK_JOBS[0],
      status: 'INTERVIEW',
      appliedAt: '2 days ago',
      matchScore: 96,
      currentStepIndex: 3,
      history: [
        { title: 'Application Received', date: 'April 11, 2026', done: true },
        { title: 'Credentials Verified & Shortlisted', date: 'April 12, 2026', done: true },
        { title: 'Clinical Round Scheduled', date: 'April 18, 2026', current: true },
        { title: 'Final Medical Board Review', date: 'Pending', done: false },
        { title: 'Offer Letter', date: 'Pending', done: false }
      ]
    },
    {
      id: 'app_02',
      job: INITIAL_MOCK_JOBS[1],
      status: 'SHORTLISTED',
      appliedAt: '5 days ago',
      matchScore: 91,
      currentStepIndex: 2,
      history: [
        { title: 'Application Received', date: 'April 8, 2026', done: true },
        { title: 'Candidate Profile Shortlisted', date: 'April 10, 2026', current: true },
        { title: 'Clinical Assessment', date: 'Pending', done: false },
        { title: 'Offer Decision', date: 'Pending', done: false }
      ]
    }
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#1B5F85] tracking-tight">My Healthcare Applications</h1>
        <p className="text-xs text-slate-500 mt-1">Track recruitment milestones, review stages, and interview schedules</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-subtle space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <img
                  src={app.job?.organization?.logo || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80'}
                  alt={app.job?.organization?.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80';
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#1B5F85] truncate">{app.job.title}</h3>
                  <p className="text-xs text-slate-500 truncate font-medium">{app.job.organization.name} • Applied {app.appliedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E0F7F5] border border-[#2DC4B4]/30 text-[#1B5F85] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#2DC4B4]" /> {app.matchScore}% Match
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#1B5F85] text-white uppercase tracking-wider shadow-2xs">
                  {app.status}
                </span>
              </div>
            </div>

            {/* Application Progress Timeline */}
            <div>
              <h4 className="text-xs font-extrabold text-[#1B5F85] uppercase tracking-wider mb-3 sm:mb-4">Hiring Progress Tracker</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                {app.history.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl sm:rounded-2xl border text-xs transition ${
                      step.done
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : step.current
                        ? 'bg-[#1B5F85] text-white border-[#1B5F85] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-xs">Step {idx + 1}</span>
                      {step.done && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="font-bold text-xs leading-snug">{step.title}</p>
                    <span className="text-xs opacity-80 block mt-1.5 font-medium">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
