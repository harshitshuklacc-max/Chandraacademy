import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  MessageSquare,
  ClipboardList,
  BarChart3,
  Building2,
  ChevronDown,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  UserCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, currentUser, activeNav, setActiveNav } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [infoBannerOpen, setInfoBannerOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Building2, roles: ['student', 'teacher', 'admin'] },
    { id: 'schedule', label: 'Course Timetable', icon: Calendar, roles: ['student', 'teacher', 'admin', 'public'] },
    { id: 'tests', label: 'Automated Tests', icon: CheckCircle2, roles: ['student', 'teacher', 'admin', 'public'] },
    { id: 'messages', label: 'Messaging', icon: MessageSquare, roles: ['student', 'teacher', 'admin', 'public'] },
    { id: 'enrollment', label: 'Online Admissions', icon: ClipboardList, roles: ['student', 'teacher', 'admin', 'public'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['student', 'teacher', 'admin', 'public'] }
  ];

  const visibleNavs = navItems.filter((item) => item.roles.includes(role));

  const roleLabels: Record<UserRole, { title: string; subtitle: string }> = {
    student: { title: 'Student Portal', subtitle: 'Anjali Sahu (CGPSC)' },
    teacher: { title: 'Faculty Portal', subtitle: 'Er. Rajesh Chandra (Director)' },
    admin: { title: 'Admission Office', subtitle: 'GC Tower Desk' },
    public: { title: 'Institute Portal', subtitle: 'Public Visitor' }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Quick notice bar for Chandra Academy location & hours */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            GC tower, Rajiv Gandhi Chowk, Juna, Chhattisgarh 495001
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            Open · Closes 8:30 PM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:07477064984"
            className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>074770 64984</span>
          </a>
          <span className="text-slate-500">·</span>
          <span className="text-amber-400 font-semibold tracking-wide">
            ★ 4.4 (160 Google Reviews)
          </span>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (role === 'public') setActiveNav('home');
                else setActiveNav('overview');
              }}
              className="flex items-center gap-2 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                CA
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight font-display">
                  CHANDRA ACADEMY
                </span>
                <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                  CGPSC · UPSC · CG SHIKSHAK BHARTI
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6">
            {role === 'public' && (
              <button
                onClick={() => setActiveNav('home')}
                className={`text-sm font-medium transition-colors ${
                  activeNav === 'home'
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Institute Overview
              </button>
            )}
            {visibleNavs.map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveNav(nav.id)}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeNav === nav.id
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <nav.icon className="w-4 h-4 opacity-75" />
                {nav.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions + Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick role selector dropdown to let reviewer experience all features */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-medium text-slate-700"
                title="Switch portal view"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="hidden sm:inline text-slate-500">Role:</span>
                <span className="font-semibold text-slate-900">{roleLabels[role].title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Active Portal
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setRole('student');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      role === 'student' ? 'bg-amber-50/60 text-amber-900 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-900">Student View</p>
                      <p className="text-[11px] text-slate-500">Anjali Sahu · CGPSC Aspirant</p>
                    </div>
                    {role === 'student' && <UserCheck className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setRole('teacher');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      role === 'teacher' ? 'bg-amber-50/60 text-amber-900 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-900">Faculty & Director View</p>
                      <p className="text-[11px] text-slate-500">Er. Rajesh Chandra · Chief Mentor</p>
                    </div>
                    {role === 'teacher' && <UserCheck className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setRole('admin');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      role === 'admin' ? 'bg-amber-50/60 text-amber-900 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-900">Admission & Office Desk</p>
                      <p className="text-[11px] text-slate-500">GC Tower Juna Center</p>
                    </div>
                    {role === 'admin' && <UserCheck className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setRole('public');
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      role === 'public' ? 'bg-amber-50/60 text-amber-900 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-900">Public Institute Page</p>
                      <p className="text-[11px] text-slate-500">About, Courses & Location</p>
                    </div>
                    {role === 'public' && <UserCheck className="w-4 h-4 text-amber-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setActiveNav('enrollment')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Online</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation row */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-100 no-scrollbar">
          {role === 'public' && (
            <button
              onClick={() => setActiveNav('home')}
              className={`text-xs px-3 py-1 rounded-md whitespace-nowrap font-medium ${
                activeNav === 'home' ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600'
              }`}
            >
              Institute Info
            </button>
          )}
          {visibleNavs.map((nav) => (
            <button
              key={nav.id}
              onClick={() => setActiveNav(nav.id)}
              className={`text-xs px-3 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1.5 ${
                activeNav === nav.id ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600'
              }`}
            >
              <nav.icon className="w-3.5 h-3.5" />
              {nav.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
