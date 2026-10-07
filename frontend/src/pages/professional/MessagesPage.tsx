import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import { Send, Search, Building2, User, CheckCheck, Paperclip, ArrowLeft, MoreVertical } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();

  const contacts = [
    {
      id: 'conv_1',
      name: 'NovaCare Talent Acquisition',
      role: 'Hospital HR & Medical Recruitment',
      avatar: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&auto=format&fit=crop&q=80',
      lastMessage: 'We have scheduled your clinical interview for April 18 at 11 AM.',
      time: '2h ago',
      unread: 1,
      online: true
    },
    {
      id: 'conv_2',
      name: 'Dr. Vikram Malhotra (Medical Director)',
      role: 'Medisphere Hospitals',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=80',
      lastMessage: 'Looking forward to reviewing your catheterization case volume summary.',
      time: 'Yesterday',
      unread: 0,
      online: false
    }
  ];

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'them',
      text: 'Good afternoon Dr. Rao. The Medical Board reviewed your credentials for the Senior Interventional Cardiologist position.',
      time: '10:30 AM'
    },
    {
      id: 'm2',
      sender: 'me',
      text: 'Thank you for the update. I have reviewed the Cath lab infrastructure specifications.',
      time: '10:45 AM'
    },
    {
      id: 'm3',
      sender: 'them',
      text: 'We have scheduled your clinical interview for April 18 at 11 AM. The link is available in your dashboard.',
      time: '11:15 AM'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSelectContact = (c: typeof contacts[0]) => {
    setActiveContact(c);
    setShowMobileChat(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: input,
      time: 'Just now'
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="h-[78vh] sm:h-[75vh] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-subtle overflow-hidden flex flex-col md:flex-row">
      {/* Contact List (Hidden on mobile when chat is active) */}
      <div className={`w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-3.5 sm:p-4 border-b border-slate-200">
          <h2 className="font-bold text-sm text-[#1B5F85] mb-2">Hospital Conversations</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectContact(c)}
              className={`w-full p-3.5 sm:p-4 text-left flex items-start gap-3 transition cursor-pointer ${
                activeContact.id === c.id ? 'bg-[#E0F7F5]/70 border-l-4 border-[#2DC4B4]' : 'hover:bg-slate-100/60'
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={c.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
                  alt={c.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80';
                  }}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                />
                {c.online && (
                  <span className="w-2.5 h-2.5 bg-[#2DC4B4] border-2 border-white rounded-full absolute bottom-0 right-0" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-bold text-xs text-[#1B5F85] truncate">{c.name}</h4>
                  <span className="text-xs text-slate-400">{c.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread (Hidden on mobile when contact list is active) */}
      <div className={`flex-1 flex flex-col bg-white ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Top Header */}
        <div className="p-3 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Back Button */}
            <button
              onClick={() => setShowMobileChat(false)}
              className="md:hidden p-1.5 -ml-1 text-slate-600 hover:bg-slate-100 rounded-lg transition shrink-0 cursor-pointer"
              aria-label="Back to contacts"
            >
              <ArrowLeft className="w-5 h-5 text-[#1B5F85]" />
            </button>

            <img
              src={activeContact.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80'}
              alt={activeContact.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80';
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
            />
            <div className="min-w-0">
              <h3 className="font-extrabold text-xs sm:text-sm text-[#1B5F85] truncate">{activeContact.name}</h3>
              <p className="text-xs text-[#2DC4B4] font-semibold truncate">{activeContact.role}</p>
            </div>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4 bg-slate-50/40">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  m.sender === 'me'
                    ? 'bg-[#1B5F85] text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-normal'
                }`}
              >
                <p>{m.text}</p>
                <span className={`block text-xs mt-1 ${m.sender === 'me' ? 'text-slate-200 text-right' : 'text-slate-400'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-2.5 sm:p-4 border-t border-slate-200 flex items-center gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message to recruiter..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2DC4B4]"
          />
          <button
            type="submit"
            className="bg-[#2DC4B4] hover:bg-[#25ab9d] text-white p-2.5 sm:p-3 rounded-xl transition shrink-0 cursor-pointer shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
