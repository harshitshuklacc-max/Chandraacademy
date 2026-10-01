import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  BarChart3,
  Award,
  CalendarCheck,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  ArrowUpRight,
  Target,
  Sparkles
} from 'lucide-react';

export const PerformanceAnalytics: React.FC = () => {
  const { performance, submissions } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
          Student Progress & Benchmark Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Performance Analytics & Rank Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed metrics for <strong className="text-slate-700">{performance.studentName}</strong> (
          {performance.batch})
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Institute Rank</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-2">
            #{performance.currentRank}
          </p>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">
            Top {((performance.currentRank / performance.batchSize) * 100).toFixed(1)}% of batch
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Mock Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-2">
            {performance.averageScorePercent}%
          </p>
          <span className="text-xs text-slate-500 mt-1 block font-mono">
            Across {performance.testsGiven} tests
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Class Attendance</span>
            <CalendarCheck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-2">
            {performance.attendancePercent}%
          </p>
          <span className="text-xs text-slate-500 mt-1 block font-mono">
            {performance.totalClassesAttended} of {performance.totalClassesScheduled} sessions
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Exam Readiness</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-purple-700 font-mono tabular-nums mt-2">
            High (88%)
          </p>
          <span className="text-xs text-purple-600 font-medium mt-1 block">
            Projected CGPSC Prelims Clear
          </span>
        </div>
      </div>

      {/* Main Charts: Progression Curve & Subject Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Test Score Progression Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Mock Test Score Progression
              </h3>
              <p className="text-xs text-slate-500">Net score trend across consecutive mock tests</p>
            </div>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              <span>+19% Improvement</span>
            </span>
          </div>

          {/* Clean CSS/SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-200">
            {performance.recentTestProgress.map((test, idx) => {
              const heightPct = Math.round((test.score / test.maxScore) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                    {test.score}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg relative group h-full max-h-48 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg transition-all duration-500 group-hover:from-amber-500 group-hover:to-amber-400"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 text-center truncate max-w-[80px]">
                    {test.date}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Minimum Passing Cutoff: 8.0 marks</span>
            <span>Batch Topper Average: 18.2 marks</span>
          </div>
        </div>

        {/* Right: Subject-wise Mastery */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Subject Mastery Breakdown</h3>
            <p className="text-xs text-slate-500">Evaluated from automated CBT test questions</p>
          </div>

          <div className="space-y-4">
            {performance.subjectMastery.map((sub, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{sub.subject}</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900">
                    {sub.scorePercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sub.scorePercent >= 85
                        ? 'bg-emerald-500'
                        : sub.scorePercent >= 75
                        ? 'bg-amber-500'
                        : 'bg-red-400'
                    }`}
                    style={{ width: `${sub.scorePercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Highest score recorded in <strong>CG Economic Survey & Schemes</strong> (91%).
            </p>
          </div>
        </div>
      </div>

      {/* Mentor Recommendations & Weakness Diagnosis */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 font-display mb-4">
          Academic Diagnosis & Director's Advisory (Er. Rajesh Chandra)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Key Strengths</span>
            </div>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>• Exceptional accuracy (94%) on Chhattisgarh Kalchuri & Maratha dynasties.</li>
              <li>• Firm grip on Panchayati Raj Act 1993 and PESA scheduled area rules.</li>
              <li>• Zero unattempted questions in Polity & Environmental questions.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Recommended Focus Areas</span>
            </div>
            <ul className="text-slate-700 space-y-1 text-xs">
              <li>
                • <strong>Chhattisgarhi Grammar & Idioms:</strong> 2 incorrect answers recorded. Attend
                Wednesday 5 PM language workshop.
              </li>
              <li>
                • <strong>Time Management:</strong> Spent 3.2 minutes on Question 4 (Geography peaks).
                Aim for &le; 1.5 minutes per MCQ.
              </li>
              <li>• Continue weekly 15-mark Mains answer writing practice at GC Tower.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
