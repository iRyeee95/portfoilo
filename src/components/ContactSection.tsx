import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../types';
import { Mail, CheckCircle2, DollarSign, Database, Trash2, Calendar, FileSpreadsheet } from 'lucide-react';

export default function ContactSection() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: 8500,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showAdminInbox, setShowAdminInbox] = useState(false);

  // Load message store on boot
  useEffect(() => {
    const historical = localStorage.getItem('designer_commissions_v1');
    if (historical) {
      try {
        setMessages(JSON.parse(historical));
      } catch (e) {
        console.error('Error loading designer contact archives', e);
      }
    }
  }, []);

  // Budget category complexity text generator
  const getComplexityHint = (budget: number) => {
    if (budget < 5000) {
      return 'Micro Layout Adjustment: Single high-intellect poster commission, typographically adjusted.';
    } else if (budget >= 5000 && budget < 12000) {
      return 'Classic Editorial Series: Complete stationery design guidelines, poster trilogy, and basic typography grids.';
    } else if (budget >= 12000 && budget < 22000) {
      return 'Comprehensive Brand System: Full geometric identity suite, responsive design grid specifications, and digital layout rules.';
    } else {
      return 'Global Brand Transformation: Enterprise artistic direction, multi-channel layouts, 3D motion artwork series, and front-end guidelines.';
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, budget: parseInt(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      budget: formData.budget,
      message: formData.message,
      timestamp: new Date().toLocaleString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('designer_commissions_v1', JSON.stringify(updated));

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: 8500,
      message: ''
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('designer_commissions_v1', JSON.stringify(filtered));
  };

  const totalProposedBudget = messages.reduce((sum, m) => sum + m.budget, 0);

  return (
    <div className="py-6 space-y-12" id="contact-view">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Information Panel: 4 Cols */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">PROJECT ARCHIVES INQUIRY //</span>
            <h3 className="font-sans text-2xl font-black text-neutral-900 leading-tight">
              Initiate a Meticulous Brand Partnership
            </h3>
          </div>

          <p className="text-sm font-sans text-neutral-500 leading-relaxed">
            I accept a strict quota of commissioned studio projects each quarter. I select partners who appreciate geometric rigor, high typographical precision, and absolute grid alignment.
          </p>

          <div className="space-y-3 font-mono text-xs text-neutral-600 border-t border-neutral-200 pt-6">
            <div>
              <span className="text-neutral-400 block uppercase">COMMUNICATION RADIAL:</span>
              <span className="text-neutral-900 font-semibold hover:underline cursor-pointer">xuziyi905@outlook.com</span>
            </div>
            <div>
              <span className="text-neutral-400 block uppercase">PHYSICAL OFFICE:</span>
              <span className="text-neutral-900 font-semibold">Beijing / Guangzhou / Shanghai, CN</span>
            </div>
          </div>

          {/* Admin inbox toggle button */}
          <div className="pt-4">
            <button
              onClick={() => setShowAdminInbox(!showAdminInbox)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono border border-dashed border-neutral-300 hover:border-neutral-950 text-neutral-600 hover:text-neutral-900 rounded-lg transition-colors cursor-pointer"
            >
              <Database className="h-4 w-4" />
              <span>{showAdminInbox ? 'HIDE COURIER INBOX' : 'VIEW RECEIVED INBOX'} ({messages.length})</span>
            </button>
          </div>
        </div>

        {/* Right Form Panel: 8 Cols */}
        <div className="lg:col-span-8 bg-neutral-50 p-6 sm:p-8 rounded-xl border border-neutral-200">
          <form onSubmit={handleSubmit} className="space-y-6" id="commission-proposal-form">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 block font-semibold uppercase">
                  PARTNER NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  className="w-full text-xs font-sans bg-white border border-neutral-200 focus:border-neutral-400 focus:outline-hidden px-3 py-2.5 rounded-lg text-neutral-900 shadow-2xs"
                  placeholder="e.g. Erik Gustafsson"
                  required
                />
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 block font-semibold uppercase">
                  DIGITAL MAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleTextChange}
                  className="w-full text-xs font-sans bg-white border border-neutral-200 focus:border-neutral-400 focus:outline-hidden px-3 py-2.5 rounded-lg text-neutral-900 shadow-2xs"
                  placeholder="e.g. erik@museum.se"
                  required
                />
              </div>
            </div>

            {/* Corporate field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-500 block font-semibold uppercase">
                INSTITUTION / COMPANY <span className="text-neutral-400 text-[10px] select-none">(OPTIONAL)</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleTextChange}
                className="w-full text-xs font-sans bg-white border border-neutral-200 focus:border-neutral-400 focus:outline-hidden px-3 py-2.5 rounded-lg text-neutral-900 shadow-2xs"
                placeholder="e.g. Stockholm Art Center"
              />
            </div>

            {/* Projected Budget slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-neutral-500 font-semibold uppercase">PROJECTED COMMISSION BUDGET:</span>
                <span className="text-neutral-900 font-bold bg-neutral-900 text-white px-2 py-0.5 rounded flex items-center select-none">
                  <DollarSign className="h-3.5 w-3.5" /> {formData.budget.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="2500"
                max="35000"
                step="500"
                value={formData.budget}
                onChange={handleBudgetChange}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
              />
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="text-[10px] font-mono text-neutral-400 block mb-0.5 select-none uppercase">WORKLOAD RANGE SPECIFICATION:</span>
                <p className="text-xs font-mono text-neutral-700 leading-normal">
                  {getComplexityHint(formData.budget)}
                </p>
              </div>
            </div>

            {/* Narrative message brief */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-500 block font-semibold uppercase">
                NARRATIVE BRIEF MEMO
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleTextChange}
                rows={4}
                className="w-full text-xs font-sans bg-white border border-neutral-200 focus:border-neutral-400 focus:outline-hidden p-3 rounded-lg text-neutral-900 shadow-2xs"
                placeholder="Detail your space parameters, challenges, and stylistic boundaries..."
              />
            </div>

            {/* Send button and dynamic report outputs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[10px] font-mono text-neutral-400 select-none">
                * Stored directly inside system sandbox local partition.
              </span>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                <span>DISPATCH FORMULA TO ARCHIVE</span>
              </button>
            </div>

            {/* Submitted notices */}
            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold font-mono block">COMMISSION SAVED SUCCESSFULLY!</span>
                  <span className="font-sans">The proposal has been synced to local persistence storage database. Click 'VIEW RECEIVED INBOX' to preview.</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Admin Panel Console details */}
      {showAdminInbox && (
        <div className="bg-neutral-950 text-neutral-200 p-6 rounded-xl border border-neutral-800 space-y-6" id="admin-inbox-console">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
                <Database className="h-4 w-4" />
                <span>// LOCAL SECURE COURIER ARCHIVE</span>
              </div>
              <h4 className="font-sans text-lg font-bold text-white mt-1">Client Inquiries Admin Register</h4>
            </div>

            {/* KPI display */}
            <div className="flex gap-4 text-xs font-mono">
              <div className="bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 text-right">
                <span className="text-neutral-500 block text-[9px] uppercase">TOTAL ESTIMATED PIPELINE:</span>
                <span className="text-emerald-400 font-bold">${totalProposedBudget.toLocaleString()} USD</span>
              </div>
              <div className="bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 text-right">
                <span className="text-neutral-500 block text-[9px] uppercase">QUERY COUNT:</span>
                <span className="text-white font-bold">{messages.length} ARCHIVES</span>
              </div>
            </div>
          </div>

          {/* Submissions checklist */}
          {messages.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 font-mono text-xs border border-dashed border-neutral-800 rounded-lg">
              NO CLIENT INQUIRIES LOGS LOGGED INSIDE LOCAL STORAGE REGISTER YET. WRITE A COURIER MESSAGE ABOVE.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-3 font-mono text-[11px] hover:border-neutral-700 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xs">{message.name}</span>
                        {message.company && (
                          <span className="text-neutral-500 font-normal">@ {message.company}</span>
                        )}
                      </div>
                      <span className="text-neutral-400 hover:underline">{message.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-amber-300 font-bold outline-1 outline-amber-900 bg-amber-950 px-2 py-0.5 rounded text-[10px]">
                        ${message.budget.toLocaleString()} USD
                      </span>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-neutral-500 hover:text-red-400 p-1.5 hover:bg-neutral-850 rounded transition-all duration-150"
                        title="Delete inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-neutral-300 font-sans leading-relaxed text-xs p-3 bg-neutral-950 rounded border border-neutral-850">
                    {message.message || 'No narrative detail content provided.'}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> REC: {message.timestamp}
                    </span>
                    <span className="text-neutral-600 font-mono">ID: {message.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
