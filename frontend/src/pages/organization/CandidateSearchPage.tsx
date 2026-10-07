import React, { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, UserCheck, Calendar, X, Clock, MapPin, Video, CheckCircle2 } from 'lucide-react';
import { INITIAL_CANDIDATES } from '../../lib/mockDb.js';
import { CandidateCard } from '../../components/common/CandidateCard.js';
import { useNotifications } from '../../contexts/NotificationContext.js';

export const CandidateSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [professionFilter, setProfessionFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-10-12');
  const [interviewTime, setInterviewTime] = useState('11:00 AM');
  const [interviewType, setInterviewType] = useState('Video Round (AI Proctor)');

  const { addNotification } = useNotifications();

  const handleShortlist = (cand: any) => {
    addNotification({
      title: 'Candidate Shortlisted',
      message: `${cand.name} (${cand.specialization}) was added to your recruitment pipeline.`,
      type: 'APPLICATION'
    });
  };

  const handleScheduleClick = (cand: any) => {
    setSelectedCandidate(cand);
    setInterviewModalOpen(true);
  };

  const handleConfirmInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setInterviewModalOpen(false);
    addNotification({
      title: 'Interview Scheduled!',
      message: `Interview with ${selectedCandidate?.name} confirmed for ${interviewDate} at ${interviewTime} (${interviewType}).`,
      type: 'INTERVIEW'
    });
  };

  const filtered = INITIAL_CANDIDATES.filter((c) => {
    if (professionFilter !== 'All' && c.profession !== professionFilter) return false;
    if (locationFilter !== 'All' && c.location !== locationFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.specialization.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1B5F85] tracking-tight">Search Verified Healthcare Talent Pool</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Access council-registered doctors, critical care nurses, and pharmacologists with AI match scoring
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate by clinical skills, specialty, or name..."
            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <select
            value={professionFilter}
            onChange={(e) => setProfessionFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1B5F85] focus:ring-2 focus:ring-[#2DC4B4] focus:outline-none"
          >
            <option value="All">All Professions</option>
            <option value="Doctor">Doctors</option>
            <option value="Nurse">Staff Nurses</option>
            <option value="Pharmacist">Pharmacists</option>
            <option value="Lab Technologist">Lab Technologists</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1B5F85] focus:ring-2 focus:ring-[#2DC4B4] focus:outline-none"
          >
            <option value="All">All Cities</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((candidate) => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            onShortlist={handleShortlist}
            onSchedule={handleScheduleClick}
          />
        ))}
      </div>

      {/* Interview Scheduling Modal */}
      {interviewModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E0F7F5] text-[#1B5F85] flex items-center justify-center border border-[#2DC4B4]/40">
                  <Calendar className="w-5 h-5 text-[#2DC4B4]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1B5F85]">Schedule Clinical Round</h3>
                  <p className="text-xs text-slate-500">Candidate: {selectedCandidate.name} ({selectedCandidate.specialization})</p>
                </div>
              </div>
              <button
                onClick={() => setInterviewModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmInterview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Interview Format
                </label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
                >
                  <option value="Video Round (AI Proctor & Telehealth Suite)">Video Round (Telehealth Suite)</option>
                  <option value="In-Person Hospital Clinical Board">In-Person Hospital Clinical Board</option>
                  <option value="HOD & Medical Director Case Review">HOD & Medical Director Case Review</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM (Night Round)">06:00 PM (Night Round)</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 bg-[#E0F7F5]/50 border border-[#2DC4B4]/40 rounded-xl text-xs text-[#1B5F85] flex items-start gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2DC4B4] shrink-0 mt-0.5" />
                <span>The candidate will receive an instant email invitation with meeting credentials and calendar sync.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInterviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2DC4B4] hover:bg-[#25ab9d] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition cursor-pointer"
                >
                  Confirm & Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
