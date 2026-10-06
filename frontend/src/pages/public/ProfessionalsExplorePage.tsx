import React, { useState } from 'react';
import { Search, ShieldCheck, Sparkles, UserCheck, Stethoscope, ArrowRight } from 'lucide-react';
import { INITIAL_CANDIDATES } from '../../lib/mockDb.js';
import { CandidateCard } from '../../components/common/CandidateCard.js';

export const ProfessionalsExplorePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [professionFilter, setProfessionFilter] = useState('All');

  const filtered = INITIAL_CANDIDATES.filter((c) => {
    if (professionFilter !== 'All' && c.profession !== professionFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.specialization.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F7F5] border border-[#2DC4B4]/30 text-[#1B5F85] text-xs font-bold shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2DC4B4]" /> Council Validated Medical Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B5F85] tracking-tight">
          Explore Certified Healthcare Practitioners
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Connect directly with verified cardiologists, critical care nurses, clinical pharmacologists, and lab technologists.
        </p>
      </div>

      {/* Search Bar & Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by candidate name, specialty, or clinical competency..."
            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Doctor', 'Nurse', 'Pharmacist', 'Lab Technologist'].map((p) => (
            <button
              key={p}
              onClick={() => setProfessionFilter(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                professionFilter === p
                  ? 'bg-[#1B5F85] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cand) => (
          <CandidateCard key={cand._id} candidate={cand} />
        ))}
      </div>
    </div>
  );
};
