import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Hash,
  User,
  Search,
  Paperclip,
  Sparkles,
  HelpCircle,
  FileText,
  CheckCheck,
  BellRing
} from 'lucide-react';

export const MessagingCenter: React.FC = () => {
  const { chats, sendChatMessage, currentUser, role } = useApp();
  const [activeChannel, setActiveChannel] = useState<string>('channel_cgpsc');
  const [directRecipient, setDirectRecipient] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isDoubt, setIsDoubt] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const channels = [
    {
      id: 'channel_cgpsc',
      name: 'cgpsc-prelims-mentorship',
      desc: 'Syllabus doubts & daily answer writing review',
      count: 24
    },
    {
      id: 'channel_shikshak',
      name: 'shikshak-bharti-pedagogy',
      desc: 'Child Development, Teaching Methods & Vyapam',
      count: 18
    },
    {
      id: 'channel_upsc',
      name: 'upsc-civil-services',
      desc: 'National GS, Editorial discussions & Ethics',
      count: 12
    },
    {
      id: 'channel_notices',
      name: 'announcements-gc-tower',
      desc: 'Official classroom & test series notifications',
      count: 5
    }
  ];

  const facultyContacts = [
    {
      id: 'usr_teacher_01',
      name: 'Er. Rajesh Chandra',
      role: 'Director & Chief Mentor',
      avatar: '/src/assets/images/faculty_director_chandra_1790863108678.jpg',
      status: 'Online'
    },
    {
      id: 'usr_teacher_02',
      name: 'Dr. Kavita Verma',
      role: 'Child Pedagogy Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'Active 10m ago'
    },
    {
      id: 'usr_admin_01',
      name: 'Academic Desk (GC Tower)',
      role: 'Admissions & Hall Allocation',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      status: 'Office Open'
    }
  ];

  const filteredMessages = chats.filter((msg) => {
    let matchTarget = false;
    if (directRecipient) {
      matchTarget =
        (msg.recipientId === directRecipient && msg.senderId === currentUser.id) ||
        (msg.recipientId === currentUser.id && msg.senderId === directRecipient);
    } else {
      matchTarget = msg.channelId === activeChannel;
    }

    if (!matchTarget) return false;
    if (!searchQuery.trim()) return true;
    return (
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(
      inputText.trim(),
      directRecipient ? undefined : activeChannel,
      directRecipient || undefined,
      isDoubt ? 'Doubt' : undefined
    );

    setInputText('');
    setIsDoubt(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setIsDoubt(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
          Direct Faculty Communication
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Real-Time Messaging & Doubts Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Instant academic discussions between Chandra Academy faculty, mentors, and registered aspirants.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Sidebar: Channels & Contacts */}
        <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-6 bg-slate-50/50 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Channels List */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-2">
                Batch Channels
              </span>
              <div className="space-y-1">
                {channels.map((chan) => (
                  <button
                    key={chan.id}
                    onClick={() => {
                      setActiveChannel(chan.id);
                      setDirectRecipient(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      !directRecipient && activeChannel === chan.id
                        ? 'bg-amber-100/70 text-amber-950 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{chan.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct 1-on-1 Faculty Mentorship */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-2">
                Direct Faculty Mentors
              </span>
              <div className="space-y-1">
                {facultyContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      setDirectRecipient(contact.id);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2.5 ${
                      directRecipient === contact.id
                        ? 'bg-amber-100/70 text-amber-950 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white" />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-slate-900 truncate">{contact.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{contact.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200/60 text-[11px] text-amber-900">
            <p className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Instant Doubt Response</span>
            </p>
            <p className="text-amber-800/90 mt-0.5">
              Tag any inquiry with "Doubt" to get immediate guidance from faculty mentors.
            </p>
          </div>
        </div>

        {/* Right Main Chat Thread */}
        <div className="md:col-span-8 flex flex-col justify-between h-[600px] bg-white">
          {/* Thread Header */}
          <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/40">
            <div className="flex items-center gap-2">
              {directRecipient ? (
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Direct Mentor Consultation: {facultyContacts.find((c) => c.id === directRecipient)?.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">Private one-on-one session</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-amber-600" />
                    {channels.find((c) => c.id === activeChannel)?.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {channels.find((c) => c.id === activeChannel)?.desc}
                  </p>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time connected</span>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-300" />
                <p className="text-xs">No messages in this channel yet.</p>
                <p className="text-[11px] text-slate-400">Post a doubt or syllabus query below.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const isTeacher = msg.senderRole === 'teacher';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                  >
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className={`max-w-[78%] space-y-1 ${isMe ? 'items-end' : ''}`}>
                      <div className={`flex items-center gap-2 text-[11px] ${isMe ? 'justify-end' : ''}`}>
                        <span className="font-semibold text-slate-900">{msg.senderName}</span>
                        {isTeacher && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                            Faculty Mentor
                          </span>
                        )}
                        <span className="text-slate-400 tabular-nums">{msg.timestamp}</span>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-amber-600 text-white rounded-tr-none'
                            : isTeacher
                            ? 'bg-slate-900 text-slate-100 rounded-tl-none'
                            : 'bg-slate-100 text-slate-800 rounded-tl-none'
                        }`}
                      >
                        {msg.tag && (
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded ${
                              isMe ? 'bg-amber-700 text-amber-200' : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {msg.tag}
                          </span>
                        )}
                        <p>{msg.content}</p>

                        {msg.attachment && (
                          <div
                            className={`mt-2.5 p-2 rounded-lg flex items-center justify-between text-xs ${
                              isMe
                                ? 'bg-amber-700 text-white'
                                : 'bg-slate-800 border border-slate-700 text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-amber-400" />
                              <span className="font-medium truncate">{msg.attachment.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">{msg.attachment.size}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Doubt Prompts for Students */}
          {role === 'student' && (
            <div className="px-5 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Quick Queries:
              </span>
              <button
                onClick={() =>
                  handleQuickQuestion(
                    'Respected Sir, could you clarify the difference between PESA 1996 and 73rd Amendment powers in Bastar?'
                  )
                }
                className="px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 hover:border-amber-400 whitespace-nowrap"
              >
                PESA vs 73rd Amendment in Bastar?
              </button>
              <button
                onClick={() =>
                  handleQuickQuestion(
                    'Ma’am, in Shikshak Bharti, what is the weightage of Piaget vs Vygotsky theories?'
                  )
                }
                className="px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 hover:border-amber-400 whitespace-nowrap"
              >
                Shikshak Bharti: Piaget vs Vygotsky?
              </button>
            </div>
          )}

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDoubt(!isDoubt)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                    isDoubt
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Tag as Academic Doubt</span>
                </button>
              </div>
              <span className="text-[11px] text-slate-400">Press Enter to dispatch message</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isDoubt
                    ? 'Type your exam doubt or question for faculty...'
                    : 'Type a message to batch or mentor...'
                }
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <button
                type="submit"
                className="p-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
