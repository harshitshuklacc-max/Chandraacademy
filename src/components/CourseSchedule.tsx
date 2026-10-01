import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExamCategory, ScheduleSession } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  FileText,
  Plus,
  Filter,
  Download,
  BookOpen,
  User,
  X,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const CourseSchedule: React.FC = () => {
  const { schedule, addScheduleSession, role, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDay, setSelectedDay] = useState<string>('Friday');
  const [showAddModal, setShowAddModal] = useState(false);

  // New session state for teachers/admins
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ExamCategory>('CGPSC');
  const [newBatch, setNewBatch] = useState('CGPSC Morning Master Batch');
  const [newFaculty, setNewFaculty] = useState('Er. Rajesh Chandra');
  const [newDay, setNewDay] = useState<ScheduleSession['dayOfWeek']>('Friday');
  const [newDate, setNewDate] = useState('2026-10-02');
  const [newStartTime, setNewStartTime] = useState('07:30 AM');
  const [newEndTime, setNewEndTime] = useState('09:30 AM');
  const [newRoom, setNewRoom] = useState('Hall 201, GC Tower, Juna');
  const [newMode, setNewMode] = useState<ScheduleSession['mode']>('Offline Classroom');
  const [newTopic, setNewTopic] = useState('');
  const [newModule, setNewModule] = useState('');

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'All Days'];

  const filteredSessions = schedule.filter((session) => {
    const matchesCategory = selectedCategory === 'ALL' || session.courseCategory === selectedCategory;
    const matchesDay = selectedDay === 'All Days' || session.dayOfWeek === selectedDay;
    return matchesCategory && matchesDay;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTopic.trim()) {
      showToast('Please enter class title and topic');
      return;
    }

    addScheduleSession({
      title: newTitle,
      courseCategory: newCategory,
      batchName: newBatch,
      facultyName: newFaculty,
      facultyRole: 'Faculty Mentor',
      facultyAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
      date: newDate,
      dayOfWeek: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
      room: newRoom,
      mode: newMode,
      topic: newTopic,
      syllabusModule: newModule || 'General Studies Core',
      notesPdfUrl: `${newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-notes.pdf`,
      status: 'Upcoming'
    });

    setShowAddModal(false);
    // Reset form
    setNewTitle('');
    setNewTopic('');
    setNewModule('');
  };

  const handleDownloadNotes = (title: string) => {
    showToast(`Downloading official lecture handout: ${title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header section with clean typographic title and action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Timetable & Session Manager
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Course Scheduling & Class Halls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            GC Tower Classrooms, Rajiv Gandhi Chowk, Bilaspur & Live Interactive Stream channels.
          </p>
        </div>

        {(role === 'teacher' || role === 'admin') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Class</span>
          </button>
        )}
      </div>

      {/* Filter and day selector bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Courses' },
            { id: 'CGPSC', label: 'CGPSC Prelims & Mains' },
            { id: 'CG_SHIKSHAK_BHARTI', label: 'CG Shikshak Bharti' },
            { id: 'UPSC', label: 'UPSC Foundation' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {daysList.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Session Cards */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">No scheduled sessions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No classes match the selected filter ({selectedCategory}) on {selectedDay}. Try selecting "All Days" or switch course category.
            </p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Time & Core Details */}
                <div className="flex items-start gap-4">
                  {/* Time Badge box */}
                  <div className="w-24 sm:w-28 shrink-0 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] font-bold text-slate-900 block tabular-nums">
                      {session.startTime}
                    </span>
                    <span className="text-[10px] text-slate-400 block">to {session.endTime}</span>
                    <span className="inline-block mt-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      {session.dayOfWeek}
                    </span>
                  </div>

                  {/* Main Details */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-amber-700">
                        {session.courseCategory === 'CG_SHIKSHAK_BHARTI' ? 'CG Shikshak Bharti' : session.courseCategory}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500 font-medium">{session.batchName}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-600 font-medium">{session.syllabusModule}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {session.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      <strong className="text-slate-700 font-medium">Topic Focus: </strong>
                      {session.topic}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{session.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{session.facultyName}</span>
                        <span className="text-slate-400">({session.facultyRole})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${
                          session.mode === 'Offline Classroom' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`} />
                        <span>{session.mode}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 lg:flex-col lg:items-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {session.notesPdfUrl && (
                    <button
                      onClick={() => handleDownloadNotes(session.title)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Study Handout</span>
                    </button>
                  )}

                  {session.liveLink ? (
                    <a
                      href={session.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Live Hall</span>
                    </a>
                  ) : (
                    <div className="text-[11px] text-slate-400 font-medium">
                      Offline at GC Tower
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Session Modal for Teachers / Admins */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Schedule New Class Session</h3>
                <p className="text-xs text-slate-500">Configure lecture hall, timings, and syllabus topic</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject / Session Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chhattisgarh Janjatiya Sanskiti & Customs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Target *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ExamCategory)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    <option value="CGPSC">CGPSC State Civil Services</option>
                    <option value="CG_SHIKSHAK_BHARTI">CG Shikshak Bharti & Pedagogy</option>
                    <option value="UPSC">UPSC Civil Services GS</option>
                    <option value="CG_VYAPAM">CG Vyapam & Combined</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Batch Group
                  </label>
                  <input
                    type="text"
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Day of Week
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value as ScheduleSession['dayOfWeek'])}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Venue / Classroom *
                  </label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. Hall 201, GC Tower"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mode of Class
                  </label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as ScheduleSession['mode'])}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    <option value="Offline Classroom">Offline Classroom (GC Tower)</option>
                    <option value="Online Live Stream">Online Live Stream</option>
                    <option value="Hybrid">Hybrid (Classroom + Live)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic Description & Reference Reading *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Detail key sub-topics to be taught in this lecture..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
                >
                  Publish Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
