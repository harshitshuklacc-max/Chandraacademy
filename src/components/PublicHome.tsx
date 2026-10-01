import React from 'react';
import { useApp } from '../context/AppContext';
import { ACADEMY_INFO } from '../data/mockData';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  BookOpen,
  Calendar,
  CheckCircle2,
  MessageSquare,
  BarChart3,
  Award,
  Video,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

export const PublicHome: React.FC = () => {
  const { setActiveNav, setRole } = useApp();

  const courses = [
    {
      title: 'CGPSC State Civil Services',
      target: 'Deputy Collector, DSP, Naib Tehsildar',
      badge: 'Premier Flagship Batch',
      features: [
        'Complete Prelims (Paper I & CSAT Paper II)',
        'Mains 7-Paper Structured Answer Writing Program',
        'Chhattisgarh Special: History, Janjati, Culture & Geography',
        'Weekly Mock Tests with CGPSC 1/3rd Negative Marking'
      ],
      timing: 'Morning 7:30 AM & Evening 5:30 PM',
      hall: 'Hall 201, GC Tower, Juna'
    },
    {
      title: 'CG Shikshak Bharti 2026-27',
      target: 'Vyakhyata (Lecturer), Shikshak & Sahayak Shikshak',
      badge: 'High Selection Track Record',
      features: [
        'In-depth Child Development & Pedagogy (बाल विकास एवं शिक्षाशास्त्र)',
        'Subject Specialization: Maths, Science, Social Studies, Hindi & English',
        'CG Vyapam Exam Blueprint Alignment',
        'Previous 10 Years Solved Papers & Concept Drill'
      ],
      timing: 'Afternoon 2:00 PM & Online Stream',
      hall: 'Smart Room 104, GC Tower'
    },
    {
      title: 'UPSC Civil Services Foundation',
      target: 'IAS, IPS, IFS Comprehensive 2-Year Program',
      badge: 'Integrated GS Foundation',
      features: [
        'NCERT to Advanced Standard Reference Textbooks Coverage',
        'Daily Editorial & Current Affairs Dissection',
        'Constitution, Governance & Ethics Masterclasses',
        'One-on-One Mentorship with Experienced Bureaucrats'
      ],
      timing: 'Morning 10:00 AM - 1:00 PM',
      hall: 'Seminar Hall, 2nd Floor GC Tower'
    },
    {
      title: 'CG Vyapam & Combined Exams',
      target: 'Sub-Inspector, Patwari, RI, Hostel Superintendent',
      badge: 'Targeted Crash & Regular Batches',
      features: [
        'Chhattisgarh General Studies & Current Affairs',
        'Speed Aptitude, Mental Ability & Computer Awareness',
        'Chhattisgarhi & Hindi Bhasha Grammar Precision',
        'Computer Based Test (CBT) Series'
      ],
      timing: 'Flexible Morning & Weekend Batches',
      hall: 'Wing B, GC Tower'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_chandra_academy_1790863093852.jpg"
            alt="Chandra Academy Lecture Hall in Chhattisgarh"
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 sm:px-10 py-16 lg:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions Open for New CGPSC, UPSC & CG Shikshak Bharti Batches
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-tight">
            Nurturing Officers & Educators for Chhattisgarh and the Nation.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Chandra Academy is Chhattisgarh’s trusted coaching institute at Rajiv Gandhi Chowk, Bilaspur.
            Combining disciplined classroom pedagogy, automated CBT exam grading, and continuous mentor tracking.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveNav('enrollment')}
              className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Apply Online for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setRole('student');
                setActiveNav('tests');
              }}
              className="px-6 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Take Automated Mock Test Demo</span>
            </button>
          </div>

          {/* Social Proof & Location Badges */}
          <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-lg text-white tabular-nums">4.4 / 5.0</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">160+ Google Reviews</p>
            </div>
            <div>
              <p className="font-bold text-lg text-white tabular-nums">1,240+</p>
              <p className="text-xs text-slate-400 mt-0.5">Civil Services Selections</p>
            </div>
            <div>
              <p className="font-bold text-lg text-white tabular-nums">GC Tower</p>
              <p className="text-xs text-slate-400 mt-0.5">Rajiv Gandhi Chowk, Juna</p>
            </div>
            <div>
              <p className="font-bold text-lg text-white tabular-nums">Till 8:30 PM</p>
              <p className="text-xs text-slate-400 mt-0.5">Daily Counseling & Library</p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Details & Contact Spotlight Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Visit Campus
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Headquarters & Lecture Halls
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                GC tower, Rajiv Gandhi Chowk, Juna, Chhattisgarh 495001
              </p>
              <div className="text-xs text-slate-500 space-y-1 pt-1">
                <p>· Modern Air-conditioned Classrooms</p>
                <p>· Dedicated Doubt Clearing Rooms & Reading Library</p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Admission Desk & Helpline
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Talk to Academic Counselors
              </h3>
              <p className="text-sm text-slate-600">
                Call for syllabus guidance, batch timings, and fee concession details:
              </p>
              <a
                href="tel:07477064984"
                className="inline-flex items-center gap-2 text-base font-bold text-amber-600 hover:text-amber-700"
              >
                <Phone className="w-4 h-4" />
                <span>074770 64984</span>
              </a>
              <p className="text-xs text-slate-500">Working hours: 07:00 AM – 08:30 PM (Mon–Sun)</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Digital Ecosystem
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Online & Hybrid Learning
              </h3>
              <p className="text-sm text-slate-600">
                Live interactive classes, digital PDF notes, and automated mock exams accessible statewide.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-red-600" />
                  <span>YouTube Lectures</span>
                </a>
                <button
                  onClick={() => setActiveNav('enrollment')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-medium transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Online Admission</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Competitive Exams Offered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Specialized Courses
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-display">
            Comprehensive Programs for State & National Exams
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Engineered with deep syllabus alignment, state-specific study manuals, and automated performance tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{course.title}</h3>
                    <p className="text-xs text-amber-700 font-medium mt-0.5">{course.target}</p>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {course.badge}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {course.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-amber-600 font-bold">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <p className="font-medium text-slate-700">{course.timing}</p>
                  <p>{course.hall}</p>
                </div>
                <button
                  onClick={() => setActiveNav('enrollment')}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>Enroll in Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Faculty Mentor Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-2xl p-6 sm:p-10 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <img
                  src="/src/assets/images/faculty_director_chandra_1790863108678.jpg"
                  alt="Er. Rajesh Chandra - Director & Chief Mentor"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-xl shadow-md border-4 border-white"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-semibold px-3 py-1 rounded-md shadow whitespace-nowrap">
                  Director & Founder
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Founder's Vision & Pedagogy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Guided by Er. Rajesh Chandra & Experienced Bureaucratic Mentors
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                "Our mission at Chandra Academy, situated at Rajiv Gandhi Chowk, Bilaspur, has always been to provide every aspirant from every corner of Chhattisgarh—from Bastar to Surguja—access to civil services preparation of the highest national standard. With computerized automated grading, rigorous mains answer critique, and dedicated mentorship, we ensure your efforts translate into final merit ranks."
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900">Er. Rajesh Chandra</p>
                  <p className="text-slate-500">Indian Polity & CG Special</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900">Dr. Kavita Verma</p>
                  <p className="text-slate-500">Child Pedagogy & Shikshak Lead</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900">Prof. Amit Patel</p>
                  <p className="text-slate-500">CG Geography & Economy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Capabilities Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            All-in-One Management System
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-display">
            Built for Modern Students & Teachers
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Experience our complete digital infrastructure connecting faculty, classroom halls, and students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => {
              setRole('student');
              setActiveNav('schedule');
            }}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Course Scheduling</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Real-time daily class schedules, venue allocations at GC Tower, and downloadable PDF study notes.
            </p>
          </div>

          <div
            onClick={() => {
              setRole('student');
              setActiveNav('tests');
            }}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Automated Grading</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Instant evaluation with CGPSC 1/3rd negative marking, percentile ranking, and question diagnostics.
            </p>
          </div>

          <div
            onClick={() => {
              setRole('student');
              setActiveNav('messages');
            }}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Real-time Messaging</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Direct faculty-student chat, batch doubt discussion boards, and official announcements.
            </p>
          </div>

          <div
            onClick={() => {
              setRole('student');
              setActiveNav('analytics');
            }}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Performance Analytics</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Subject strength maps, attendance tracking, test score trends, and targeted cut-off benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* Direct CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Ready to begin your preparation at Chandra Academy?
            </h3>
            <p className="text-sm text-amber-100">
              Submit your online enrollment application in 2 minutes. Our counselor at GC Tower will contact you for batch allocation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveNav('enrollment')}
              className="px-6 py-3 rounded-lg bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm"
            >
              Start Online Application
            </button>
            <a
              href="tel:07477064984"
              className="px-6 py-3 rounded-lg bg-amber-800/80 hover:bg-amber-800 text-white font-medium text-sm border border-amber-600 transition-colors"
            >
              Call 074770 64984
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
