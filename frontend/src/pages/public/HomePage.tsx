import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
  User,
  Brain,
  FileCheck2,
  ChevronDown,
  ExternalLink,
  Briefcase,
  Check,
  Star,
  ChevronUp,
  MessageCircle,
  Stethoscope,
  HeartPulse,
  Pill,
  Activity,
  SlidersHorizontal,
  RotateCcw,
  TrendingUp,
  Quote,
  Users,
  Compass,
  FileText,
  Zap,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { formatSalary } from '../../lib/utils.js';
import { hospitalPartnersList, HospitalBrandLogo, HospitalFullBrandLogo } from '../../components/common/HospitalLogos.js';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Hero Search States & Live Typeahead
  const [heroRole, setHeroRole] = useState('');
  const [heroLocation, setHeroLocation] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Interactive Job Board Filter States (Slide 3)
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [hospitalTypeFilter, setHospitalTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'match' | 'all'>('match');
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live Typeahead Filtered Suggestions
  const searchSuggestions = useMemo(() => {
    const query = heroRole.trim().toLowerCase();
    const locQuery = heroLocation.trim().toLowerCase();

    const matchedJobs = INITIAL_MOCK_JOBS.filter(j => {
      const matchRole = !query || j.title.toLowerCase().includes(query) || j.specialization?.toLowerCase().includes(query) || j.profession.toLowerCase().includes(query);
      const matchLoc = !locQuery || j.location.toLowerCase().includes(locQuery);
      return matchRole && matchLoc;
    }).slice(0, 3);

    return matchedJobs;
  }, [heroRole, heroLocation]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    const params = new URLSearchParams();
    if (heroRole) params.append('search', heroRole);
    if (heroLocation) params.append('location', heroLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleCategoryClick = (category: string) => {
    setHeroRole(category);
    setSpecialtyFilter(category);
    const element = document.getElementById('job-board-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Featured Roles (Slide 2)
  const featuredRoles = [
    {
      id: 'job_001',
      title: 'Senior Cardiologist',
      hospital: 'Apollo Hospitals, Hyderabad',
      slug: 'senior-cardiologist-apollo-hospitals',
      type: 'Full-time',
      verified: true
    },
    {
      id: 'job_002',
      title: 'ICU Nurse',
      hospital: 'Medicover Hospitals, Hyderabad',
      slug: 'icu-nurse-medicover-hospitals',
      type: 'Full-time',
      verified: true
    },
    {
      id: 'job_003',
      title: 'Pediatrician',
      hospital: 'KIMS Hospitals, Secunderabad',
      slug: 'pediatrician-kims-hospitals',
      type: 'Full-time',
      verified: true
    }
  ];

  // Filtered Job Listings for Slide 3 Job Board
  const filteredJobs = useMemo(() => {
    return INITIAL_MOCK_JOBS.filter((job) => {
      // Specialty Filter
      if (specialtyFilter !== 'All') {
        const spec = specialtyFilter.toLowerCase();
        const matchesSpec = job.specialization?.toLowerCase().includes(spec) ||
          job.profession?.toLowerCase().includes(spec) ||
          job.title?.toLowerCase().includes(spec);
        if (!matchesSpec) return false;
      }

      // Location Filter
      if (locationFilter !== 'All') {
        const loc = locationFilter.toLowerCase();
        if (!job.location.toLowerCase().includes(loc)) return false;
      }

      // Experience Filter
      if (experienceFilter === '0-2') {
        if (job.experienceMin > 2) return false;
      } else if (experienceFilter === '3-5') {
        if (job.experienceMin > 5 || job.experienceMax < 3) return false;
      } else if (experienceFilter === '5+') {
        if (job.experienceMax < 5) return false;
      }

      // Hospital Type Filter
      if (hospitalTypeFilter !== 'All') {
        const orgType = job.organization?.organizationType?.toLowerCase() || '';
        if (hospitalTypeFilter === 'Corporate Hospital' && !orgType.includes('corporate') && !orgType.includes('hospital')) return false;
        if (hospitalTypeFilter === 'Multi-Specialty Clinic' && !orgType.includes('clinic')) return false;
        if (hospitalTypeFilter === 'Diagnostic Center' && !orgType.includes('diagnostic')) return false;
      }

      return true;
    });
  }, [specialtyFilter, locationFilter, experienceFilter, hospitalTypeFilter]);

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 3);

  const resetFilters = () => {
    setSpecialtyFilter('All');
    setLocationFilter('All');
    setExperienceFilter('All');
    setHospitalTypeFilter('All');
  };

  const activeFiltersCount = [
    specialtyFilter !== 'All',
    locationFilter !== 'All',
    experienceFilter !== 'All',
    hospitalTypeFilter !== 'All'
  ].filter(Boolean).length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-clip pb-16 sm:pb-0">

      {/* =========================================================================
          SLIDE 1: HERO SECTION - SEAMLESS BACKGROUND INTEGRATION
          ========================================================================= */}
      <section className="relative bg-white border-b border-slate-200/80 flex items-center overflow-hidden">

        {/* Desktop Right-Side Crystal-Clear Medical Team Visual (Zero fog over doctors) */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[58%] xl:w-[54%] pointer-events-none select-none z-0 overflow-hidden">
          <img
            src="/hero-medical-team-hd.jpg?v=5"
            alt="Healthcare medical team discussing patient care"
            className="w-full h-full object-cover object-[80%_center] transition-all duration-300"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              filter: 'contrast(1.08) brightness(1.02) saturate(1.06)'
            }}
          />
          {/* Subtle soft edge blend on the left edge only - doctors on right have 0% fog */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        {/* Hero Content on the Left */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 pb-6 sm:py-14 lg:py-20">
          <div className="max-w-xl lg:max-w-[540px] xl:max-w-[580px] space-y-3 sm:space-y-6 text-left">

            {/* Headline & Subtitle */}
            <div className="space-y-1.5 sm:space-y-3">
              <h1 className="text-[22px] xs:text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-black text-[#0F394C] uppercase tracking-tight leading-tight sm:leading-[1.08] max-w-lg lg:max-w-[460px] xl:max-w-xl">
                THE RIGHT HEALTHCARE<br />
                <span className="text-[#20B2AA]">ROLE MATCHED TO YOU.</span>
              </h1>

              <p className="text-xs sm:text-base lg:text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                Verified opportunities from trusted hospitals and healthcare networks.
              </p>
            </div>

            {/* Unified Hero Search Box Capsule with Live Typeahead */}
            <div className="relative w-full max-w-full sm:max-w-[540px] md:max-w-[580px]" ref={searchBoxRef}>
              <form
                onSubmit={handleHeroSearch}
                className="bg-white p-2.5 sm:p-2 rounded-2xl sm:rounded-full shadow-[0_4px_25px_rgba(15,57,76,0.08)] border border-slate-100 sm:border-teal-500/30 hover:border-teal-500/60 focus-within:border-[#20B2AA] focus-within:ring-2 focus-within:ring-[#20B2AA]/15 transition-all duration-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 w-full"
              >
                {/* Role Input Field */}
                <div className="flex-1 min-w-0 flex items-center px-3.5 py-2.5 sm:py-1 bg-slate-50/70 sm:bg-transparent rounded-xl sm:rounded-none">
                  <Search className="w-4 h-4 text-[#20B2AA] shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={heroRole}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setHeroRole(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    placeholder="Role (e.g. Cardiologist)"
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent font-medium truncate"
                  />
                </div>

                {/* Vertical Divider (Desktop only) */}
                <div className="hidden sm:block h-6 w-[1px] bg-slate-200 shrink-0" />

                {/* Location Input Field */}
                <div className="flex-1 min-w-0 flex items-center px-3.5 py-2.5 sm:py-1 bg-slate-50/70 sm:bg-transparent rounded-xl sm:rounded-none">
                  <MapPin className="w-4 h-4 text-[#20B2AA] shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={heroLocation}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setHeroLocation(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    placeholder="Location (e.g. Hyderabad)"
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent font-medium truncate"
                  />
                </div>

                {/* Search Action Button */}
                <button
                  type="submit"
                  className="bg-[#20B2AA] hover:bg-[#179A93] active:scale-[0.98] text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full shadow-xs hover:shadow-md transition-all duration-150 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer w-full sm:w-auto"
                >
                  <Search className="w-4 h-4 text-white sm:hidden" />
                  <span>Search</span>
                </button>
              </form>

              {/* Live Typeahead Floating Suggestions Popover */}
              {isSearchFocused && (heroRole.trim() || heroLocation.trim()) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Matching Roles & Vacancies</span>
                    <span className="text-[11px] font-semibold text-teal-700">{searchSuggestions.length} found</span>
                  </div>

                  {searchSuggestions.length > 0 ? (
                    <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((job) => (
                        <Link
                          key={job._id}
                          to={`/jobs/${job.slug || job._id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-teal-50/60 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs border border-teal-200/50">
                              {job.organization.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                {job.title}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {job.organization.name} • {job.location}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md shrink-0">
                            {formatSalary(job.salaryMin, job.salaryMax)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-500 text-center">
                      No exact matches. Press <strong>Search</strong> to explore related opportunities.
                    </div>
                  )}

                  <div className="px-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Popular: Cardiology, ICU, Hyderabad</span>
                    <button
                      type="button"
                      onClick={handleHeroSearch}
                      className="text-teal-700 font-bold hover:underline"
                    >
                      View all in Job Board &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Category Quick Tags */}
            <div className="pt-1.5">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                {['Doctors', 'Nurses', 'Pharmacists', 'Allied Health'].map((category) => {
                  const isActive = category === 'Doctors';
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition text-center whitespace-nowrap shrink-0 cursor-pointer ${isActive
                          ? 'bg-[#E0F7F5] border-[#20B2AA] text-[#0F766E] shadow-2xs'
                          : 'bg-white border-slate-200/80 text-slate-600 hover:border-[#20B2AA] hover:text-[#20B2AA]'
                        }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Metrics Strip - Soft Rounded Capsule Matching Mockup */}
            <div className="bg-[#F0FAF8] border border-teal-200/60 rounded-2xl py-2 px-3 sm:px-4 flex items-center justify-between text-[10.5px] sm:text-xs font-bold text-[#0F394C]">
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#20B2AA] shrink-0" />
                <span>100% Verified</span>
              </div>
              <span className="text-teal-400 select-none">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Building2 className="w-3.5 h-3.5 text-[#20B2AA] shrink-0" />
                <span>500+ Hospitals</span>
              </div>
              <span className="text-teal-400 select-none">•</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Star className="w-3.5 h-3.5 text-[#20B2AA] shrink-0" />
                <span>Zero Fees</span>
              </div>
            </div>

            {/* Dedicated Mobile Crystal-Clear Medical Team Showcase */}
            <div className="lg:hidden pt-0.5">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100 h-40 xs:h-44 w-full">
                <img
                  src="/hero-medical-team-hd.jpg?v=7"
                  alt="Verified Healthcare Medical Team"
                  className="w-full h-full object-cover"
                  style={{
                    transform: 'scale(1.75) translate(-10%, 2%)',
                    transformOrigin: 'center center',
                    imageRendering: '-webkit-optimize-contrast',
                    filter: 'contrast(1.08) brightness(1.02) saturate(1.06)'
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#0F394C]">500+ Verified Hospital Roles</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/50">Active Hiring</span>
                </div>
              </div>
            </div>

            {/* Mobile Dedicated LIVE 2026 PAY Card Matching Mockup */}
            <div className="lg:hidden bg-gradient-to-r from-[#0F394C] to-[#154E70] rounded-2xl p-3 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="p-1 rounded bg-teal-500/20 text-[#2DC4B4] shrink-0">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-extrabold tracking-wide uppercase text-teal-300 text-[10.5px]">
                      LIVE 2026 PAY:
                    </span>
                    <span className="text-white font-bold text-xs">
                      Cardiologist: ₹35L – ₹65L
                    </span>
                  </div>

                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2DC4B4] hover:text-white transition"
                  >
                    <span>Explore Compensation Insights</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="w-10 h-10 rounded-full bg-teal-900/70 border border-teal-500/40 flex items-center justify-center shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5 text-teal-300" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          HEALTHCARE SALARY BENCHMARKS STRIP (Desktop only)
          ========================================================================= */}
      <section className="hidden lg:block bg-gradient-to-r from-[#0F394C] to-[#154E70] text-white py-3 sm:py-4 px-4 sm:px-6 lg:px-8 shadow-inner border-y border-teal-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 pr-12 sm:pr-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
            <span className="p-1 rounded bg-teal-500/20 text-[#2DC4B4] shrink-0">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <span className="font-extrabold tracking-wide uppercase text-teal-300 text-[11px] sm:text-xs whitespace-nowrap">Live 2026 Pay:</span>
            <span className="text-slate-200 text-xs whitespace-nowrap">Cardiologist: <strong className="text-white">₹35L - ₹65L</strong></span>
            <span className="text-slate-200 text-xs hidden sm:inline">• ICU: <strong className="text-white">₹20L - ₹38L</strong></span>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#2DC4B4] hover:text-white transition whitespace-nowrap self-start sm:self-auto"
          >
            <span>Explore Compensation Insights</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SLIDE 2: TRUSTED HOSPITAL PARTNERS & FEATURED ROLES
          ========================================================================= */}
      <section id="trusted-partners-section" className="py-10 sm:py-14 bg-white border-b border-slate-200/80">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Part A: TRUSTED BY TOP HOSPITALS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#20B2AA] shrink-0 shadow-2xs">
                    <Award className="w-4 h-4 text-teal-600" />
                  </div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-black tracking-wider uppercase">
                    <span className="bg-gradient-to-r from-[#0F394C] via-[#1B5F85] to-[#20B2AA] bg-clip-text text-transparent">
                      TRUSTED BY TOP HOSPITALS
                    </span>
                  </h2>
                </div>

                <div className="flex items-center gap-2 pl-9">
                  <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#0F394C] to-[#1B5F85] text-white text-xs font-black px-2.5 py-0.5 rounded-md shadow-2xs">
                    50+
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-2">
                    Accredited Networks Actively Hiring
                    <span className="relative flex h-2 w-2" title="Active Hiring Now">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </p>
                </div>
              </div>

              <span className="text-xs text-[#0F766E] font-bold bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/70 shadow-2xs self-start sm:self-auto flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#20B2AA]" />
                Direct Hospital HR Placement
              </span>
            </div>

            {/* Hospital Partner Badges: Nextenti-Style Infinite Smooth Auto-Scrolling Marquee */}
            <div className="relative w-full overflow-hidden py-1">
              {/* Left & Right Edge Vignette Fades */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

              <div className="animate-hospital-marquee flex items-center gap-4 py-2 hover:[animation-play-state:paused] cursor-pointer">
                {[...hospitalPartnersList, ...hospitalPartnersList].map((hospital, idx) => (
                  <div
                    key={`${hospital.id}-${idx}`}
                    className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 select-none cursor-pointer"
                    onClick={() => {
                      setSearchKeyword(hospital.shortName);
                      document.getElementById('job-board-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {/* Official Brand Logo Banner */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                      <div className="h-10 flex items-center shrink-0 max-w-[210px]">
                        <HospitalFullBrandLogo id={hospital.id} className="h-9 w-auto max-w-[200px] object-contain group-hover:scale-[1.03] transition-transform origin-left" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0 border border-emerald-200/60 shadow-2xs">
                        Verified HR
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700 truncate">{hospital.tagline}</p>
                      <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                        <span className="truncate">{hospital.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Part B: FEATURED HEALTHCARE ROLES */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#20B2AA] shrink-0 shadow-2xs">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-black tracking-wider uppercase">
                    <span className="bg-gradient-to-r from-[#0F394C] via-[#1B5F85] to-[#20B2AA] bg-clip-text text-transparent">
                      FEATURED HEALTHCARE ROLES
                    </span>
                  </h2>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#0F766E] font-bold bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200/60 shadow-2xs self-start sm:self-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span>Immediate Joining Available</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {featuredRoles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white rounded-xl border border-slate-200/90 hover:border-[#20B2AA] p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-[#0F394C] group-hover:text-[#20B2AA] transition-colors leading-snug">
                        {role.title}
                      </h3>
                      {role.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-full shrink-0 border border-teal-200/50">
                          <CheckCircle2 className="w-3 h-3 text-[#20B2AA]" /> Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{role.hospital}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {role.type}
                    </span>

                    <Link
                      to={`/jobs/${role.slug}`}
                      className="text-xs font-bold text-[#20B2AA] hover:text-[#179A93] flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>View role</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SLIDE 3: INTERACTIVE JOB FILTERS & AI-MATCHED LISTINGS
          ========================================================================= */}
      <section id="job-board-section" className="pt-6 pb-4 sm:py-14 bg-[#F8FAFC]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

          {/* Mobile Filter Toggle Header */}
          <div
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs cursor-pointer hover:border-teal-500/50 transition-colors select-none"
          >
            <div className="flex items-center gap-2 font-black text-sm text-[#0F394C]">
              <SlidersHorizontal className="w-4 h-4 text-[#20B2AA]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-teal-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-0.5">
                  {activeFiltersCount} active
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFilters();
                  }}
                  className="text-xs text-[#20B2AA] font-bold px-2 py-1 rounded-md hover:bg-teal-50 cursor-pointer"
                >
                  Reset
                </button>
              )}
              <div className="p-1 rounded-lg text-slate-400">
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileFilterOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

            {/* Left Sidebar: "Job Filters" */}
            <aside className={`lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_25px_rgba(15,57,76,0.04)] space-y-5 lg:sticky lg:top-24 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <h3 className="text-base sm:text-lg font-black text-[#0F394C] flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#20B2AA]" />
                  Job Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#20B2AA] hover:text-[#179A93] font-bold flex items-center gap-1 transition cursor-pointer px-2.5 py-1 rounded-lg hover:bg-[#EAF8F7]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                )}
              </div>

              {/* Specialty Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F394C] block">Specialty</label>
                <div className="relative rounded-2xl border border-[#20B2AA]/50 bg-[#EAF8F7] hover:border-[#20B2AA] focus-within:border-[#20B2AA] focus-within:ring-2 focus-within:ring-[#20B2AA]/20 transition-all duration-150 shadow-2xs">
                  <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="w-full bg-transparent pl-4 pr-10 py-3 text-sm text-[#0F394C] font-semibold focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="All" className="bg-white text-slate-800">All Specialties</option>
                    <option value="Clinical Pharmacist" className="bg-white text-slate-800">Clinical Pharmacist</option>
                    <option value="Cardiology" className="bg-white text-slate-800">Cardiology</option>
                    <option value="ICU" className="bg-white text-slate-800">Critical Care & ICU</option>
                    <option value="Pediatrics" className="bg-white text-slate-800">Pediatrics</option>
                    <option value="Gastroenterology" className="bg-white text-slate-800">Gastroenterology</option>
                    <option value="Anesthesiology" className="bg-white text-slate-800">Anesthesiology</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#1B5F85] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Popular Specialization Quick Chips */}
              <div className="space-y-2 pt-0.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">POPULAR SPECIALIZATIONS</label>
                <div className="flex flex-wrap gap-2">
                  {['Cardiology', 'ICU', 'Pediatrics', 'Pharmacist'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSpecialtyFilter(specialtyFilter === tag ? 'All' : tag)}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-2xl border transition-all duration-150 cursor-pointer ${specialtyFilter === tag
                        ? 'bg-[#20B2AA] text-white border-[#20B2AA] shadow-xs font-bold'
                        : 'bg-[#F1F5FD] text-[#334E68] border-[#DCE4EC] hover:bg-[#EAF8F7] hover:border-[#20B2AA]/60 hover:text-[#0F394C]'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F394C] block">Location</label>
                <div className="relative rounded-2xl border border-[#20B2AA]/50 bg-[#EAF8F7] hover:border-[#20B2AA] focus-within:border-[#20B2AA] focus-within:ring-2 focus-within:ring-[#20B2AA]/20 transition-all duration-150 shadow-2xs">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full bg-transparent pl-4 pr-10 py-3 text-sm text-[#0F394C] font-semibold focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="All" className="bg-white text-slate-800">All Cities</option>
                    <option value="Hyderabad" className="bg-white text-slate-800">Hyderabad</option>
                    <option value="Secunderabad" className="bg-white text-slate-800">Secunderabad</option>
                    <option value="Gachibowli" className="bg-white text-slate-800">Gachibowli</option>
                    <option value="Banjara Hills" className="bg-white text-slate-800">Banjara Hills</option>
                    <option value="Bangalore" className="bg-white text-slate-800">Bangalore</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#1B5F85] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Experience Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F394C] block">Experience</label>
                <div className="relative rounded-2xl border border-[#20B2AA]/50 bg-[#EAF8F7] hover:border-[#20B2AA] focus-within:border-[#20B2AA] focus-within:ring-2 focus-within:ring-[#20B2AA]/20 transition-all duration-150 shadow-2xs">
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full bg-transparent pl-4 pr-10 py-3 text-sm text-[#0F394C] font-semibold focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="All" className="bg-white text-slate-800">Any Experience</option>
                    <option value="0-2" className="bg-white text-slate-800">0 - 2 Years (Entry / Fellow)</option>
                    <option value="3-5" className="bg-white text-slate-800">3 - 5 Years (Mid-Level)</option>
                    <option value="5+" className="bg-white text-slate-800">5+ Years (Consultant / Senior)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#1B5F85] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Hospital Type Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F394C] block">Hospital Type</label>
                <div className="relative rounded-2xl border border-[#20B2AA]/50 bg-[#EAF8F7] hover:border-[#20B2AA] focus-within:border-[#20B2AA] focus-within:ring-2 focus-within:ring-[#20B2AA]/20 transition-all duration-150 shadow-2xs">
                  <select
                    value={hospitalTypeFilter}
                    onChange={(e) => setHospitalTypeFilter(e.target.value)}
                    className="w-full bg-transparent pl-4 pr-10 py-3 text-sm text-[#0F394C] font-semibold focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="All" className="bg-white text-slate-800">All Organization Types</option>
                    <option value="Corporate Hospital" className="bg-white text-slate-800">Corporate Super-Specialty</option>
                    <option value="Multi-Specialty Clinic" className="bg-white text-slate-800">Multi-Specialty Clinic</option>
                    <option value="Diagnostic Center" className="bg-white text-slate-800">Diagnostic & Research Center</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#1B5F85] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </aside>

            {/* Right Main Column: Matching Job Listings */}
            <main className="lg:col-span-8 space-y-4">

              {/* Section Header: Title & Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#0F394C] leading-snug">
                    Verified Healthcare Openings
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing <strong className="text-slate-800">{displayedJobs.length}</strong> of {filteredJobs.length} live verified roles
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-bold text-slate-500">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'match' | 'all')}
                      className="bg-white border border-slate-200/90 rounded-xl pl-3 pr-8 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer appearance-none shadow-2xs hover:border-[#20B2AA]"
                    >
                      <option value="match">AI Match Score</option>
                      <option value="all">Latest Posted</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {displayedJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                  <p className="text-sm font-bold text-slate-700">No jobs match your selected filters.</p>
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-[#20B2AA] hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <>
                  {displayedJobs.map((job, idx) => (
                    <div
                      key={job._id}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500 p-4 sm:p-6 shadow-[0_4px_20px_rgba(15,57,76,0.03)] hover:shadow-[0_8px_30px_rgba(32,178,170,0.08)] transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 group"
                    >
                      {/* Left Job Info */}
                      <div className="space-y-1.5 flex-1 w-full">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            to={`/jobs/${job.slug || job._id}`}
                            className="text-base sm:text-lg font-black text-[#0F394C] group-hover:text-[#20B2AA] transition-colors"
                          >
                            {job.title}
                          </Link>
                          {job.organization?.verificationStatus === 'VERIFIED' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/50">
                              <CheckCircle2 className="w-3 h-3 text-[#20B2AA]" /> Verified
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{job.organization?.name}</span>
                        </p>

                        {/* Responsive Metadata with Clean Salary Row (No Trailing Dot) */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs text-slate-500 pt-0.5 font-medium">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span>{job.location}</span>
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600">
                              {job.jobType}
                            </span>
                          </div>
                          <span className="hidden sm:inline text-slate-300">•</span>
                          <div className="font-extrabold text-[#0F766E] text-xs sm:text-sm">
                            {formatSalary(job.salaryMin, job.salaryMax)}
                          </div>
                        </div>
                      </div>

                      {/* Right AI Match Pill & Action Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#E0F7F5] to-[#D1F6F2] text-[#0F766E] px-3.5 py-1 rounded-full text-xs font-extrabold border border-[#20B2AA]/30 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#20B2AA]" />
                          <span>{idx === 0 ? '94%' : idx === 1 ? '96%' : '94%'} Match</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/jobs/${job.slug || job._id}`}
                            className="bg-[#20B2AA] hover:bg-[#179A93] active:scale-95 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-xs hover:shadow-md transition cursor-pointer"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Clean Expand / Explore Footer */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                    {filteredJobs.length > 3 && (
                      <button
                        onClick={() => setShowAllJobs(!showAllJobs)}
                        className="w-full sm:w-auto text-xs font-bold text-[#0F394C] bg-white hover:bg-slate-50 border border-slate-200/90 px-5 py-2.5 rounded-xl shadow-2xs hover:border-slate-300 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <span>{showAllJobs ? 'Show Slide View (3 Roles)' : `Show All ${filteredJobs.length} Verified Roles`}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-teal-600 transition-transform duration-200 ${showAllJobs ? 'rotate-180' : ''}`} />
                      </button>
                    )}

                    <Link
                      to="/jobs"
                      className="w-full sm:w-auto text-xs font-bold text-[#20B2AA] hover:text-[#179A93] hover:underline flex items-center justify-center sm:justify-end gap-1.5 sm:ml-auto py-1"
                    >
                      <span>Explore all 120+ Healthcare Jobs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </>
              )}

            </main>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SLIDE 4: HOW MEDDHATRI WORKS
          ========================================================================= */}
      <section id="how-it-works-section" className="pt-6 pb-10 sm:py-16 bg-white border-t border-slate-200/80">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-14">

          {/* Part A: HOW MEDDHATRI WORKS */}
          <div className="text-center space-y-6 sm:space-y-10 max-w-5xl mx-auto">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#0F766E] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border border-teal-200/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#20B2AA]" />
                <span>Simple 3-Step Process</span>
              </div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F394C] tracking-tight uppercase">
                HOW MEDDHATRI WORKS
              </h2>
              <p className="text-xs sm:text-base text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
                Seamlessly connect with verified hospitals and fast-track your clinical placement in three simple steps.
              </p>
            </div>

            <div className="relative">
              {/* Subtle Horizontal Connecting Flow Line for Desktop */}
              <div className="hidden md:block absolute top-14 left-20 right-20 h-0.5 bg-gradient-to-r from-teal-200 via-[#20B2AA] to-teal-200 -z-0 opacity-40" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">

                {/* Step 01 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,57,76,0.04)] hover:shadow-[0_12px_30px_rgba(32,178,170,0.12)] transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 shadow-sm text-[#0F766E] flex items-center justify-center group-hover:scale-110 group-hover:border-[#20B2AA] group-hover:bg-[#20B2AA] group-hover:text-white transition-all duration-300">
                      <User className="w-8 h-8 transition-colors" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-[#0F394C] text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                      1
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-[#0F394C] group-hover:text-[#20B2AA] transition-colors">
                      Create Profile
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      Build your verified clinician profile with qualifications, medical license, and clinical specialties.
                    </p>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,57,76,0.04)] hover:shadow-[0_12px_30px_rgba(32,178,170,0.12)] transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 shadow-sm text-[#0F766E] flex items-center justify-center group-hover:scale-110 group-hover:border-[#20B2AA] group-hover:bg-[#20B2AA] group-hover:text-white transition-all duration-300">
                      <Brain className="w-8 h-8 transition-colors" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-[#0F394C] text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                      2
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-[#0F394C] group-hover:text-[#20B2AA] transition-colors">
                      Smart AI Matching
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      Our precision healthcare algorithms match your credentials to top verified hospital vacancies.
                    </p>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,57,76,0.04)] hover:shadow-[0_12px_30px_rgba(32,178,170,0.12)] transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 shadow-sm text-[#0F766E] flex items-center justify-center group-hover:scale-110 group-hover:border-[#20B2AA] group-hover:bg-[#20B2AA] group-hover:text-white transition-all duration-300">
                      <FileCheck2 className="w-8 h-8 transition-colors" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-[#0F394C] text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                      3
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-[#0F394C] group-hover:text-[#20B2AA] transition-colors">
                      Apply Instantly
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                      Submit 1-click applications directly to medical directors and track your interview status live.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =========================================================================
              TESTIMONIALS & CLINICAL SOCIAL PROOF SECTION
              ========================================================================= */}
          <div className="pt-6 border-t border-slate-100 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-extrabold text-[#20B2AA] uppercase tracking-wider">Clinician & Hospital Trust</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F394C]">
                Why Healthcare Leaders Choose MedDhatri
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Testimonial 1 */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 space-y-4 hover:border-teal-400 hover:bg-white transition-all duration-200 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "MedDhatri cut down my credential verification from 3 weeks to 24 hours. The match accuracy to super-specialty cardiology departments is outstanding."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                    DR
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Dr. Ananya Rao</h4>
                    <p className="text-[11px] text-slate-500">Senior Interventional Cardiologist • Apollo</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 space-y-4 hover:border-teal-400 hover:bg-white transition-all duration-200 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "Hiring verified ICU intensivists and critical care nurses used to take 45 days. With MedDhatri's verified network, we onboard top talent in under 7 days."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                    RV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Dr. Rajesh Varma</h4>
                    <p className="text-[11px] text-slate-500">Chief Medical Officer • Medicover Group</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 space-y-4 hover:border-teal-400 hover:bg-white transition-all duration-200 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "Direct connection with medical directors without third-party commission agents made my career move transparent and stress-free."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                    PN
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Sister Priya Nair</h4>
                    <p className="text-[11px] text-slate-500">Critical Care Nursing Incharge • KIMS</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Part B: BUILD YOUR HEALTHCARE TEAM FASTER (Dark Teal Banner) */}
          <div className="relative bg-gradient-to-r from-[#0C3B49] via-[#0F4C5E] to-[#0D3F4E] text-white rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl overflow-hidden border border-teal-500/20">
            {/* Ambient Radial Highlights */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#20B2AA]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/10 rounded-full blur-2xl pointer-events-none" />

            {/* 4-pointed Sparkle Stars decorative background */}
            <div className="absolute top-6 right-8 sm:top-8 sm:right-16 text-teal-300/25 pointer-events-none animate-pulse">
              <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left CTA Text & Button */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight leading-tight uppercase max-w-lg">
                  BUILD YOUR HEALTHCARE TEAM FASTER
                </h2>

                <div>
                  <Link
                    to="/organization/jobs/create"
                    className="inline-flex items-center justify-center gap-2 bg-[#20B2AA] hover:bg-[#179A93] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-teal-500/25 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Post a Job</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Right Checklist */}
              <div className="lg:col-span-5 space-y-3.5">
                {[
                  'Access 50,000+ verified clinicians',
                  'Reduce time-to-hire by 65%',
                  'Automated MCI/NMC credential verification',
                  'Zero placement commissions'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#20B2AA] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-slate-100">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Floating Speed-Dial Buttons (Desktop only - prevents mobile screen clutter) */}
      <div className="hidden sm:flex fixed bottom-6 right-24 z-30 flex-col items-end gap-2.5">
        <button
          type="button"
          onClick={scrollToTop}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800/90 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          title="Back to top"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          title="WhatsApp Support"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>

    </div>
  );
};
