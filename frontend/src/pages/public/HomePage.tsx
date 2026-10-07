import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Building2,
  Users,
  Award,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  GraduationCap,
  Microscope,
  Activity,
  Calendar,
  Lock,
  PhoneCall,
  Laptop,
  Pill,
  Brain,
  Smile,
  Truck,
  FileCheck2,
  ChevronDown,
  HelpCircle,
  Radio,
  UserCheck,
  Building,
  CreditCard,
  MessageCircle,
  Download,
  ChevronUp
} from 'lucide-react';
import { INITIAL_MOCK_JOBS } from '../../lib/mockDb.js';
import { JobCard } from '../../components/common/JobCard.js';
import { HealthcareSalaryCalculator } from '../../components/common/HealthcareSalaryCalculator.js';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orgQuery, setOrgQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'profession' | 'role' | 'location'>('role');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (orgQuery) params.append('search', orgQuery);
    if (locationQuery) params.append('location', locationQuery);
    navigate(`/jobs?${params.toString()}`);
  };

  const partnerHospitals = [
    { name: 'Apollo 24/7 & Hospitals', city: 'Pan India' },
    { name: 'KIMS Hospitals', city: 'Hyderabad & Bangalore' },
    { name: 'Aster DM Healthcare', city: 'Kochi & Bangalore' },
    { name: 'Medicover Hospitals', city: 'Hyderabad & Vizag' },
    { name: 'Omega Cancer Hospitals', city: 'Hyderabad' },
    { name: 'Ankura Hospitals', city: 'Telangana & AP' },
    { name: 'Prathima Hospitals', city: 'Hyderabad' },
    { name: 'Renova Hospitals', city: 'Hyderabad & Jaipur' },
    { name: 'Basavatarakam Cancer Hospital', city: 'Hyderabad' },
    { name: 'NovaCare Health', city: 'Bangalore' },
    { name: 'Medisphere Hospitals', city: 'Bangalore' },
    { name: 'Vitalis Diagnostics', city: 'Mumbai' },
    { name: 'CareBridge Medical', city: 'Chennai' },
    { name: 'Aurelia Health AI', city: 'Pune' },
    { name: 'MedPlus Healthcare', city: 'Pan India' },
    { name: 'CallHealth Services', city: 'Hyderabad' },
  ];

  // Explore Healthcare Jobs Tabbed Data (Exactly matching Nextenti.ai)
  const directoryData = {
    role: [
      { title: 'General Physician Jobs', icon: Stethoscope, query: 'General Physician' },
      { title: 'Staff Nurse Jobs', icon: HeartPulse, query: 'Staff Nurse' },
      { title: 'Radiologist Jobs', icon: Microscope, query: 'Radiologist' },
      { title: 'Receptionist Jobs', icon: Users, query: 'Receptionist' },
      { title: 'Pharmacy Assistant Jobs', icon: Pill, query: 'Pharmacy Assistant' },
      { title: 'OT Technician Jobs', icon: Building2, query: 'OT Technician' },
      { title: 'Physiotherapist Jobs', icon: Activity, query: 'Physiotherapist' },
      { title: 'Duty Medical Officer Jobs', icon: Stethoscope, query: 'Duty Medical Officer' },
      { title: 'ICU Nurse Jobs', icon: HeartPulse, query: 'ICU Nurse' },
      { title: 'Technician - CT & MRI Jobs', icon: Microscope, query: 'CT MRI Technician' },
      { title: 'Finance Manager Jobs', icon: CreditCard, query: 'Finance Manager' },
      { title: 'HR Manager Jobs', icon: UserCheck, query: 'HR Manager' },
    ],
    profession: [
      { title: 'Doctor / Specialist Jobs', icon: Stethoscope, query: 'Doctor' },
      { title: 'Nursing & Critical Care Jobs', icon: HeartPulse, query: 'Nurse' },
      { title: 'Pharmacist & Pharmacy Jobs', icon: Pill, query: 'Pharmacist' },
      { title: 'Diagnostic & Lab Tech Jobs', icon: Microscope, query: 'Lab Technologist' },
      { title: 'Physiotherapy & Rehab Jobs', icon: Activity, query: 'Physiotherapy' },
      { title: 'Radiology & Imaging Jobs', icon: Microscope, query: 'Radiology' },
      { title: 'Healthcare IT & Informatics', icon: Laptop, query: 'Healthcare IT' },
      { title: 'Hospital Admin & Ops Jobs', icon: Building2, query: 'Healthcare Administrator' },
      { title: 'Biomedical Engineering Jobs', icon: Sparkles, query: 'Biomedical' },
      { title: 'Clinical Research Jobs', icon: Activity, query: 'Clinical Research' },
      { title: 'Dentist & Dental Sciences', icon: Smile, query: 'Dentist' },
      { title: 'Mental Health & Psychology', icon: Brain, query: 'Psychiatrist' },
    ],
    location: [
      { title: 'Healthcare Jobs in Hyderabad', icon: MapPin, query: 'Hyderabad' },
      { title: 'Healthcare Jobs in Bangalore', icon: MapPin, query: 'Bangalore' },
      { title: 'Healthcare Jobs in Mumbai', icon: MapPin, query: 'Mumbai' },
      { title: 'Healthcare Jobs in Chennai', icon: MapPin, query: 'Chennai' },
      { title: 'Healthcare Jobs in Delhi NCR', icon: MapPin, query: 'Delhi' },
      { title: 'Healthcare Jobs in Pune', icon: MapPin, query: 'Pune' },
      { title: 'Healthcare Jobs in Kolkata', icon: MapPin, query: 'Kolkata' },
      { title: 'Healthcare Jobs in Ahmedabad', icon: MapPin, query: 'Ahmedabad' },
      { title: 'Healthcare Jobs in Kochi', icon: MapPin, query: 'Kochi' },
      { title: 'Healthcare Jobs in Jaipur', icon: MapPin, query: 'Jaipur' },
      { title: 'Healthcare Jobs in Vizag', icon: MapPin, query: 'Visakhapatnam' },
      { title: 'Healthcare Jobs in Coimbatore', icon: MapPin, query: 'Coimbatore' },
    ]
  };

  const sectors = [
    { name: 'Quaternary & Tertiary Hospitals', count: '1,450+ Roles', icon: Building2, tag: 'Hospitals' },
    { name: 'Critical Care & Nursing Units', count: '890+ Roles', icon: HeartPulse, tag: 'Nursing' },
    { name: 'Diagnostic & Genomics Labs', count: '410+ Roles', icon: Microscope, tag: 'Diagnostics' },
    { name: 'Clinical Pharmacy & Pharma', count: '340+ Roles', icon: Pill, tag: 'Pharma' },
    { name: 'Healthcare IT & AI Informatics', count: '280+ Roles', icon: Laptop, tag: 'Healthcare IT' },
    { name: 'Telehealth & Digital Suites', count: '220+ Roles', icon: PhoneCall, tag: 'Telehealth' },
    { name: 'Biotech & Clinical Trials R&D', count: '190+ Roles', icon: Activity, tag: 'Biotech' },
    { name: 'Mental Health & Psychiatry', count: '160+ Roles', icon: Brain, tag: 'Mental Health' },
    { name: 'Dental Sciences & Clinics', count: '140+ Roles', icon: Smile, tag: 'Dental' },
    { name: 'Home Healthcare Services', count: '320+ Roles', icon: Truck, tag: 'Home Care' },
    { name: 'Hospital Operations & Admin', count: '210+ Roles', icon: FileCheck2, tag: 'Admin' },
    { name: 'Medical Devices & Equipment', count: '175+ Roles', icon: Sparkles, tag: 'MedTech' },
  ];

  const popularChips = [
    { label: 'Cardiology', query: 'Cardiology' },
    { label: 'ICU & Critical Care', query: 'ICU' },
    { label: 'Staff Nurses', query: 'Nurse' },
    { label: 'Radiology & Imaging', query: 'Radiology' },
    { label: 'Clinical Pharmacist', query: 'Pharmacist' },
    { label: 'Locum Shifts', query: 'Locum' },
    { label: 'Pediatrics', query: 'Pediatrics' },
    { label: 'Healthcare IT', query: 'Healthcare IT' },
  ];

  const faqs = [
    {
      q: 'How does MedDhatri AI verify clinical and medical credentials?',
      a: 'We cross-reference registration details with State Medical Councils (NMC/SMC), State Nursing Councils, and Pharmacy Councils to ensure 100% verified authentic healthcare practitioners.'
    },
    {
      q: 'Can hospitals recruit for locum, shift-based, and permanent full-time roles?',
      a: 'Yes. MedDhatri AI supports multi-tier staffing including on-demand locum duty doctors, ICU night shifts, clinical rotations, and permanent senior consultants.'
    },
    {
      q: 'How does the 7-Factor AI Match score work?',
      a: 'Our proprietary algorithm analyzes specialty alignment, clinical experience, procedural logbook volume, shift preferences, accreditation familiarity (NABH/JCI), and salary expectations.'
    },
    {
      q: 'Is candidate data protected under medical privacy standards?',
      a: 'Absolutely. Personal contact details and uploaded credential documents are encrypted and only accessible to accredited healthcare organizations when candidates apply.'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 relative w-full max-w-[100vw] overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div className="bg-[#1B5F85] text-white py-1.5 px-3 sm:px-6 lg:px-10 xl:px-12 text-[11px] sm:text-xs shadow-xs w-full overflow-hidden">
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
            <span className="bg-[#2DC4B4] text-[#1B5F85] font-black px-2 py-0.5 rounded text-xs uppercase tracking-wider">Hiring</span>
            <span className="text-slate-100 font-medium">Looking for verified doctors, nurses, or hospital talent?</span>
            <Link to="/organization/jobs/create" className="text-teal-200 font-bold hover:underline whitespace-nowrap ml-0.5">
              Post a Job Now &rarr;
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3 text-slate-200 text-[10.5px]">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-teal-300" /> 100% Council Verified</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-teal-300" /> AI Match Engine</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-1 sm:pt-2 pb-2 sm:pb-3 overflow-hidden w-full max-w-[100vw]">
        {/* Background Organic Curved Waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <svg className="absolute right-[-5%] top-[-10%] h-[120%] w-[60%] max-w-[900px] text-[#E0F7F5]/80 transition-all" viewBox="0 0 800 600" fill="currentColor" preserveAspectRatio="none">
            <path d="M200,0 C420,60 580,180 640,320 C720,480 600,560 800,600 L800,0 Z" />
          </svg>
          <svg className="absolute left-[-2%] bottom-[-5%] h-[70%] w-[35%] max-w-[450px] text-[#EBF9F7]/90 transition-all" viewBox="0 0 400 400" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,120 C110,100 190,220 230,400 L0,400 Z" />
          </svg>
          <div className="absolute top-[8%] right-[12%] w-[450px] h-[450px] bg-[#2DC4B4]/12 rounded-full blur-3xl" />
          <div className="absolute bottom-[5%] left-[8%] w-[340px] h-[340px] bg-[#E0F7F5] rounded-full blur-2xl" />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-3.5 text-center lg:text-left w-full min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7F5] border border-[#2DC4B4]/30 text-[#1B5F85] text-[10.5px] sm:text-[11px] font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2DC4B4]" />
                <span>Next-Gen Healthcare Career & Talent Platform</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] font-extrabold text-[#1B5F85] tracking-tight leading-[1.18] break-words">
                Find Where Your Healthcare Career <span className="text-[#2DC4B4]">Belongs.</span>
              </h1>

              <p className="text-xs sm:text-[13px] md:text-sm text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Empowering doctors, nurses, pharmacists, and hospital networks with intelligent AI matching, verified medical council credentials, and flexible career models.
              </p>

              {/* 3-Field Unified Search Bar */}
              <form
                onSubmit={handleSearch}
                className="bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-md border border-slate-200/90 flex flex-col md:flex-row gap-1 w-full max-w-2xl mx-auto lg:mx-0 mt-1"
              >
                <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 border-b md:border-b-0 md:border-r border-slate-200 min-w-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Role / specialty (e.g. Cardiologist)"
                    className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 border-b md:border-b-0 md:border-r border-slate-200 min-w-0">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={orgQuery}
                    onChange={(e) => setOrgQuery(e.target.value)}
                    placeholder="Hospital / Network"
                    className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="City (e.g. Hyderabad)"
                    className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Search className="w-3.5 h-3.5 text-[#2DC4B4]" />
                  Find Jobs
                </button>
              </form>

              {/* Flexible Career Mode Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-1.5 pt-0.5 text-xs w-full">
                <span className="font-semibold text-slate-600 text-[10px] sm:text-[10.5px] mr-0.5">Career Modes:</span>
                {[
                  { label: 'Full-Time Roles', mode: 'Full-time' },
                  { label: 'Locum & Temporary', mode: 'Locum' },
                  { label: 'Shift-Based ICU', mode: 'Shift-based' },
                  { label: 'Remote / Telemedicine', mode: 'Remote' }
                ].map((wm, idx) => (
                  <Link
                    key={idx}
                    to={`/jobs?workMode=${encodeURIComponent(wm.mode)}`}
                    className="px-2 sm:px-2.5 py-0.5 rounded-md bg-[#E0F7F5]/70 hover:bg-[#E0F7F5] hover:text-[#1B5F85] text-slate-700 font-semibold transition text-[10px] sm:text-[10.5px] border border-[#2DC4B4]/20"
                  >
                    {wm.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Visual with Floating Micro-Animations */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[340px] sm:max-w-[460px] xl:max-w-[500px] group mx-auto">
                
                {/* Floating Top-Left Verification Badge */}
                <div className="absolute top-2 left-2 sm:-top-4 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl border border-teal-100/90 flex items-center gap-1.5 sm:gap-2 animate-float max-w-[88%] sm:max-w-none">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#E0F7F5] text-[#1B5F85] flex items-center justify-center shrink-0 border border-[#2DC4B4]/30">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2DC4B4]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9.5px] sm:text-[11px] font-black text-slate-900 leading-tight truncate">Medical Council Verified</span>
                    <span className="block text-[8.5px] sm:text-[10px] text-teal-700 font-bold leading-tight truncate">State Board Validated</span>
                  </div>
                </div>

                {/* Main Doctor Portrait */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl drop-shadow-2xl transition duration-500 group-hover:shadow-3xl">
                  <img
                    src="/hero-doctor.png"
                    alt="Medical Council Verified Healthcare Specialist"
                    className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Floating Bottom-Right 94% AI Match Badge */}
                <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 z-20 bg-[#0F394C]/95 backdrop-blur-md text-white px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-2xl border border-teal-400/30 flex items-center gap-1.5 sm:gap-2.5 animate-float-delayed max-w-[88%] sm:max-w-none">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#2DC4B4]/20 text-[#2DC4B4] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2DC4B4]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] sm:text-[13px] font-black text-white leading-tight truncate">94% AI Match</span>
                    <span className="block text-[8.5px] sm:text-[10px] text-teal-200 font-semibold leading-tight truncate">Cardiology & Internal Med</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TRUSTED HEALTHCARE NETWORKS LOGO / PARTNERS STRIP */}
      <section className="bg-white/90 border-y border-slate-200/80 py-3.5 sm:py-4.5 overflow-hidden w-full max-w-[100vw]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center space-y-2.5">
          <span className="text-xs sm:text-sm font-extrabold text-[#1B5F85] uppercase tracking-wider block">
            Trusted by Premier Accredited Healthcare Networks
          </span>

          {/* Clean Single-Line Partner Network Showcase */}
          <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-10 pt-1 overflow-x-auto no-scrollbar">
            {[
              { name: 'Medicover Hospitals', location: 'Hyderabad & Vizag' },
              { name: 'Omega Cancer Hospitals', location: 'Hyderabad' },
              { name: 'Ankura Hospitals', location: 'Telangana & AP' },
              { name: 'Prathima Hospitals', location: 'Hyderabad' },
              { name: 'Apollo Hospitals', location: 'Pan India' },
            ].map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 sm:gap-2.5 py-1 px-1.5 sm:px-2 text-slate-800 shrink-0"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E0F7F5] flex items-center justify-center shrink-0 border border-[#2DC4B4]/30 text-[#1B5F85]">
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2DC4B4]" />
                </div>
                <div className="text-left whitespace-nowrap">
                  <span className="font-extrabold text-xs sm:text-sm text-[#1B5F85] block leading-tight">{h.name}</span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium block">({h.location})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS KPI BAR */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-subtle border border-slate-200/90 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="min-w-0">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B5F85]">4,500+</span>
            <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block truncate">Verified Clinicians</span>
          </div>
          <div className="min-w-0">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-[#2DC4B4]">320+</span>
            <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block truncate">Accredited Hospitals</span>
          </div>
          <div className="min-w-0">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B5F85]">94.8%</span>
            <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block truncate">AI Match Accuracy</span>
          </div>
          <div className="min-w-0">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-[#2DC4B4]">12 Days</span>
            <span className="text-xs sm:text-sm font-bold text-slate-600 mt-1 block truncate">Avg Clinical Hire</span>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE HEALTHCARE JOBS DIRECTORY */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12 pt-2">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-bold text-[#1B5F85] uppercase tracking-widest block mb-1">
            Browse Opportunities
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B5F85] tracking-tight">
            Explore Healthcare Jobs
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium max-w-xl mx-auto">
            Pick a profession, role or location to find the healthcare jobs that fit you best.
          </p>
        </div>

        {/* Tab Switcher: Profession | Role | Location */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 border-b border-slate-200 max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('profession')}
            className={`pb-2.5 text-sm sm:text-base font-extrabold transition relative cursor-pointer ${
              activeTab === 'profession'
                ? 'text-[#1B5F85] border-b-2 border-[#1B5F85]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Profession
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('role')}
            className={`pb-2.5 text-sm sm:text-base font-extrabold transition relative cursor-pointer ${
              activeTab === 'role'
                ? 'text-[#1B5F85] border-b-2 border-[#1B5F85]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Role
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`pb-2.5 text-sm sm:text-base font-extrabold transition relative cursor-pointer ${
              activeTab === 'location'
                ? 'text-[#1B5F85] border-b-2 border-[#1B5F85]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Location
          </button>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {directoryData[activeTab].map((item, idx) => {
            const Icon = item.icon;
            const isHiddenOnMobile = !showAllRoles && idx >= 6;
            return (
              <Link
                key={idx}
                to={`/jobs?search=${encodeURIComponent(item.query)}`}
                className={`${
                  isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } bg-[#F0FDFB] hover:bg-[#E0F7F5] text-[#1B5F85] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-teal-200/70 hover:border-[#2DC4B4] transition duration-200 items-center justify-between group shadow-xs cursor-pointer min-w-0`}
              >
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white text-[#1B5F85] flex items-center justify-center shrink-0 shadow-xs border border-teal-100">
                    <Icon className="w-4 h-4 text-[#1B5F85]" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-[#1B5F85] group-hover:text-[#154E70] truncate">
                    {item.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1B5F85] group-hover:translate-x-0.5 transition shrink-0 ml-1" />
              </Link>
            );
          })}
        </div>

        {/* Buttons: Show more on mobile & Search All Openings */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5 sm:mt-7">
          {!showAllRoles && (
            <button
              type="button"
              onClick={() => setShowAllRoles(true)}
              className="sm:hidden text-xs font-bold text-[#1B5F85] bg-[#E0F7F5] border border-[#2DC4B4]/40 px-4 py-2.5 rounded-full hover:bg-teal-100 transition shadow-2xs"
            >
              + Show 6 More Categories
            </button>
          )}
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 bg-[#1B5F85] hover:bg-[#154E70] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#2DC4B4]" />
            <span>Search All Openings</span>
          </Link>
        </div>
      </section>

      {/* 6. COMPREHENSIVE COVERAGE: HIRING ACROSS KEY HEALTHCARE SECTORS */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8">
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
          <span className="text-xs sm:text-sm font-bold text-[#2DC4B4] uppercase tracking-widest block mb-1">
            Comprehensive Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1B5F85]">
            Hiring Across Key Healthcare Sectors
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Connecting professionals with tertiary hospitals, diagnostic chains, telehealth suites, and home health providers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            const isHiddenOnMobile = idx >= 6;
            return (
              <Link
                key={idx}
                to={`/jobs?search=${encodeURIComponent(sec.tag)}`}
                className={`${
                  isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                } group bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle hover:border-[#2DC4B4] hover:shadow-md hover:-translate-y-0.5 transition-all text-center flex-col items-center justify-center cursor-pointer space-y-2 min-w-0`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E0F7F5] text-[#1B5F85] group-hover:bg-[#1B5F85] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-full min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1B5F85] transition-colors leading-tight line-clamp-2">
                    {sec.name}
                  </h4>
                  <span className="text-xs text-[#0D9488] font-bold block mt-1 truncate">{sec.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7. DUAL PERSONA VALUE CARDS (Solid colors, no gradients) */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* For Job Seekers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F7F5] text-[#1B5F85] text-xs font-bold border border-[#2DC4B4]/30">
                <Users className="w-4 h-4 text-[#1B5F85]" />
                <span>For Healthcare Professionals</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1B5F85]">Advance Your Clinical Practice</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Unlock opportunities with leading hospital networks, get matched by your exact specialty, and choose between full-time, locum, or night ICU shifts.
              </p>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>1-Click Medical Council credential verification</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Transparent salary benchmarks & shift compensation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Direct contact with Chief Medical Officers & Department Heads</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 bg-[#1B5F85] hover:bg-[#154E70] text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-sm transition w-full sm:w-auto cursor-pointer"
              >
                Browse Open Clinical Roles <ArrowRight className="w-4 h-4 text-[#2DC4B4]" />
              </Link>
            </div>
          </div>

          {/* For Employers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F7F5] text-[#1B5F85] text-xs font-bold border border-[#2DC4B4]/30">
                <Building2 className="w-4 h-4 text-[#1B5F85]" />
                <span>For Hospitals & Healthcare Employers</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1B5F85]">Hire Verified Medical Talent Faster</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Eliminate unverified resumes. Source board-certified specialists, ICU-trained nurses, and clinical pharmacists with AI-scored credential matching.
              </p>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Pre-screened candidates with 7-factor AI matching</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Built-in ATS with clinical interview scheduling</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Fast turnaround: average clinical hire in under 12 days</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="/organization/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1B5F85] hover:bg-[#154E70] text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-sm transition w-full sm:w-auto cursor-pointer"
              >
                Launch Employer Portal ↗ <ArrowRight className="w-4 h-4 text-[#2DC4B4]" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 8. INTERACTIVE SALARY CALCULATOR */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12">
        <HealthcareSalaryCalculator />
      </section>

      {/* 9. FEATURED CLINICAL OPENINGS */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-2">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#2DC4B4] uppercase tracking-wider block">Curated Openings</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1B5F85]">Featured Healthcare Jobs</h2>
            <p className="text-sm text-slate-600 mt-0.5 font-normal">
              High-priority positions from accredited medical centers with full salary transparency.
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs sm:text-sm font-bold text-[#1B5F85] hover:text-[#154E70] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E0F7F5] border border-[#2DC4B4]/30 self-start sm:self-auto transition cursor-pointer"
          >
            View All Openings <ArrowRight className="w-4 h-4 text-[#2DC4B4]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {INITIAL_MOCK_JOBS.slice(0, 3).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      {/* 10. HOW IT WORKS */}
      <section className="bg-white py-8 sm:py-12 border-y border-slate-200/80 w-full max-w-[100vw]">
        <div className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm font-bold text-[#2DC4B4] uppercase tracking-wider block mb-1">Simple & Transparent</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1B5F85]">How MedDhatri AI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-xl bg-[#1B5F85] text-white flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Verify Clinical Credentials</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Upload your Medical Council registration or Nursing Board details. We authenticate your license to grant verified clinician status.
              </p>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-xl bg-[#1B5F85] text-white flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">7-Factor AI Match Scoring</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our algorithm matches you with hospitals based on procedural expertise, shift preferences, accreditation standards, and compensation.
              </p>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/80 relative">
              <div className="w-10 h-10 rounded-xl bg-[#1B5F85] text-white flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">Direct Hospital Connection</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Connect directly with Medical Directors and HR leadership for clinical interviews and expedited offer rollouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12 pt-4">
        <div className="text-center mb-5 sm:mb-7">
          <span className="text-xs sm:text-sm font-bold text-[#2DC4B4] uppercase tracking-wider block mb-1">Answers & Guidance</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1B5F85]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3 max-w-5xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 font-bold text-sm text-[#1B5F85] hover:text-[#154E70] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <HelpCircle className="w-4 h-4 text-[#2DC4B4] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#2DC4B4]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B5F85] hover:text-[#154E70] bg-[#E0F7F5] px-5 py-2.5 rounded-xl border border-[#2DC4B4]/30 hover:bg-[#cbf1ed] transition shadow-xs cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#2DC4B4]" /> View All FAQs Knowledge Base &rarr;
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
          >
            Contact Support Desk &rarr;
          </Link>
        </div>
      </section>

      {/* 12. BOTTOM CTA BANNER (Solid Brand Navy, No Gradient) */}
      <section className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-12 pt-4">
        <div className="bg-[#1B5F85] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Ready to Advance Your Healthcare Practice?
            </h2>
            <p className="text-sm sm:text-base text-teal-100 leading-relaxed font-normal">
              Join thousands of verified doctors, nurses, and allied professionals discovering their next career milestone on MedDhatri AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <Link
                to="/register"
                className="bg-white hover:bg-slate-100 text-[#1B5F85] font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
              >
                Create Professional Account
              </Link>
              <a
                href="/organization/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2DC4B4] hover:bg-[#25ab9d] text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
              >
                Open Employer Portal ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FLOATING SPEED-DIAL ACTION BUTTONS */}
      <div className="fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-30 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={scrollToTop}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800/90 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-0.5"
          title="Back to top"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition transform hover:-translate-y-0.5"
          title="WhatsApp Support"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>

    </div>
  );
};
