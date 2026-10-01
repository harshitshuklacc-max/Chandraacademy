/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { PublicHome } from './components/PublicHome';
import { Overview } from './components/Overview';
import { CourseSchedule } from './components/CourseSchedule';
import { AutomatedGrading } from './components/AutomatedGrading';
import { MessagingCenter } from './components/MessagingCenter';
import { EnrollmentPortal } from './components/EnrollmentPortal';
import { PerformanceAnalytics } from './components/PerformanceAnalytics';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeNav, toastMessage, role } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Page Content depending on active nav */}
      <main className="flex-1">
        {activeNav === 'home' && <PublicHome />}
        {activeNav === 'overview' && <Overview />}
        {activeNav === 'schedule' && <CourseSchedule />}
        {activeNav === 'tests' && <AutomatedGrading />}
        {activeNav === 'messages' && <MessagingCenter />}
        {activeNav === 'enrollment' && <EnrollmentPortal />}
        {activeNav === 'analytics' && <PerformanceAnalytics />}
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
