import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  MessageSquare,
  ClipboardList,
  BarChart3,
  Award,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp,
  Users,
  Video,
  BookOpen,
  Sparkles,
  Phone
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { role, currentUser, setActiveNav, schedule, tests, submissions, chats, applications, performance } =
    useApp();

  const nextClass = schedule[0];
  const activeTest = tests[0];
  const latestSubmission = submissions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Chandra Academy Juna Center · Active Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {role === 'student' &&
                `Enrolled in ${currentUser.batch}. Target: CGPSC State Services 2026-27. Roll #${currentUser.rollNumber}`}
              {role === 'teacher' &&
                `Director & Chief Mentor at Chandra Academy. 4 batches scheduled today at GC Tower.`}
              {role === 'admin' &&
                `Admission Office & Student Operations · GC Tower, Rajiv Gandhi Chowk, Bilaspur.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {role === 'student' && (
              <>
                <button
                  onClick={() => setActiveNav('tests')}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Take Active Mock Test</span>
                </button>
                <button
                  onClick={() => setActiveNav('schedule')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>View Timetable</span>
                </button>
              </>
            )}

            {role === 'teacher' && (
              <>
                <button
                  onClick={() => setActiveNav('schedule')}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Manage Class Schedules</span>
                </button>
                <button
                  onClick={() => setActiveNav('messages')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Answer Student Doubts</span>
                </button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button
                  onClick={() => setActiveNav('enrollment')}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Review Online Admissions</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {role === 'student' ? (
          <>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Batch Rank
              </span>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                Rank #{performance.currentRank}
              </p>
              <span className="text-xs text-emerald-600 font-medium mt-1 block">Top 3 in Institute</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Latest Score
              </span>
              <p className="text-2xl font-bold text-amber-700 font-mono tabular-nums mt-1">
                {latestSubmission?.netScore || '17.34'}{' '}
                <span className="text-xs text-slate-400 font-normal">/ 20</span>
              </p>
              <span className="text-xs text-slate-500 mt-1 block">86.7% Net Accuracy</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Class Attendance
              </span>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                {performance.attendancePercent}%
              </p>
              <span className="text-xs text-slate-500 mt-1 block">49 / 52 Sessions</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Active Batch
              </span>
              <p className="text-base font-bold text-slate-900 mt-2 truncate">CGPSC Alpha Batch</p>
              <span className="text-xs text-slate-500 mt-1 block">Hall 201, GC Tower</span>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Enrolled
              </span>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">850+</p>
              <span className="text-xs text-emerald-600 font-medium mt-1 block">Active Aspirants</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                New Applications
              </span>
              <p className="text-2xl font-bold text-amber-700 font-mono tabular-nums mt-1">
                {applications.length}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">Under Admission Review</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Tests Evaluated
              </span>
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
                {submissions.length + 420}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">Automated CGPSC Grading</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Campus Status
              </span>
              <p className="text-base font-bold text-emerald-700 mt-2">Open · Till 8:30 PM</p>
              <span className="text-xs text-slate-500 mt-1 block">Rajiv Gandhi Chowk</span>
            </div>
          </>
        )}
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Schedule & Next Class */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upcoming Class Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Next Upcoming Class at GC Tower
              </span>
              <button
                onClick={() => setActiveNav('schedule')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {nextClass && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{nextClass.courseCategory}</span>
                  <span className="text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                    {nextClass.startTime} - {nextClass.endTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display">
                  {nextClass.title}
                </h3>
                <p className="text-xs text-slate-600">{nextClass.topic}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {nextClass.room}
                  </span>
                  <span>Faculty: {nextClass.facultyName}</span>
                </div>
              </div>
            )}
          </div>

          {/* Active CBT Test Highlight */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Automated Grading & CBT Center
              </span>
              <button
                onClick={() => setActiveNav('tests')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>All Tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeTest && (
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-700">{activeTest.examCategory}</span>
                  <span className="text-slate-500 font-mono">{activeTest.durationMinutes} mins · 1/3rd Negative</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                  {activeTest.title}
                </h3>
                <p className="text-xs text-slate-600">{activeTest.description}</p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    {activeTest.totalQuestions} Questions · {activeTest.totalMarks} Marks
                  </span>
                  <button
                    onClick={() => setActiveNav('tests')}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    Start Online Test
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Messages & Doubts + Location */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Doubt / Message Snippet */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Live Doubts & Mentorship
              </span>
              <button
                onClick={() => setActiveNav('messages')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Open Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {chats.slice(-3).map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveNav('messages')}
                  className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-900">{chat.senderName}</span>
                    <span className="text-[10px]">{chat.timestamp}</span>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{chat.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chandra Academy Official Details Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
            <span className="font-semibold text-amber-700 uppercase tracking-wider block text-[11px]">
              Chandra Academy Information
            </span>
            <div className="space-y-2">
              <p className="font-bold text-slate-900 text-sm">CHANDRA ACADEMY</p>
              <p className="text-amber-700 font-medium">★ 4.4 (160 Google reviews)</p>
              <p>GC tower, Rajiv Gandhi Chowk, Juna, Chhattisgarh 495001</p>
              <p>
                Phone:{' '}
                <a href="tel:07477064984" className="font-semibold text-slate-900 hover:underline">
                  074770 64984
                </a>
              </p>
              <p>Working Hours: Open · Closes 8:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
