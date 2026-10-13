import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    facility: '',
    email: '',
    phone: '',
    department: 'dispatch@medvelocourier.com',
    message: '',
  });

  const departmentEmails = [
    {
      id: 'dispatch',
      name: 'Dispatch & Operations',
      email: 'dispatch@medvelocourier.com',
      badge: 'Urgent / STAT',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Active courier dispatches, live STAT route expediting, chain-of-custody tracking',
    },
    {
      id: 'billing',
      name: 'Billing & Accounting',
      email: 'billing@medvelocourier.com',
      badge: 'Accounts',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Invoices, facility contract terms, billing questions & BAA verification',
    },
    {
      id: 'info',
      name: 'General Inquiries',
      email: 'info@medvelocourier.com',
      badge: 'Client Care',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      description: 'New clinic onboarding, routine questions, and general customer support',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({
        name: '',
        facility: '',
        email: '',
        phone: '',
        department: 'dispatch@medvelocourier.com',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-sky-600" />
            <span>Dedicated Oklahoma Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Contact MedVelo
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Direct communication channels for Oklahoma healthcare providers. Reach our dispatch desk, billing department, or general support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Card Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                  Direct Dispatch Hub
                </span>
                <h3 className="text-2xl font-black text-white font-display">
                  Oklahoma City Operations
                </h3>
                <p className="text-xs text-slate-300">
                  Real-time clinical courier coordination, cold-chain transport, and STAT emergency delivery routing.
                </p>
              </div>

              {/* Phone / Hotline */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">STAT Hotline & Phone</span>
                    <a
                      id="contact-phone-link"
                      href="tel:4056379609"
                      className="text-lg font-bold text-white hover:text-emerald-300 transition-colors font-mono"
                    >
                      (405) 637-9609
                    </a>
                    <span className="block text-[11px] text-emerald-400 font-semibold mt-0.5">
                      Available 24/7 for urgent healthcare dispatches
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Departmental Email Directory */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                  Department Email Directory
                </span>

                {/* Dispatch Email */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-sky-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      Dispatch & Operations
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold font-mono">
                      STAT / Live Runs
                    </span>
                  </div>
                  <a
                    id="contact-email-dispatch"
                    href="mailto:dispatch@medvelocourier.com"
                    className="text-sm font-bold text-white hover:text-sky-300 transition-colors font-mono block"
                  >
                    dispatch@medvelocourier.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Pickup requests, urgent specimen routing & live driver status.
                  </p>
                </div>

                {/* Billing Email */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      Billing & Accounts
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold font-mono">
                      Accounting
                    </span>
                  </div>
                  <a
                    id="contact-email-billing"
                    href="mailto:billing@medvelocourier.com"
                    className="text-sm font-bold text-white hover:text-amber-300 transition-colors font-mono block"
                  >
                    billing@medvelocourier.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Invoices, facility accounts, payment terms & BAA records.
                  </p>
                </div>

                {/* General Info Email */}
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      General Inquiries
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold font-mono">
                      Client Support
                    </span>
                  </div>
                  <a
                    id="contact-email-info"
                    href="mailto:info@medvelocourier.com"
                    className="text-sm font-bold text-white hover:text-indigo-300 transition-colors font-mono block"
                  >
                    info@medvelocourier.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">
                    General questions, practice onboarding & courier services overview.
                  </p>
                </div>
              </div>

              {/* Service Details Footer */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                {/* Website */}
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Official Website</span>
                    <a
                      href="https://medvelocourier.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:text-teal-300 font-mono"
                    >
                      MedVeloCourier.com
                    </a>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Service Area</span>
                    <span className="font-semibold text-white">Oklahoma City & surrounding regions</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      OKC Metro, Edmond, Norman, Moore, Yukon, Midwest City & statewide medical transfer corridors.
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Business Hours</span>
                    <span className="font-semibold text-white">Mon–Fri: 7 AM – 7 PM</span>
                    <span className="block text-[11px] font-semibold text-amber-400">
                      (STAT courier dispatch active 24/7/365)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sky-600" />
                <span>Send Our Team a Direct Message</span>
              </h3>
              <p className="text-xs text-slate-600">
                Choose the department you need to reach and our Oklahoma medical logistics staff will respond promptly.
              </p>
            </div>

            {sent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Dispatched</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for contacting MedVelo. Your message has been routed to{' '}
                  <span className="font-mono font-bold text-slate-900">{form.department}</span>.
                  A coordinator will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Department Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Route Message to Department
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {departmentEmails.map((dept) => {
                      const isSelected = form.department === dept.email;
                      return (
                        <button
                          key={dept.id}
                          type="button"
                          onClick={() => setForm({ ...form, department: dept.email })}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-600/20'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{dept.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-sky-700 font-semibold block truncate">
                            {dept.email}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contactName" className="block text-xs font-bold text-slate-700">
                      Your Name
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      required
                      placeholder="Dr. / Nurse / Administrator"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contactFacility" className="block text-xs font-bold text-slate-700">
                      Facility / Practice
                    </label>
                    <input
                      id="contactFacility"
                      type="text"
                      required
                      placeholder="Hospital, Clinic, or Lab Name"
                      value={form.facility}
                      onChange={(e) => setForm({ ...form, facility: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contactEmail" className="block text-xs font-bold text-slate-700">
                      Work Email
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      required
                      placeholder="name@facility.org"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contactPhone" className="block text-xs font-bold text-slate-700">
                      Phone Number
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      placeholder="(405) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contactMessage" className="block text-xs font-bold text-slate-700">
                      How can we support your facility?
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Routing to: <span className="font-mono font-semibold text-sky-700">{form.department}</span>
                    </span>
                  </div>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    required
                    placeholder="Provide details regarding your medical transport volume, route frequency, billing inquiry, or specific handling requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-slate-500">
                    Confidential medical courier coordination · HIPAA secure.
                  </span>
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to {form.department.split('@')[0]}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
