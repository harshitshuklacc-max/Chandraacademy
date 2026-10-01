import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EnrollmentApplication, ExamCategory } from '../types';
import {
  GraduationCap,
  ClipboardList,
  CheckCircle2,
  Clock,
  Search,
  Building2,
  UserCheck,
  FileCheck,
  CreditCard,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Download,
  Phone
} from 'lucide-react';

export const EnrollmentPortal: React.FC = () => {
  const { applications, submitEnrollmentApplication, updateApplicationStatus, role, showToast } =
    useApp();

  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'admin'>('apply');
  const [trackingId, setTrackingId] = useState('');
  const [trackedApplication, setTrackedApplication] = useState<EnrollmentApplication | null>(null);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [category, setCategory] = useState<EnrollmentApplication['category']>('General');
  const [district, setDistrict] = useState('Bilaspur');
  const [targetCourse, setTargetCourse] = useState<ExamCategory>('CGPSC');
  const [batchPreference, setBatchPreference] = useState('CGPSC Prelims + Mains Master Batch (Morning)');
  const [learningMode, setLearningMode] = useState<EnrollmentApplication['learningMode']>(
    'Offline Classroom (GC Tower)'
  );
  const [highestQualification, setHighestQualification] = useState('Graduation Complete');
  const [tetQualified, setTetQualified] = useState('Not Applicable');
  const [paymentPlan, setPaymentPlan] = useState<EnrollmentApplication['paymentPlan']>(
    'Lump Sum (10% Discount)'
  );

  const cgDistricts = [
    'Bilaspur',
    'Raipur',
    'Durg',
    'Rajnandgaon',
    'Janjgir-Champa',
    'Korba',
    'Raigarh',
    'Bastar (Jagdalpur)',
    'Surguja (Ambikapur)',
    'Dantewada',
    'Kabirdham (Kawardha)',
    'Mahasamund',
    'Dhamtari',
    'Balod',
    'Bemetara',
    'Kanker',
    'Sukma',
    'Bijapur',
    'Koriya',
    'Gaurela-Pendra-Marwahi',
    'Other District'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      showToast('Please fill all mandatory details.');
      return;
    }

    const newId = submitEnrollmentApplication({
      fullName,
      fatherName: fatherName || 'Father/Guardian',
      email,
      phone,
      gender,
      category,
      district,
      targetCourse,
      batchPreference,
      learningMode,
      highestQualification,
      tetQualified: targetCourse === 'CG_SHIKSHAK_BHARTI' ? tetQualified : undefined,
      paymentPlan
    });

    setSubmittedAppId(newId);
    showToast(`Application successfully filed! ID: ${newId}`);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    const query = trackingId.trim().toUpperCase();
    const found = applications.find(
      (app) => app.id.toUpperCase() === query || app.phone.includes(query)
    );

    if (found) {
      setTrackedApplication(found);
    } else {
      showToast('No application found with this ID or phone number.');
      setTrackedApplication(null);
    }
  };

  const getStatusStepIndex = (status: EnrollmentApplication['applicationStatus']) => {
    switch (status) {
      case 'Under Review':
        return 1;
      case 'Document Verified':
        return 2;
      case 'Approved':
        return 3;
      case 'Seat Allocated':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Admissions & Student Registration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Online Enrollment & Application Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Apply online for 2026-27 batches, track application review, and verify seat allocation at GC Tower.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'apply'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Apply Online
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'track'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Track Status
          </button>
          {(role === 'admin' || role === 'teacher') && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'admin'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Office Desk ({applications.length})
            </button>
          )}
        </div>
      </div>

      {/* 1. APPLY ONLINE APPLICATION TAB */}
      {activeTab === 'apply' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {submittedAppId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Application Successfully Submitted!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your admission application has been registered with Chandra Academy Admissions Office, GC Tower.
                </p>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl max-w-xs mx-auto text-center">
                  <span className="text-[11px] font-semibold text-amber-800 uppercase block">
                    Your Official Application ID
                  </span>
                  <span className="text-2xl font-bold text-slate-900 font-mono tracking-wider">
                    {submittedAppId}
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setTrackingId(submittedAppId);
                      setActiveTab('track');
                      const found = applications.find((a) => a.id === submittedAppId);
                      if (found) setTrackedApplication(found);
                    }}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
                  >
                    Track Review Status
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedAppId(null);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                    }}
                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Step 1: Aspirant Profile & Domicile
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name (As per 10th Certificate) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rameshwar Dewangan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Father's / Guardian's Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dileep Dewangan"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98261 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. aspirant@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Reservation Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      >
                        <option value="General">General / Unreserved</option>
                        <option value="OBC">OBC (Non-Creamy Layer)</option>
                        <option value="SC">SC (Scheduled Caste)</option>
                        <option value="ST">ST (Scheduled Tribe)</option>
                        <option value="EWS">EWS (Economically Weaker Section)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Domicile District (Chhattisgarh) *
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      >
                        {cgDistricts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Step 2: Course & Batch Selection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Competitive Exam *
                      </label>
                      <select
                        value={targetCourse}
                        onChange={(e) => setTargetCourse(e.target.value as ExamCategory)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      >
                        <option value="CGPSC">CGPSC State Services (Prelims + Mains)</option>
                        <option value="CG_SHIKSHAK_BHARTI">
                          CG Shikshak Bharti (Vyakhyata / Shikshak)
                        </option>
                        <option value="UPSC">UPSC Civil Services GS Integrated</option>
                        <option value="CG_VYAPAM">CG Vyapam Combined Sub-Inspector / Patwari</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Batch Timing
                      </label>
                      <select
                        value={batchPreference}
                        onChange={(e) => setBatchPreference(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      >
                        <option value="Morning Batch (07:30 AM - 10:30 AM)">
                          Morning Batch (07:30 AM - 10:30 AM)
                        </option>
                        <option value="Afternoon Pedagogy Batch (02:00 PM - 05:00 PM)">
                          Afternoon Pedagogy Batch (02:00 PM - 05:00 PM)
                        </option>
                        <option value="Evening Mains Batch (05:30 PM - 08:30 PM)">
                          Evening Mains Batch (05:30 PM - 08:30 PM)
                        </option>
                        <option value="Weekend Intensive Batch (Saturday & Sunday)">
                          Weekend Intensive Batch (Sat-Sun)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mode of Learning *
                      </label>
                      <select
                        value={learningMode}
                        onChange={(e) => setLearningMode(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      >
                        <option value="Offline Classroom (GC Tower)">
                          Offline Classroom (GC Tower, Rajiv Gandhi Chowk)
                        </option>
                        <option value="Online Live & Recorded">
                          Online Live Interactive + App Recorded Access
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Highest Qualification
                      </label>
                      <input
                        type="text"
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                        placeholder="e.g. B.Sc, B.Ed, M.A."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    {targetCourse === 'CG_SHIKSHAK_BHARTI' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Teacher Eligibility Test (TET) Status
                        </label>
                        <select
                          value={tetQualified}
                          onChange={(e) => setTetQualified(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                        >
                          <option value="CG-TET Paper 2 Qualified">CG-TET Paper 2 Qualified (Upper Primary)</option>
                          <option value="CG-TET Paper 1 Qualified">CG-TET Paper 1 Qualified (Primary)</option>
                          <option value="CTET Paper 1 & 2 Both Qualified">CTET Paper 1 & 2 Both Qualified</option>
                          <option value="Appearing / Preparing this year">Appearing / Preparing this year</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Step 3: Fee Plan Preference
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <label
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        paymentPlan === 'Lump Sum (10% Discount)'
                          ? 'border-amber-600 bg-amber-50/60 text-slate-900'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        checked={paymentPlan === 'Lump Sum (10% Discount)'}
                        onChange={() => setPaymentPlan('Lump Sum (10% Discount)')}
                        className="sr-only"
                      />
                      <p className="font-bold text-sm">One-Time Lump Sum</p>
                      <p className="text-slate-500 mt-0.5">Avail 10% direct concession on institute tuition fee.</p>
                    </label>

                    <label
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        paymentPlan === '3 Easy Installments'
                          ? 'border-amber-600 bg-amber-50/60 text-slate-900'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        checked={paymentPlan === '3 Easy Installments'}
                        onChange={() => setPaymentPlan('3 Easy Installments')}
                        className="sr-only"
                      />
                      <p className="font-bold text-sm">3 Easy Installments</p>
                      <p className="text-slate-500 mt-0.5">Convenient quarterly installment plan without interest.</p>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Submit Admission Application</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Official submission to Chandra Academy Administration, GC Tower, Rajiv Gandhi Chowk, Bilaspur.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Admission Info & Assistance */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Chandra Academy Admission Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applications received online are screened directly by our counseling team at GC Tower.
                Eligible students are assigned roll numbers and invited for batch orientation.
              </p>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>GC tower, Rajiv Gandhi Chowk, Juna, Chhattisgarh 495001</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <a href="tel:07477064984" className="font-semibold text-amber-700 hover:underline">
                    074770 64984
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Counseling Open Till 8:30 PM Daily</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Admission Inclusions
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>✓ Full physical printed syllabus modules & notes</li>
                <li>✓ Access to Computer-Based Test (CBT) Series</li>
                <li>✓ AC Reading Library & Doubt Clearing Desk</li>
                <li>✓ Direct Answer Writing Evaluation by Er. Rajesh Chandra</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRACK APPLICATION STATUS TAB */}
      {activeTab === 'track' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-display mb-2">
              Track Enrollment Application
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your Application ID (e.g. <strong className="text-slate-700">CA-2026-8910</strong>,{' '}
              <strong className="text-slate-700">CA-2026-9142</strong>) or registered phone number.
            </p>

            <form onSubmit={handleTrackSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Application ID (e.g. CA-2026-8910)..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Result Tracker Card */}
          {trackedApplication && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Application ID</span>
                  <h3 className="text-xl font-bold text-slate-900 font-mono">
                    {trackedApplication.id}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Candidate: <strong>{trackedApplication.fullName}</strong> · Applied on{' '}
                    {trackedApplication.appliedDate}
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">
                    Current Status
                  </span>
                  <span className="inline-block mt-1 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900">
                    {trackedApplication.applicationStatus}
                  </span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                  Application Review Stages
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { step: 1, label: 'Submitted' },
                    { step: 2, label: 'Doc Verified' },
                    { step: 3, label: 'Approved' },
                    { step: 4, label: 'Seat Allocated' }
                  ].map((s) => {
                    const currentStep = getStatusStepIndex(trackedApplication.applicationStatus);
                    const isDone = s.step <= currentStep;
                    const isCurrent = s.step === currentStep;

                    return (
                      <div key={s.step} className="space-y-1.5">
                        <div
                          className={`h-2 rounded-full ${
                            isDone ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        />
                        <span
                          className={`block text-[11px] ${
                            isCurrent
                              ? 'font-bold text-slate-900'
                              : isDone
                              ? 'text-emerald-700 font-medium'
                              : 'text-slate-400'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enrolled Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block">Target Course:</span>
                  <strong className="text-slate-900">{trackedApplication.targetCourse}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Learning Mode:</span>
                  <strong className="text-slate-900">{trackedApplication.learningMode}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Assigned Roll Number:</span>
                  <strong className="text-amber-700 font-mono">
                    {trackedApplication.rollNumberAssigned || 'Will be allocated upon approval'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Counselor Office Notes:</span>
                  <span className="text-slate-800">{trackedApplication.adminNotes}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. ADMIN / ADMISSIONS DESK TAB */}
      {activeTab === 'admin' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Admission Office Applications Roster ({applications.length} Applicants)
            </h2>
            <span className="text-xs text-slate-500">
              GC Tower Center, Rajiv Gandhi Chowk, Bilaspur
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                    <th className="py-3 px-4">Application ID</th>
                    <th className="py-3 px-4">Candidate & Phone</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Target Course</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{app.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900 block">{app.fullName}</span>
                        <span className="text-slate-400 text-[11px] font-mono">{app.phone}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{app.district}</td>
                      <td className="py-3 px-4 font-medium text-amber-800">{app.targetCourse}</td>
                      <td className="py-3 px-4 text-slate-500">{app.learningMode}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">
                        {app.rollNumberAssigned || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.applicationStatus === 'Seat Allocated'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.applicationStatus === 'Approved'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <select
                          value={app.applicationStatus}
                          onChange={(e) =>
                            updateApplicationStatus(app.id, e.target.value as any)
                          }
                          className="px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-700 focus:outline-none"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Document Verified">Document Verified</option>
                          <option value="Approved">Approved</option>
                          <option value="Seat Allocated">Seat Allocated</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
