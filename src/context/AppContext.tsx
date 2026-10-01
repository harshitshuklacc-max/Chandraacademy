import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  ScheduleSession,
  ExamTest,
  TestSubmission,
  ChatMessage,
  EnrollmentApplication,
  PerformanceMetric
} from '../types';
import {
  MOCK_USERS,
  MOCK_SCHEDULE,
  MOCK_TESTS,
  MOCK_SUBMISSIONS,
  MOCK_CHATS,
  MOCK_APPLICATIONS,
  MOCK_PERFORMANCE
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  schedule: ScheduleSession[];
  addScheduleSession: (session: Omit<ScheduleSession, 'id'>) => void;
  tests: ExamTest[];
  addTest: (test: ExamTest) => void;
  submissions: TestSubmission[];
  activeTestId: string | null;
  setActiveTestId: (id: string | null) => void;
  submitTestAttempt: (
    testId: string,
    answers: Record<string, 'A' | 'B' | 'C' | 'D'>,
    timeSpentSeconds: number
  ) => TestSubmission;
  chats: ChatMessage[];
  sendChatMessage: (content: string, channelId?: string, recipientId?: string, tag?: string) => void;
  applications: EnrollmentApplication[];
  submitEnrollmentApplication: (data: Omit<EnrollmentApplication, 'id' | 'appliedDate' | 'applicationStatus'>) => string;
  updateApplicationStatus: (id: string, status: EnrollmentApplication['applicationStatus'], adminNotes?: string) => void;
  performance: PerformanceMetric;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = sessionStorage.getItem('ca_role');
    return (saved as UserRole) || 'public';
  });

  const [activeNav, setActiveNav] = useState<string>(() => {
    const saved = sessionStorage.getItem('ca_role');
    if (saved && saved !== 'public') {
      return 'overview';
    }
    return 'home';
  });

  const [schedule, setSchedule] = useState<ScheduleSession[]>(() => {
    const saved = localStorage.getItem('ca_schedule');
    return saved ? JSON.parse(saved) : MOCK_SCHEDULE;
  });

  const [tests, setTests] = useState<ExamTest[]>(() => {
    const saved = localStorage.getItem('ca_tests');
    return saved ? JSON.parse(saved) : MOCK_TESTS;
  });

  const [submissions, setSubmissions] = useState<TestSubmission[]>(() => {
    const saved = localStorage.getItem('ca_submissions');
    return saved ? JSON.parse(saved) : MOCK_SUBMISSIONS;
  });

  const [activeTestId, setActiveTestId] = useState<string | null>(null);

  const [chats, setChats] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('ca_chats');
    return saved ? JSON.parse(saved) : MOCK_CHATS;
  });

  const [applications, setApplications] = useState<EnrollmentApplication[]>(() => {
    const saved = localStorage.getItem('ca_applications');
    return saved ? JSON.parse(saved) : MOCK_APPLICATIONS;
  });

  const [performance, setPerformance] = useState<PerformanceMetric>(() => {
    const saved = localStorage.getItem('ca_performance');
    return saved ? JSON.parse(saved) : MOCK_PERFORMANCE;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    sessionStorage.setItem('ca_role', newRole);
    localStorage.removeItem('ca_role');
    if (newRole === 'public') {
      setActiveNav('home');
    } else {
      setActiveNav('overview');
    }
  };

  const currentUser: UserProfile =
    role === 'student'
      ? MOCK_USERS.student
      : role === 'teacher'
      ? MOCK_USERS.teacher
      : role === 'admin'
      ? MOCK_USERS.admin
      : {
          id: 'usr_guest',
          name: 'Prospective Student',
          role: 'public',
          email: 'guest@chandraacademy.org',
          phone: '',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ca_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('ca_tests', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem('ca_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('ca_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('ca_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ca_performance', JSON.stringify(performance));
  }, [performance]);

  // Schedule management
  const addScheduleSession = (sessionData: Omit<ScheduleSession, 'id'>) => {
    const newSession: ScheduleSession = {
      ...sessionData,
      id: `sch_${Date.now()}`
    };
    setSchedule((prev) => [newSession, ...prev]);
    showToast(`Class session scheduled: "${sessionData.title}"`);
  };

  // Test management
  const addTest = (newTest: ExamTest) => {
    setTests((prev) => [newTest, ...prev]);
    showToast(`New test "${newTest.title}" published with automated grading!`);
  };

  // Automated Grading Engine
  const submitTestAttempt = (
    testId: string,
    answers: Record<string, 'A' | 'B' | 'C' | 'D'>,
    timeSpentSeconds: number
  ): TestSubmission => {
    const test = tests.find((t) => t.id === testId);
    if (!test) throw new Error('Test not found');

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let rawScore = 0;
    let negativeScoreDeducted = 0;

    const topicMap: Record<string, { score: number; total: number }> = {};

    test.questions.forEach((q) => {
      const subject = q.subject || 'General Studies';
      if (!topicMap[subject]) {
        topicMap[subject] = { score: 0, total: 0 };
      }
      topicMap[subject].total += q.marks;

      const givenAnswer = answers[q.id];
      if (!givenAnswer) {
        unattemptedCount++;
      } else if (givenAnswer === q.correctAnswer) {
        correctCount++;
        rawScore += q.marks;
        topicMap[subject].score += q.marks;
      } else {
        incorrectCount++;
        negativeScoreDeducted += q.negativeMarks;
        topicMap[subject].score = Math.max(0, topicMap[subject].score - q.negativeMarks);
      }
    });

    const netScore = Math.max(0, parseFloat((rawScore - negativeScoreDeducted).toFixed(2)));
    const percentage = parseFloat(((netScore / test.totalMarks) * 100).toFixed(1));
    const totalParticipants = 425;
    // Percentile estimation based on score distribution
    const percentile = Math.min(99.8, Math.max(45.0, parseFloat((50 + (percentage / 100) * 49).toFixed(1))));
    const rank = Math.max(1, Math.floor((1 - percentile / 100) * totalParticipants));

    const topicScores = Object.keys(topicMap).map((topic) => ({
      topic,
      score: parseFloat(topicMap[topic].score.toFixed(2)),
      total: topicMap[topic].total
    }));

    const submission: TestSubmission = {
      id: `sub_${Date.now()}`,
      testId,
      testTitle: test.title,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentRoll: currentUser.rollNumber || 'CA-CG-1042',
      submittedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timeSpentSeconds,
      answers,
      totalAttempted: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      rawScore,
      negativeScoreDeducted: parseFloat(negativeScoreDeducted.toFixed(2)),
      netScore,
      percentage,
      percentile,
      rank,
      totalParticipants,
      topicScores
    };

    setSubmissions((prev) => [submission, ...prev]);

    // Update student performance record dynamically
    setPerformance((prev) => {
      const updatedProgress = [
        ...prev.recentTestProgress,
        {
          testName: test.title.length > 25 ? test.title.slice(0, 23) + '...' : test.title,
          date: 'Today',
          score: netScore,
          maxScore: test.totalMarks,
          rank
        }
      ].slice(-6);

      return {
        ...prev,
        testsGiven: prev.testsGiven + 1,
        averageScorePercent: parseFloat(
          ((prev.averageScorePercent * prev.testsGiven + percentage) / (prev.testsGiven + 1)).toFixed(1)
        ),
        currentRank: rank,
        recentTestProgress: updatedProgress
      };
    });

    showToast(`Test evaluated! Net Score: ${netScore}/${test.totalMarks} (${percentage}%)`);
    return submission;
  };

  // Real-time Chat
  const sendChatMessage = (
    content: string,
    channelId = 'channel_cgpsc',
    recipientId?: string,
    tag?: string
  ) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      channelId: recipientId ? undefined : channelId,
      recipientId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content,
      timestamp: 'Just now',
      tag
    };

    setChats((prev) => [...prev, newMsg]);

    // If student asked a doubt or message in channel or direct to teacher, simulate prompt faculty mentor reply
    if (currentUser.role === 'student' && (tag === 'Doubt' || content.includes('?') || recipientId)) {
      setTimeout(() => {
        const facultyReply: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          channelId: recipientId ? undefined : channelId,
          recipientId: recipientId ? currentUser.id : undefined,
          senderId: 'usr_teacher_01',
          senderName: 'Er. Rajesh Chandra (Director)',
          senderRole: 'teacher',
          senderAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
          content: `Hello Anjali, good question! In competitive exams like CGPSC/Vyapam, remember to refer to the authentic Government gazette and state economic survey 2025-26. We will also dissect this in tomorrow's 7:30 AM class at GC Tower. Keep going!`,
          timestamp: 'Just now'
        };
        setChats((prev) => [...prev, facultyReply]);
        showToast('New message from Er. Rajesh Chandra (Director)');
      }, 1600);
    }
  };

  // Online Enrollment Application
  const submitEnrollmentApplication = (
    data: Omit<EnrollmentApplication, 'id' | 'appliedDate' | 'applicationStatus'>
  ): string => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const appId = `CA-2026-${randomCode}`;
    const newApp: EnrollmentApplication = {
      ...data,
      id: appId,
      appliedDate: new Date().toISOString().split('T')[0],
      applicationStatus: 'Under Review',
      adminNotes: 'Application received online. Ready for counseling verification at GC Tower.'
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application ${appId} submitted successfully!`);
    return appId;
  };

  const updateApplicationStatus = (
    id: string,
    status: EnrollmentApplication['applicationStatus'],
    adminNotes?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const roll =
            status === 'Approved' || status === 'Seat Allocated'
              ? app.rollNumberAssigned || `CA-2026-${Math.floor(100 + Math.random() * 900)}`
              : app.rollNumberAssigned;
          return {
            ...app,
            applicationStatus: status,
            rollNumberAssigned: roll,
            adminNotes: adminNotes || app.adminNotes
          };
        }
        return app;
      })
    );
    showToast(`Application ${id} status updated to "${status}"`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        activeNav,
        setActiveNav,
        schedule,
        addScheduleSession,
        tests,
        addTest,
        submissions,
        activeTestId,
        setActiveTestId,
        submitTestAttempt,
        chats,
        sendChatMessage,
        applications,
        submitEnrollmentApplication,
        updateApplicationStatus,
        performance,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
