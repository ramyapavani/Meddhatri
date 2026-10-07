import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, UploadCloud, FileText, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.js';

export const VerificationPage: React.FC = () => {
  const { user } = useAuth();
  const [uploaded, setUploaded] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#1B5F85] tracking-tight">Medical Credential Verification</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Validation of Medical Council registration, specialist degrees, and government identity for clinical trust
        </p>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-[#E0F7F5]/50 border border-[#2DC4B4]/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start gap-3.5 sm:gap-4">
        <div className="p-2.5 sm:p-3 bg-[#1B5F85] text-[#2DC4B4] rounded-xl sm:rounded-2xl shrink-0 shadow-xs">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-extrabold text-xs sm:text-sm text-[#1B5F85]">Status: Verified Healthcare Practitioner</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#2DC4B4] text-[#1B5F85] text-xs font-black uppercase tracking-wide">
              Approved
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Your Medical Council registration credential (REG-492104) has been successfully validated against state medical records. Your profile displays the verified badge to all partner hospitals.
          </p>
        </div>
      </div>

      {/* Document Vault */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-subtle space-y-4 sm:space-y-6">
        <h3 className="font-bold text-sm sm:text-base text-[#1B5F85] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#2DC4B4]" />
          Encrypted Credential Documents
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B5F85] shrink-0" />
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-900 truncate">State Council Certificate</h4>
                <p className="text-xs text-slate-500">PDF • Verified 12 Jan 2026</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B5F85] shrink-0" />
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-900 truncate">DM Super-Specialty Degree</h4>
                <p className="text-xs text-slate-500">PDF • Verified 12 Jan 2026</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="border-2 border-dashed border-[#2DC4B4]/40 hover:border-[#2DC4B4] bg-[#E0F7F5]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center space-y-2 transition cursor-pointer">
            <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8 text-[#1B5F85] mx-auto" />
            <span className="text-xs font-bold text-[#1B5F85] block">Upload Additional Certification or Fellowship</span>
            <p className="text-xs text-slate-400">Accepted formats: PDF, JPG, PNG up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};
