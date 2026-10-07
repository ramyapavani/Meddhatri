import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext.js';
import { Stethoscope, Lock, Mail, ShieldCheck, Sparkles, ArrowRight, UserCheck, Building2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchRolePersona } = useAuth();
  const [email, setEmail] = useState('ananya.rao@meddhatri.demo');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('PROFESSIONAL');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, role);
      if (role === 'SUPER_ADMIN') navigate('/admin/dashboard');
      else if (role === 'ORGANIZATION_ADMIN' || role === 'RECRUITER') navigate('/organization/dashboard');
      else navigate('/professional/dashboard');
    } catch (err: any) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-premium p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B5F85] text-[#2DC4B4] flex items-center justify-center mx-auto shadow-md">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#1B5F85]">Welcome Back to MedDhatri AI</h2>
          <p className="text-xs text-slate-500">Sign in to manage your healthcare applications or recruitment pipeline</p>
        </div>

        {/* Quick Demo Persona One-Click Buttons */}
        <div className="bg-[#E0F7F5]/40 p-3.5 rounded-2xl border border-[#2DC4B4]/20 space-y-2.5">
          <span className="text-xs font-bold text-[#1B5F85] block text-center">Quick 1-Click Demo Logins:</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                switchRolePersona('doctor');
                window.open('/professional/dashboard', '_blank', 'noopener,noreferrer');
              }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 hover:border-[#2DC4B4] hover:text-[#1B5F85] transition text-left cursor-pointer shadow-2xs"
            >
              👨‍⚕️ Dr. Ananya (Doctor) ↗
            </button>
            <button
              type="button"
              onClick={() => {
                switchRolePersona('recruiter');
                navigate('/organization/dashboard');
              }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 hover:border-[#2DC4B4] hover:text-[#1B5F85] transition text-left cursor-pointer shadow-2xs"
            >
              🏥 NovaCare (Recruiter)
            </button>
            <button
              type="button"
              onClick={() => {
                switchRolePersona('nurse');
                navigate('/professional/dashboard');
              }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 hover:border-[#2DC4B4] hover:text-[#1B5F85] transition text-left cursor-pointer shadow-2xs"
            >
              👩‍⚕️ Priya (Staff Nurse)
            </button>
            <button
              type="button"
              onClick={() => {
                switchRolePersona('admin');
                navigate('/admin/dashboard');
              }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-800 hover:border-[#2DC4B4] hover:text-[#1B5F85] transition text-left cursor-pointer shadow-2xs"
            >
              🛡️ Super Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
                placeholder="doctor@hospital.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 block">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#1B5F85] hover:text-[#2DC4B4] font-bold">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2DC4B4] hover:bg-[#25ab9d] text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          New to MedDhatri AI?{' '}
          <Link to="/register" className="font-bold text-[#1B5F85] hover:text-[#2DC4B4]">Create Account</Link>
        </p>
      </div>
    </div>
  );
};
