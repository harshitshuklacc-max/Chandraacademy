export type UserRole = 'student' | 'teacher' | 'admin' | 'public';

export type ExamCategory = 'CGPSC' | 'UPSC' | 'CG_SHIKSHAK_BHARTI' | 'CG_VYAPAM';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar: string;
  batch?: string;
  rollNumber?: string;
  targetExam?: ExamCategory;
  designation?: string;
}

export interface ScheduleSession {
  id: string;
  title: string;
  courseCategory: ExamCategory;
  batchName: string;
  facultyName: string;
  facultyRole: string;
  facultyAvatar: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g., "07:30 AM"
  endTime: string; // e.g., "09:30 AM"
  room: string; // e.g., "Hall 201, GC Tower" or "Online Interactive Room 1"
  mode: 'Offline Classroom' | 'Online Live Stream' | 'Hybrid';
  topic: string;
  syllabusModule: string;
  notesPdfUrl?: string;
  liveLink?: string;
  status: 'Upcoming' | 'Live Now' | 'Completed';
}

export interface Question {
  id: string;
  questionNumber: number;
  subject: string;
  questionText: string;
  questionHindi?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    textHindi?: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  marks: number;
  negativeMarks: number;
  explanation: string;
  explanationHindi?: string;
}

export interface ExamTest {
  id: string;
  title: string;
  examCategory: ExamCategory;
  batchTarget: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  passingMarks: number;
  negativeMarkingScheme: string; // e.g. "1/3rd (-0.66)"
  description: string;
  questions: Question[];
  status: 'Active' | 'Upcoming' | 'Archived';
}

export interface TestSubmission {
  id: string;
  testId: string;
  testTitle: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  submittedAt: string;
  timeSpentSeconds: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  totalAttempted: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  rawScore: number;
  negativeScoreDeducted: number;
  netScore: number;
  percentage: number;
  percentile: number;
  rank: number;
  totalParticipants: number;
  topicScores: {
    topic: string;
    score: number;
    total: number;
  }[];
}

export interface ChatMessage {
  id: string;
  channelId?: string;
  recipientId?: string; // for direct messages
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  content: string;
  timestamp: string;
  tag?: string; // e.g. 'Doubt', 'Handout', 'Important'
  attachment?: {
    name: string;
    type: 'pdf' | 'image' | 'link';
    size?: string;
  };
}

export interface EnrollmentApplication {
  id: string; // e.g., "CA-2026-9281"
  appliedDate: string;
  fullName: string;
  fatherName: string;
  email: string;
  phone: string;
  gender: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  district: string; // Chhattisgarh districts
  targetCourse: ExamCategory;
  batchPreference: string;
  learningMode: 'Offline Classroom (GC Tower)' | 'Online Live & Recorded' | 'Hybrid';
  highestQualification: string;
  tetQualified?: string; // For Shikshak Bharti: Paper 1 / Paper 2 / CTET / None
  paymentPlan: 'Lump Sum (10% Discount)' | '3 Easy Installments';
  applicationStatus: 'Under Review' | 'Document Verified' | 'Approved' | 'Seat Allocated';
  rollNumberAssigned?: string;
  adminNotes?: string;
}

export interface PerformanceMetric {
  studentId: string;
  studentName: string;
  targetExam: ExamCategory;
  batch: string;
  attendancePercent: number;
  totalClassesAttended: number;
  totalClassesScheduled: number;
  testsGiven: number;
  averageScorePercent: number;
  currentRank: number;
  batchSize: number;
  subjectMastery: {
    subject: string;
    scorePercent: number;
    trend: 'up' | 'stable' | 'down';
  }[];
  recentTestProgress: {
    testName: string;
    date: string;
    score: number;
    maxScore: number;
    rank: number;
  }[];
}
