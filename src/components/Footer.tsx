import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Clock, Star, Video, ExternalLink, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveNav, setRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Institute Brand & Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                CA
              </div>
              <span className="text-base font-bold text-white font-display">CHANDRA ACADEMY</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premier coaching institute in Juna, Chhattisgarh, preparing officers and teachers for CGPSC, UPSC & CG Shikshak Bharti competitive examinations.
            </p>
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold pt-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.4 rating from 160 Google reviews</span>
            </div>
          </div>

          {/* Col 2: Courses & Exams */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Examination Batches
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setRole('student');
                    setActiveNav('schedule');
                  }}
                  className="hover:text-white transition-colors"
                >
                  CGPSC Prelims & Mains Master Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('student');
                    setActiveNav('schedule');
                  }}
                  className="hover:text-white transition-colors"
                >
                  CG Shikshak Bharti & Vyakhyata Pedagogy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('student');
                    setActiveNav('schedule');
                  }}
                  className="hover:text-white transition-colors"
                >
                  UPSC Civil Services GS Foundation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('student');
                    setActiveNav('schedule');
                  }}
                  className="hover:text-white transition-colors"
                >
                  CG Vyapam Combined SI & Patwari
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Student & Faculty Portal
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setActiveNav('schedule')}
                  className="hover:text-white transition-colors"
                >
                  Classroom Timetable & Hall Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('tests')}
                  className="hover:text-white transition-colors"
                >
                  Automated CBT Mock Test Grading
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('messages')}
                  className="hover:text-white transition-colors"
                >
                  Faculty Doubts & Mentorship Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('enrollment')}
                  className="hover:text-white transition-colors"
                >
                  Online Admission Application Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveNav('analytics')}
                  className="hover:text-white transition-colors"
                >
                  Performance Analytics & Rank Curve
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact & Visiting Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Campus & Location
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>GC tower, Rajiv Gandhi Chowk, Juna, Chhattisgarh 495001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:07477064984" className="text-white hover:underline font-semibold">
                  074770 64984
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Open · Closes 8:30 PM (Daily)</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>YouTube Channel Lectures</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Chandra Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Rajiv Gandhi Chowk, Juna, Chhattisgarh</span>
            <span>·</span>
            <span>Director: Er. Rajesh Chandra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
