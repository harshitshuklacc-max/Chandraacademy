import {
  UserProfile,
  ScheduleSession,
  ExamTest,
  TestSubmission,
  ChatMessage,
  EnrollmentApplication,
  PerformanceMetric
} from '../types';

export const ACADEMY_INFO = {
  name: 'CHANDRA ACADEMY',
  rating: 4.4,
  reviewCount: 160,
  tagline: 'Premier Coaching Institute for CGPSC, UPSC & CG Shikshak Bharti',
  address: 'GC tower, Rajiv Gandhi Chowk, Juna, Chhattisgarh 495001',
  phone: '074770 64984',
  hours: 'Open · Closes 8:30 PM',
  establishedYear: '2016',
  stats: {
    selectionsCount: '1,240+',
    activeStudents: '850+',
    mockTestsConducted: '450+',
    experiencedFaculty: '18+'
  }
};

export const MOCK_USERS: Record<string, UserProfile> = {
  student: {
    id: 'usr_student_01',
    name: 'Anjali Sahu',
    role: 'student',
    email: 'anjali.sahu@cgpsc-aspirants.in',
    phone: '98261 45012',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    batch: 'CGPSC Prelims & Mains Target 2026-27 (Batch Alpha)',
    rollNumber: 'CA-CG-1042',
    targetExam: 'CGPSC'
  },
  teacher: {
    id: 'usr_teacher_01',
    name: 'Er. Rajesh Chandra',
    role: 'teacher',
    email: 'director@chandraacademy.org',
    phone: '074770 64984',
    avatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    designation: 'Director & Chief Faculty (Indian Polity & CG Special)',
    batch: 'All CGPSC & UPSC Batches'
  },
  admin: {
    id: 'usr_admin_01',
    name: 'Academic Desk (GC Tower)',
    role: 'admin',
    email: 'admission@chandraacademy.org',
    phone: '074770 64984',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    designation: 'Head of Admissions & Examination Office'
  }
};

export const MOCK_SCHEDULE: ScheduleSession[] = [
  {
    id: 'sch_01',
    title: 'Chhattisgarh History & Tribal Administration',
    courseCategory: 'CGPSC',
    batchName: 'CGPSC Morning Master Batch',
    facultyName: 'Er. Rajesh Chandra',
    facultyRole: 'Chief Mentor',
    facultyAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    startTime: '07:30 AM',
    endTime: '09:30 AM',
    room: 'Hall 201, GC Tower, Juna',
    mode: 'Offline Classroom',
    topic: 'Kalchuri Dynasty of Ratanpur & Raipur branch administrative hierarchy',
    syllabusModule: 'Paper I (CG General Knowledge)',
    notesPdfUrl: 'cg-kalchuri-administration-notes.pdf',
    status: 'Upcoming'
  },
  {
    id: 'sch_02',
    title: 'Child Development & Pedagogy (बाल विकास एवं शिक्षाशास्त्र)',
    courseCategory: 'CG_SHIKSHAK_BHARTI',
    batchName: 'CG Shikshak Bharti Special Batch',
    facultyName: 'Dr. Kavita Verma',
    facultyRole: 'Lead Pedagogy Educator (Gold Medalist M.Ed)',
    facultyAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    room: 'Smart Classroom 104, GC Tower',
    mode: 'Hybrid',
    topic: 'Piaget, Vygotsky & Kohlberg Theories with Classroom Application Questions',
    syllabusModule: 'Pedagogy & Educational Psychology (30 Marks)',
    notesPdfUrl: 'vyapam-pedagogy-theories.pdf',
    liveLink: 'https://meet.chandraacademy.org/room/shikshak-pedagogy-live',
    status: 'Upcoming'
  },
  {
    id: 'sch_03',
    title: 'Indian Polity & Constitutional Amendments',
    courseCategory: 'UPSC',
    batchName: 'UPSC GS Foundation 2027',
    facultyName: 'Er. Rajesh Chandra',
    facultyRole: 'Chief Mentor',
    facultyAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    room: 'Seminar Hall, 2nd Floor GC Tower',
    mode: 'Offline Classroom',
    topic: 'Federal Structure, 73rd/74th Constitutional Amendment & PESA Act implementation',
    syllabusModule: 'GS Paper II (Governance & Constitution)',
    notesPdfUrl: 'upsc-polity-pesa-federalism.pdf',
    status: 'Upcoming'
  },
  {
    id: 'sch_04',
    title: 'Chhattisgarh Geography & Drainage System (महानदी अपवाह तंत्र)',
    courseCategory: 'CGPSC',
    batchName: 'CGPSC Evening Batch',
    facultyName: 'Prof. Amit Patel',
    facultyRole: 'Geography & State Environment Faculty',
    facultyAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    startTime: '05:30 PM',
    endTime: '07:30 PM',
    room: 'Hall 201, GC Tower, Juna',
    mode: 'Hybrid',
    topic: 'Mahanadi, Shivnath, Hasdeo and Indravati River basin irrigation projects & dams',
    syllabusModule: 'Paper I (CG Physical Geography)',
    notesPdfUrl: 'cg-rivers-drainage-atlas.pdf',
    liveLink: 'https://meet.chandraacademy.org/room/cg-geography-evening',
    status: 'Upcoming'
  },
  {
    id: 'sch_05',
    title: 'CGPSC Mains Answer Writing & Analytical Evaluation',
    courseCategory: 'CGPSC',
    batchName: 'CGPSC Mains Intensive Test Series',
    facultyName: 'Er. Rajesh Chandra',
    facultyRole: 'Chief Mentor',
    facultyAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    date: '2026-10-03',
    dayOfWeek: 'Saturday',
    startTime: '08:00 AM',
    endTime: '11:00 AM',
    room: 'Hall 302, Examination Wing',
    mode: 'Offline Classroom',
    topic: 'Weekly 15-mark and 8-mark question structured framing on CG socio-economic reforms',
    syllabusModule: 'Mains Paper V & VI',
    notesPdfUrl: 'mains-model-answers-oct.pdf',
    status: 'Upcoming'
  }
];

export const MOCK_TESTS: ExamTest[] = [
  {
    id: 'test_cgpsc_01',
    title: 'CGPSC State Services Prelims Mock Test - Paper I (General Studies & CG Special)',
    examCategory: 'CGPSC',
    batchTarget: 'CGPSC All Batches',
    durationMinutes: 20, // 20 mins for demo practice test
    totalMarks: 20,
    totalQuestions: 10,
    passingMarks: 8,
    negativeMarkingScheme: '1/3rd Negative (-0.66 marks for each incorrect answer)',
    description: 'Bilingual test based on actual CGPSC Prelims pattern. Features Chhattisgarh history, polity, Panchayati Raj, geography, and current developments.',
    status: 'Active',
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        subject: 'Chhattisgarh History',
        questionText: 'Which Kalchuri ruler of Ratanpur established the famous Mahamaya Temple in Ratanpur in 1050 AD?',
        questionHindi: 'रतनपुर के किस कलचुरी शासक ने 1050 ई. में रतनपुर के प्रसिद्ध महामाया मंदिर का निर्माण कराया था?',
        options: [
          { key: 'A', text: 'Kalingaraja (कलिंगराज)' },
          { key: 'B', text: 'Ratnaraja I (रत्नदेव प्रथम)' },
          { key: 'C', text: 'Prithvideva I (पृथ्वीदेव प्रथम)' },
          { key: 'D', text: 'Jajalladeva I (जाजल्लदेव प्रथम)' }
        ],
        correctAnswer: 'B',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'Ratnaraja I (Ratnadeva I) shifted the Kalchuri capital from Tumman to Ratanpur around 1050 AD and constructed the legendary Mahamaya temple.',
        explanationHindi: 'रत्नदेव प्रथम ने तुम्माण से राजधानी रतनपुर स्थानांतरित की और 1050 ई. में ऐतिहासिक महामाया मंदिर की स्थापना की।'
      },
      {
        id: 'q2',
        questionNumber: 2,
        subject: 'Chhattisgarh Panchayati Raj',
        questionText: 'Under the Chhattisgarh Panchayati Raj Act 1993, what is the quorum required for a Gram Sabha meeting in Scheduled areas?',
        questionHindi: 'छत्तीसगढ़ पंचायती राज अधिनियम 1993 के तहत, अनुसूचित क्षेत्रों में ग्राम सभा की बैठक हेतु आवश्यक गणपूर्ति (कोरम) क्या है?',
        options: [
          { key: 'A', text: '1/10th of total members with 1/3rd women' },
          { key: 'B', text: '1/3rd of total members with at least 1/3rd women' },
          { key: 'C', text: '1/5th of total members with 50% women' },
          { key: 'D', text: '1/2 of total members with 25% women' }
        ],
        correctAnswer: 'B',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'In Scheduled Areas of Chhattisgarh (PESA implementation), the quorum for Gram Sabha is 1/3rd of total members, of which at least one-third must be women.',
        explanationHindi: 'छत्तीसगढ़ के अनुसूचित (पेसा) क्षेत्रों में ग्राम सभा की बैठक के लिए कुल सदस्यों का 1/3 गणपूर्ति अनिवार्य है जिसमें 1/3 महिला सदस्य होनी चाहिए।'
      },
      {
        id: 'q3',
        questionNumber: 3,
        subject: 'Indian Constitution & Polity',
        questionText: 'Under which Article of the Constitution of India can a High Court issue writs for enforcement of Fundamental Rights as well as other legal rights?',
        questionHindi: 'भारतीय संविधान के किस अनुच्छेद के तहत उच्च न्यायालय मौलिक अधिकारों के साथ-साथ अन्य विधिक अधिकारों के प्रवर्तन के लिए रिट जारी कर सकता है?',
        options: [
          { key: 'A', text: 'Article 32' },
          { key: 'B', text: 'Article 136' },
          { key: 'C', text: 'Article 226' },
          { key: 'D', text: 'Article 227' }
        ],
        correctAnswer: 'C',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'Article 226 empowers High Courts (like the High Court of Chhattisgarh at Bilaspur) to issue writs for both Fundamental Rights and any other legal purpose.',
        explanationHindi: 'अनुच्छेद 226 के तहत उच्च न्यायालय को मौलिक अधिकारों तथा अन्य विधिक अधिकारों दोनों के लिए रिट जारी करने की व्यापक शक्ति प्राप्त है।'
      },
      {
        id: 'q4',
        questionNumber: 4,
        subject: 'Chhattisgarh Geography',
        questionText: 'What is the highest mountain peak of Chhattisgarh, located in the Bailadila mountain range?',
        questionHindi: 'छत्तीसगढ़ की सबसे ऊंची पर्वत चोटी कौन सी है, जो बैलाडीला पर्वत श्रृंखला में स्थित है?',
        options: [
          { key: 'A', text: 'Gaur Lata (गौर लाटा - सामरी पाट)' },
          { key: 'B', text: 'Nandiraj (नंदीराज - दंतेवाड़ा)' },
          { key: 'C', text: 'Devgarh (देवगढ़ - कोरिया)' },
          { key: 'D', text: 'Pendrapat (पेन्ड्रापाट)' }
        ],
        correctAnswer: 'A',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'Gaur Lata in Samri Pat (Balrampur) is the highest peak of CG at 1225 meters. (Nandiraj in Bailadila is the second highest at 1210 meters).',
        explanationHindi: 'छत्तीसगढ़ की सबसे ऊंची चोटी गौर लाटा (1225 मीटर) सामरी पाट, बलरामपुर जिले में स्थित है।'
      },
      {
        id: 'q5',
        questionNumber: 5,
        subject: 'Chhattisgarh Tribes & Culture',
        questionText: 'In which tribal community of Bastar is the traditional socio-cultural youth dormitory known as "Ghotul" found?',
        questionHindi: 'बस्तर के किस आदिवासी समुदाय में पारंपरिक युवा गृह "घोटुल" पाया जाता है?',
        options: [
          { key: 'A', text: 'Baiga (बैगा)' },
          { key: 'B', text: 'Muria (मुरिया गोंड)' },
          { key: 'C', text: 'Korwa (पहाड़ी कोरवा)' },
          { key: 'D', text: 'Kamar (कमर)' }
        ],
        correctAnswer: 'B',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'The Ghotul youth socio-cultural dormitory system is famously prevalent among the Muria tribe of Bastar, studied extensively by anthropologist Verrier Elwin.',
        explanationHindi: 'घोटुल युवा गृह बस्तर की मुरिया जनजाति में सामाजिक-सांस्कृतिक शिक्षा एवं परंपरा का प्रसिद्ध केंद्र है।'
      },
      {
        id: 'q6',
        questionNumber: 6,
        subject: 'Child Development & Pedagogy',
        questionText: 'According to Jean Piaget, during which stage does a child develop the concept of "Conservation" and reversible thinking?',
        questionHindi: 'जीन पियाजे के अनुसार, बच्चा किस अवस्था में "संरक्षण (Conservation)" और पलटावी (Reversibility) की अवधारणा विकसित करता है?',
        options: [
          { key: 'A', text: 'Sensorimotor Stage (संवेदी-गामक अवस्था: 0-2 वर्ष)' },
          { key: 'B', text: 'Pre-operational Stage (पूर्व-संक्रियात्मक अवस्था: 2-7 वर्ष)' },
          { key: 'C', text: 'Concrete Operational Stage (मूर्त संक्रियात्मक अवस्था: 7-11 वर्ष)' },
          { key: 'D', text: 'Formal Operational Stage (औपचारिक संक्रियात्मक अवस्था: 11+ वर्ष)' }
        ],
        correctAnswer: 'C',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'Concrete Operational Stage (7 to 11 years) is marked by the development of conservation, classification, seriation, and reversible cognitive operations.',
        explanationHindi: 'मूर्त संक्रियात्मक अवस्था (7 से 11 वर्ष) में बच्चा द्रव्यमान, आयतन और संख्या के संरक्षण तथा प्रतिवर्ती चिंतन में पारंगत होता है।'
      },
      {
        id: 'q7',
        questionNumber: 7,
        subject: 'Chhattisgarh Economy & Minerals',
        questionText: 'Which mineral is produced exclusively / primarily in commercial quantities in Chhattisgarh among Indian states?',
        questionHindi: 'भारत के राज्यों में कौन सा खनिज केवल/प्रमुख रूप से छत्तीसगढ़ में व्यावसायिक मात्रा में उत्पादित होता है?',
        options: [
          { key: 'A', text: 'Tin Ore / Cassiterite (टिन अयस्क)' },
          { key: 'B', text: 'Bauxite (बॉक्साइट)' },
          { key: 'C', text: 'Limestone (चूना पत्थर)' },
          { key: 'D', text: 'Iron Ore Hematite (लौह अयस्क)' }
        ],
        correctAnswer: 'A',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'Chhattisgarh (specifically Dantewada and Sukma districts) is the sole producing state of Tin Ore (Cassiterite) in India.',
        explanationHindi: 'भारत में टिन अयस्क (कैसिटराइट) का 100% उत्पादन करने वाला एकमात्र राज्य छत्तीसगढ़ (दंतेवाड़ा व सुकमा) है।'
      },
      {
        id: 'q8',
        questionNumber: 8,
        subject: 'Indian History & National Movement',
        questionText: 'Who was appointed the "Dictator" of Bilaspur during the Civil Disobedience Movement (सविनय अवज्ञा आंदोलन) in 1930?',
        questionHindi: '1930 में सविनय अवज्ञा आंदोलन के दौरान बिलासपुर का "डिक्टेटर" किसे नियुक्त किया गया था?',
        options: [
          { key: 'A', text: 'Pandit Sundarlal Sharma' },
          { key: 'B', text: 'Thakur Pyarelal Singh' },
          { key: 'C', text: 'Kranti Kumar Bhartiya' },
          { key: 'D', text: 'Chhedilal (Barrister Chhedilal)' }
        ],
        correctAnswer: 'C',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'During the 1930 Civil Disobedience Movement, Kranti Kumar Bhartiya was appointed as the Dictator of Bilaspur and famously hoisted the tricolor at the High School.',
        explanationHindi: '1930 में बिलासपुर में आंदोलन का नेतृत्व करने हेतु क्रांति कुमार भारतीय को प्रथम डिक्टेटर बनाया गया था।'
      },
      {
        id: 'q9',
        questionNumber: 9,
        subject: 'General Science & Environment',
        questionText: 'Which wetland of Chhattisgarh has been designated as the first Ramsar Site of the state in 2024-25?',
        questionHindi: 'छत्तीसगढ़ का कौन सा जलाशय राज्य का पहला रामसर स्थल (Ramsar Site) घोषित किया गया है?',
        options: [
          { key: 'A', text: 'Kopra Reservoir (कोपरा जलाशय)' },
          { key: 'B', text: 'Ratanpur Mahamaya Lake' },
          { key: 'C', text: 'Khutaghat Dam (संजय गांधी जलाशय)' },
          { key: 'D', text: 'Gangrel Dam (रविशंकर सागर)' }
        ],
        correctAnswer: 'A',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'Kopra Reservoir in Bilaspur district has been internationally recognized for its avian biodiversity and designated under the Ramsar wetland convention.',
        explanationHindi: 'बिलासपुर जिले का कोपरा जलाशय पक्षी जैव विविधता के लिए छत्तीसगढ़ का प्रमुख अंतरराष्ट्रीय रामसर वेटलैंड घोषित हुआ।'
      },
      {
        id: 'q10',
        questionNumber: 10,
        subject: 'Chhattisgarh Language & Grammar',
        questionText: 'In Chhattisgarhi grammar, what is the plural form of the word "लइका" (Laika - Child)?',
        questionHindi: 'छत्तीसगढ़ी व्याकरण में "लइका" (बालक/बच्चा) शब्द का बहुवचन रूप क्या होता है?',
        options: [
          { key: 'A', text: 'लइके (Laike)' },
          { key: 'B', text: 'लइका मन (Laika Man)' },
          { key: 'C', text: 'लइकाएं (Laikaen)' },
          { key: 'D', text: 'लइका सब (Laika Sab)' }
        ],
        correctAnswer: 'B',
        marks: 2,
        negativeMarks: 0.66,
        explanation: 'In Chhattisgarhi language, plural is typically formed by adding the suffix "मन" (Man), hence "लइका मन" or "मनखे मन".',
        explanationHindi: 'छत्तीसगढ़ी में बहुवचन बनाने हेतु संज्ञा के साथ "मन" प्रत्यय जोड़ा जाता है, जैसे लइका मन, टूरा मन, गाय मन।'
      }
    ]
  },
  {
    id: 'test_shikshak_01',
    title: 'CG Shikshak Bharti & Vyakhyata Pedagogy Comprehensive Test',
    examCategory: 'CG_SHIKSHAK_BHARTI',
    batchTarget: 'CG Shikshak Bharti Batch',
    durationMinutes: 20,
    totalMarks: 20,
    totalQuestions: 10,
    passingMarks: 9,
    negativeMarkingScheme: '1/4th Negative (-0.50 marks)',
    description: 'Designed specifically for CG School Education Department Teacher recruitment: Child Psychology, Inclusive Education, Teaching Methods & Evaluation.',
    status: 'Active',
    questions: [
      {
        id: 'sq1',
        questionNumber: 1,
        subject: 'Inclusive Education',
        questionText: 'Under the Right to Education (RTE) Act 2009, what is the mandated Pupil-Teacher Ratio (PTR) for primary schools (Classes I-V) up to 200 pupils?',
        questionHindi: 'शिक्षा का अधिकार अधिनियम (RTE) 2009 के तहत प्राथमिक विद्यालयों (कक्षा 1-5) के लिए निर्धारित शिक्षक-छात्र अनुपात क्या है?',
        options: [
          { key: 'A', text: '1 : 25' },
          { key: 'B', text: '1 : 30' },
          { key: 'C', text: '1 : 35' },
          { key: 'D', text: '1 : 40' }
        ],
        correctAnswer: 'B',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'Under RTE 2009, for primary classes (up to 200 students), the standard PTR is 1 teacher per 30 students (1:30).',
        explanationHindi: 'RTE अधिनियम 2009 के अनुसार प्राथमिक शालाओं में शिक्षक-छात्र अनुपात 1:30 निर्धारित है।'
      },
      {
        id: 'sq2',
        questionNumber: 2,
        subject: 'Child Development',
        questionText: 'Who coined the concept of "Zone of Proximal Development" (ZPD) and Scaffolding in educational psychology?',
        questionHindi: 'शिक्षा मनोविज्ञान में "समीपस्थ विकास का क्षेत्र (ZPD)" और पाड़/ढांचा (Scaffolding) की अवधारणा किसने दी?',
        options: [
          { key: 'A', text: 'Lev Vygotsky' },
          { key: 'B', text: 'B.F. Skinner' },
          { key: 'C', text: 'Jerome Bruner' },
          { key: 'D', text: 'Edward Thorndike' }
        ],
        correctAnswer: 'A',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'Lev Vygotsky introduced ZPD, explaining the distance between what a learner can do independently and what they can do with guided assistance.',
        explanationHindi: 'लेव वायगोत्स्की के सामाजिक-सांस्कृतिक सिद्धांत में ZPD तथा सहयोगी अधिगम का सिद्धांत प्रतिपादित किया गया।'
      }
    ]
  }
];

export const MOCK_SUBMISSIONS: TestSubmission[] = [
  {
    id: 'sub_001',
    testId: 'test_cgpsc_01',
    testTitle: 'CGPSC State Services Prelims Mock Test - Paper I',
    studentId: 'usr_student_01',
    studentName: 'Anjali Sahu',
    studentRoll: 'CA-CG-1042',
    submittedAt: '2026-09-28 11:32 AM',
    timeSpentSeconds: 840,
    answers: {
      q1: 'B',
      q2: 'B',
      q3: 'C',
      q4: 'A',
      q5: 'B',
      q6: 'C',
      q7: 'A',
      q8: 'C',
      q9: 'A',
      q10: 'A' // deliberate incorrect for realism
    },
    totalAttempted: 10,
    correctCount: 9,
    incorrectCount: 1,
    unattemptedCount: 0,
    rawScore: 18,
    negativeScoreDeducted: 0.66,
    netScore: 17.34,
    percentage: 86.7,
    percentile: 98.4,
    rank: 3,
    totalParticipants: 420,
    topicScores: [
      { topic: 'Chhattisgarh GK & History', score: 9.34, total: 10 },
      { topic: 'Indian Polity & Science', score: 6.0, total: 6 },
      { topic: 'Language & Grammar', score: 2.0, total: 4 }
    ]
  }
];

export const MOCK_CHATS: ChatMessage[] = [
  {
    id: 'msg_01',
    channelId: 'channel_cgpsc',
    senderId: 'usr_teacher_01',
    senderName: 'Er. Rajesh Chandra',
    senderRole: 'teacher',
    senderAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    content: 'Students, please review the 73rd Amendment and PESA special provisions for Surguja & Bastar divisions before tomorrow\'s 7:30 AM class at GC Tower.',
    timestamp: 'Today at 04:15 PM',
    tag: 'Important'
  },
  {
    id: 'msg_02',
    channelId: 'channel_cgpsc',
    senderId: 'usr_student_01',
    senderName: 'Anjali Sahu',
    senderRole: 'student',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'Respected Sir, will the PESA Gram Sabha powers over minor forest produce (MFP) be evaluated in the mock test this Saturday?',
    timestamp: 'Today at 04:32 PM',
    tag: 'Doubt'
  },
  {
    id: 'msg_03',
    channelId: 'channel_cgpsc',
    senderId: 'usr_teacher_01',
    senderName: 'Er. Rajesh Chandra',
    senderRole: 'teacher',
    senderAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    content: 'Yes Anjali! MFP ownership rights, mining lease consultation, and dispute resolution by traditional tribal councils are high-yield CGPSC questions.',
    timestamp: 'Today at 04:35 PM'
  },
  {
    id: 'msg_04',
    recipientId: 'usr_student_01',
    senderId: 'usr_teacher_01',
    senderName: 'Er. Rajesh Chandra',
    senderRole: 'teacher',
    senderAvatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
    content: 'Anjali, your score in Mock Test #4 was 17.34/20. Great precision in CG History! Focus slightly more on Chhattisgarhi grammar idioms.',
    timestamp: 'Yesterday at 06:10 PM'
  },
  {
    id: 'msg_05',
    channelId: 'channel_shikshak',
    senderId: 'usr_teacher_02',
    senderName: 'Dr. Kavita Verma',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'All Shikshak Bharti aspirants: The special pedagogy live practice worksheet for Piaget vs Vygotsky is now uploaded in the course timetable deck.',
    timestamp: 'Today at 02:00 PM',
    attachment: {
      name: 'Vyapam-Pedagogy-Practice-Set-04.pdf',
      type: 'pdf',
      size: '1.4 MB'
    }
  }
];

export const MOCK_APPLICATIONS: EnrollmentApplication[] = [
  {
    id: 'CA-2026-8910',
    appliedDate: '2026-09-29',
    fullName: 'Rameshwar Dewangan',
    fatherName: 'Late S. L. Dewangan',
    email: 'rameshwar.dew@gmail.com',
    phone: '94242 18903',
    gender: 'Male',
    category: 'OBC',
    district: 'Bilaspur',
    targetCourse: 'CGPSC',
    batchPreference: 'CGPSC Prelims + Mains Integrated Morning Batch',
    learningMode: 'Offline Classroom (GC Tower)',
    highestQualification: 'B.E. Mechanical Engineering (CSVTU)',
    paymentPlan: 'Lump Sum (10% Discount)',
    applicationStatus: 'Approved',
    rollNumberAssigned: 'CA-CG-1088',
    adminNotes: 'Interview cleared. Verified domicile of Bilaspur.'
  },
  {
    id: 'CA-2026-9142',
    appliedDate: '2026-09-30',
    fullName: 'Pooja Kashyap',
    fatherName: 'Dileep Kashyap',
    email: 'pooja.kashyap99@gmail.com',
    phone: '79998 41209',
    gender: 'Female',
    category: 'General',
    district: 'Janjgir-Champa',
    targetCourse: 'CG_SHIKSHAK_BHARTI',
    batchPreference: 'CG Shikshak Bharti Vyakhyata & Shikshak Batch',
    learningMode: 'Online Live & Recorded',
    highestQualification: 'M.Sc Mathematics + B.Ed',
    tetQualified: 'CG-TET Paper 2 Qualified',
    paymentPlan: '3 Easy Installments',
    applicationStatus: 'Seat Allocated',
    rollNumberAssigned: 'CA-SB-402',
    adminNotes: 'B.Ed & TET marksheet verified. Enrolled in online batch.'
  },
  {
    id: 'CA-2026-9285',
    appliedDate: '2026-10-01',
    fullName: 'Vikash Netam',
    fatherName: 'Manohar Netam',
    email: 'vikash.netam@rediffmail.com',
    phone: '91790 33418',
    gender: 'Male',
    category: 'ST',
    district: 'Bastar',
    targetCourse: 'CGPSC',
    batchPreference: 'CGPSC Foundation Integrated',
    learningMode: 'Offline Classroom (GC Tower)',
    highestQualification: 'B.A. Political Science (Bastar University)',
    paymentPlan: '3 Easy Installments',
    applicationStatus: 'Document Verified',
    adminNotes: 'Under hostel accommodation arrangement near Rajiv Gandhi Chowk.'
  },
  {
    id: 'CA-2026-9304',
    appliedDate: '2026-10-01',
    fullName: 'Shreya Agrawal',
    fatherName: 'Naveen Agrawal',
    email: 'shreya.agrawal2003@gmail.com',
    phone: '98271 90514',
    gender: 'Female',
    category: 'General',
    district: 'Raipur',
    targetCourse: 'UPSC',
    batchPreference: 'UPSC GS Prelims-cum-Mains 2027',
    learningMode: 'Hybrid',
    highestQualification: 'B.Com (Honors)',
    paymentPlan: 'Lump Sum (10% Discount)',
    applicationStatus: 'Under Review',
    adminNotes: 'Counseling scheduled with Director Er. Rajesh Chandra.'
  }
];

export const MOCK_PERFORMANCE: PerformanceMetric = {
  studentId: 'usr_student_01',
  studentName: 'Anjali Sahu',
  targetExam: 'CGPSC',
  batch: 'CGPSC Prelims & Mains Target 2026-27 (Batch Alpha)',
  attendancePercent: 94.2,
  totalClassesAttended: 49,
  totalClassesScheduled: 52,
  testsGiven: 8,
  averageScorePercent: 83.5,
  currentRank: 3,
  batchSize: 180,
  subjectMastery: [
    { subject: 'Chhattisgarh History & Culture', scorePercent: 88, trend: 'up' },
    { subject: 'Indian Polity & Governance', scorePercent: 84, trend: 'up' },
    { subject: 'Chhattisgarh Geography & Drainage', scorePercent: 82, trend: 'stable' },
    { subject: 'CG Economic Survey & Schemes', scorePercent: 91, trend: 'up' },
    { subject: 'Language (Hindi & Chhattisgarhi)', scorePercent: 71, trend: 'down' },
    { subject: 'CSAT (Mental Ability & Maths)', scorePercent: 76, trend: 'stable' }
  ],
  recentTestProgress: [
    { testName: 'Mock 1: Indian Polity Basics', date: 'Aug 10', score: 14.5, maxScore: 20, rank: 14 },
    { testName: 'Mock 2: CG History (Kalchuris)', date: 'Aug 24', score: 16.0, maxScore: 20, rank: 9 },
    { testName: 'Mock 3: Geography & Mineral Map', date: 'Sep 08', score: 15.6, maxScore: 20, rank: 8 },
    { testName: 'Mock 4: Panchayati Raj & PESA', date: 'Sep 22', score: 18.0, maxScore: 20, rank: 2 },
    { testName: 'Mock 5: CGPSC Full Length GS-1', date: 'Sep 28', score: 17.34, maxScore: 20, rank: 3 }
  ]
};
