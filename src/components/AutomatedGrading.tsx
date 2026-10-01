import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ExamTest, Question, TestSubmission } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Award,
  BarChart3,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Languages,
  Check,
  Plus,
  X,
  FileQuestion,
  HelpCircle,
  TrendingUp,
  Percent
} from 'lucide-react';

export const AutomatedGrading: React.FC = () => {
  const { tests, submissions, submitTestAttempt, role, showToast } = useApp();

  // Navigation states
  const [activeTest, setActiveTest] = useState<ExamTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [bilingualLang, setBilingualLang] = useState<'hindi' | 'english'>('english');
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 mins in seconds
  const [testCompletedSubmission, setTestCompletedSubmission] = useState<TestSubmission | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [reviewSubmissionDetail, setReviewSubmissionDetail] = useState<TestSubmission | null>(null);

  // Timer effect when taking a test
  useEffect(() => {
    if (!activeTest || testCompletedSubmission) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest, testCompletedSubmission]);

  const startTest = (test: ExamTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeLeft(test.durationMinutes * 60);
    setTestCompletedSubmission(null);
    setReviewSubmissionDetail(null);
  };

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleClearAnswer = (questionId: string) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleAutoSubmit = () => {
    if (!activeTest) return;
    const timeSpent = activeTest.durationMinutes * 60 - timeLeft;
    const result = submitTestAttempt(activeTest.id, userAnswers, Math.max(1, timeSpent));
    setTestCompletedSubmission(result);
    setShowConfirmSubmit(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // 1. If currently in CBT Examination mode:
  if (activeTest && !testCompletedSubmission && !reviewSubmissionDetail) {
    const currentQ = activeTest.questions[currentQuestionIndex];
    const isReview = !!markedForReview[currentQ.id];
    const isAnswered = !!userAnswers[currentQ.id];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* CBT Top Examination Bar */}
        <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-md">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              {activeTest.examCategory} CBT Examination Engine
            </span>
            <h2 className="text-base sm:text-lg font-bold font-display">{activeTest.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Language toggle for bilingual competitive exam */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setBilingualLang('english')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  bilingualLang === 'english' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setBilingualLang('hindi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  bilingualLang === 'hindi' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase leading-none">Time Left</span>
                <span className="text-sm font-bold text-white font-mono tabular-nums leading-none">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Main Examination Viewport: Split Stage & Question Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Active Question Stage */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm min-h-[500px]">
            <div className="space-y-6">
              {/* Question metadata row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-bold text-slate-900 text-sm">
                    Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {currentQ.subject}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-mono tabular-nums">
                  <span className="text-emerald-700 font-semibold">+{currentQ.marks} marks</span>
                  <span>/</span>
                  <span className="text-red-700 font-semibold">-{currentQ.negativeMarks} negative</span>
                </div>
              </div>

              {/* Question Content */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed font-display">
                  {bilingualLang === 'hindi' && currentQ.questionHindi
                    ? currentQ.questionHindi
                    : currentQ.questionText}
                </h3>

                {/* Show secondary language subscript for clarity */}
                {bilingualLang === 'english' && currentQ.questionHindi && (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    हिन्दी अनुवाद: {currentQ.questionHindi}
                  </p>
                )}
                {bilingualLang === 'hindi' && (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    English Text: {currentQ.questionText}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = userAnswers[currentQ.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/70 text-slate-900 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-amber-600 text-white'
                            : 'border border-slate-300 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {opt.key}
                      </div>
                      <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                        <span>{opt.text}</span>
                        {opt.textHindi && bilingualLang === 'hindi' && (
                          <span className="block text-slate-500 text-xs mt-0.5">{opt.textHindi}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Controls */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleReview(currentQ.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    isReview
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isReview ? 'fill-amber-600 text-amber-600' : ''}`} />
                  <span>{isReview ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>

                {isAnswered && (
                  <button
                    onClick={() => handleClearAnswer(currentQ.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentQuestionIndex < activeTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                  >
                    <span>Final Submit</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Question Palette Deck */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Question Status Palette
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {activeTest.questions.map((q, idx) => {
                  const answered = !!userAnswers[q.id];
                  const reviewed = !!markedForReview[q.id];
                  const isCurrent = currentQuestionIndex === idx;

                  let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (reviewed && answered) {
                    bgClass = 'bg-purple-600 text-white font-bold';
                  } else if (reviewed) {
                    bgClass = 'bg-amber-500 text-white font-bold';
                  } else if (answered) {
                    bgClass = 'bg-emerald-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg text-xs font-semibold transition-all relative ${bgClass} ${
                        isCurrent ? 'ring-2 ring-slate-900 ring-offset-2' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend for CGPSC exam format */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-emerald-600" />
                <span>Answered ({Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-amber-500" />
                <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-slate-200" />
                <span>
                  Unattempted ({activeTest.questions.length - Object.keys(userAnswers).length})
                </span>
              </div>
            </div>

            {/* Test rules info */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <p className="font-semibold text-slate-900">Marking Scheme:</p>
              <p>· Correct: +2.0 marks</p>
              <p>· Incorrect: -0.66 marks (1/3rd Negative)</p>
              <p>· Unanswered: 0.0 marks</p>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Submit Examination for Auto-Grading?
              </h3>
              <p className="text-xs text-slate-600 mt-2">
                You have answered <strong>{Object.keys(userAnswers).length}</strong> out of{' '}
                <strong>{activeTest.questions.length}</strong> questions.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Return to Test
                </button>
                <button
                  onClick={handleAutoSubmit}
                  className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
                >
                  Yes, Evaluate My Score
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. If viewing a Completed / Evaluated Test Scorecard:
  const submissionToView = testCompletedSubmission || reviewSubmissionDetail;
  if (submissionToView) {
    const originalTest = tests.find((t) => t.id === submissionToView.testId) || tests[0];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Result Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Automated Evaluation Complete · Instant Official Scorecard
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display">{submissionToView.testTitle}</h2>
              <p className="text-xs text-slate-400">
                Aspirant: <strong className="text-slate-200">{submissionToView.studentName}</strong> (Roll #{submissionToView.studentRoll}) · Submitted on {submissionToView.submittedAt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setTestCompletedSubmission(null);
                  setReviewSubmissionDetail(null);
                  setActiveTest(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
              >
                Back to All Tests
              </button>
              <button
                onClick={() => startTest(originalTest)}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
            </div>
          </div>

          {/* Quick Score Metrics Grid with Tabular Numerals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Net Score
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums mt-1">
                {submissionToView.netScore}{' '}
                <span className="text-xs text-slate-400 font-normal">/ 20</span>
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {submissionToView.percentage}% Net Aggregate
              </span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Institute Rank
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums mt-1">
                Rank #{submissionToView.rank}
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Top {submissionToView.percentile}th Percentile
              </span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Accuracy & Negative
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums mt-1">
                {Math.round((submissionToView.correctCount / Math.max(1, submissionToView.totalAttempted)) * 100)}%
              </p>
              <span className="text-[11px] text-red-400 mt-1 block">
                -{submissionToView.negativeScoreDeducted} marks deducted
              </span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Attempt Breakdown
              </span>
              <div className="flex items-center gap-3 text-xs mt-2 font-mono tabular-nums">
                <span className="text-emerald-400 font-bold">✓ {submissionToView.correctCount}</span>
                <span className="text-red-400 font-bold">✗ {submissionToView.incorrectCount}</span>
                <span className="text-slate-400">○ {submissionToView.unattemptedCount}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Time: {Math.round(submissionToView.timeSpentSeconds / 60)} mins
              </span>
            </div>
          </div>
        </div>

        {/* Subject-Wise Mastery Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 font-display">
            Subject-Wise Competency Analysis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {submissionToView.topicScores.map((topic, tIdx) => {
              const topicPct = Math.round((topic.score / Math.max(1, topic.total)) * 100);
              return (
                <div key={tIdx} className="space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{topic.topic}</span>
                    <span className="font-mono tabular-nums">{topic.score} / {topic.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        topicPct >= 75 ? 'bg-emerald-500' : topicPct >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, topicPct)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">{topicPct}% mastery</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Question Diagnostics with Explanations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Question-by-Question Solution & Explanations (CGPSC Model Answer Key)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review correct answers, explanations in Hindi/English, and understand negative marking impacts.
            </p>
          </div>

          <div className="space-y-6">
            {originalTest.questions.map((q, idx) => {
              const given = submissionToView.answers[q.id];
              const isCorrect = given === q.correctAnswer;
              const isSkipped = !given;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border text-xs sm:text-sm space-y-3 ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : isSkipped
                      ? 'border-slate-200 bg-slate-50/30'
                      : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Q{idx + 1}.</span>
                      <span className="font-medium text-slate-600 text-xs">[{q.subject}]</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0">
                      {isCorrect && (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{q.marks})
                        </span>
                      )}
                      {!isCorrect && !isSkipped && (
                        <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (-{q.negativeMarks})
                        </span>
                      )}
                      {isSkipped && (
                        <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Not Attempted (0.0)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-900 font-medium leading-relaxed">{q.questionText}</p>
                  {q.questionHindi && (
                    <p className="text-slate-600 italic text-xs">हिन्दी: {q.questionHindi}</p>
                  )}

                  {/* Options status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => {
                      const isGivenThis = given === opt.key;
                      const isCorrectThis = q.correctAnswer === opt.key;

                      let optClass = 'border-slate-200 bg-white text-slate-700';
                      if (isCorrectThis) {
                        optClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                      } else if (isGivenThis && !isCorrectThis) {
                        optClass = 'border-red-500 bg-red-50 text-red-900 line-through';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{opt.key}.</span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrectThis && (
                            <span className="text-[10px] font-bold text-emerald-700 uppercase">
                              Key ✓
                            </span>
                          )}
                          {isGivenThis && !isCorrectThis && (
                            <span className="text-[10px] font-bold text-red-600 uppercase">
                              Your Choice ✗
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Model Explanation */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-1 mt-3">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>Official Explanation & Reference:</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                    {q.explanationHindi && (
                      <p className="text-slate-600 italic leading-relaxed pt-1">
                        विस्तार: {q.explanationHindi}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Default: Test Center & Submissions Catalog View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Computer-Based Test (CBT) Series
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Automated Exam Grading & Mock Tests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official CGPSC, UPSC & CG Shikshak Bharti pattern with instant percentile & 1/3rd negative marking calculations.
          </p>
        </div>
      </div>

      {/* Available Tests Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 font-display">Available Mock Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-700">{test.examCategory}</span>
                  <span className="text-slate-400 font-medium">{test.batchTarget}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display">{test.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{test.description}</p>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg text-xs text-slate-600 font-mono tabular-nums">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Questions</span>
                    <strong className="text-slate-900">{test.totalQuestions} MCQs</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Max Marks</span>
                    <strong className="text-slate-900">{test.totalMarks} Marks</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Time Limit</span>
                    <strong className="text-slate-900">{test.durationMinutes} mins</strong>
                  </div>
                </div>

                <div className="text-[11px] text-red-600 font-medium">
                  Marking Scheme: {test.negativeMarkingScheme}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Bilingual: Hindi & English</span>
                <button
                  onClick={() => startTest(test)}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <span>Launch CBT Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluated Submissions Table */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 font-display">
          Previously Evaluated Test Submissions
        </h2>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-3 px-4">Test Title</th>
                  <th className="py-3 px-4">Student & Roll</th>
                  <th className="py-3 px-4">Evaluated Date</th>
                  <th className="py-3 px-4 text-right">Attempt (C/W/U)</th>
                  <th className="py-3 px-4 text-right">Net Score</th>
                  <th className="py-3 px-4 text-right">Institute Rank</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {sub.testTitle}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span>{sub.studentName}</span>
                      <span className="text-slate-400 block text-[11px] font-mono">{sub.studentRoll}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 tabular-nums">{sub.submittedAt}</td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-600">
                      <span className="text-emerald-600 font-bold">{sub.correctCount}</span> /{' '}
                      <span className="text-red-500 font-bold">{sub.incorrectCount}</span> /{' '}
                      <span className="text-slate-400">{sub.unattemptedCount}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold font-mono tabular-nums text-amber-700 text-sm">
                      {sub.netScore}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-900 font-mono tabular-nums">
                      Rank #{sub.rank}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setReviewSubmissionDetail(sub)}
                        className="px-2.5 py-1 text-xs font-medium text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded transition-colors"
                      >
                        View Diagnostic Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
