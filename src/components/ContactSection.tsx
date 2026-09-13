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
    subject: 'General Logistics Inquiry',
    message: '',
  });

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
        subject: 'General Logistics Inquiry',
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
            We’re here to support your medical delivery needs. Speak directly with our Oklahoma dispatch
            desk or send us an inquiry.
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
                  Real-time clinical courier coordination and STAT emergency delivery routing.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-sm">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Phone / STAT Hotline</span>
                    <a
                      id="contact-phone-link"
                      href="tel:4056379609"
                      className="text-lg font-bold text-white hover:text-sky-300 transition-colors font-mono"
                    >
                      (405) 637-9609
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Email Inquiries</span>
                    <a
                      id="contact-email-link"
                      href="mailto:info@MedVeloCourier.com"
                      className="text-base font-semibold text-white hover:text-sky-300 transition-colors"
                    >
                      info@MedVeloCourier.com
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/30">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Official Website</span>
                    <span className="text-base font-semibold text-white font-mono">
                      MedVeloCourier.com
                    </span>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Service Area</span>
                    <span className="text-sm font-semibold text-white">
                      Oklahoma City & surrounding regions
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      OKC Metro, Edmond, Norman, Moore, Yukon, Midwest City, and statewide medical transfer corridors.
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Business Hours</span>
                    <span className="text-sm font-bold text-white">
                      Mon–Fri: 7 AM – 7 PM
                    </span>
                    <span className="block text-xs font-semibold text-amber-400 mt-0.5">
                      (STAT available 24/7)
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
                <span>Send Our Dispatch Team a Message</span>
              </h3>
              <p className="text-xs text-slate-600">
                Have questions regarding scheduled route contracts, compliance documentation, or billing?
                Let us know.
              </p>
            </div>

            {sent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Received</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out to MedVelo. A medical logistics coordinator will follow up
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label htmlFor="contactMessage" className="block text-xs font-bold text-slate-700">
                    How can we support your facility?
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    required
                    placeholder="Provide details regarding your medical transport volume, route frequency, or specific handling requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Confidential medical courier coordination.
                  </span>
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
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
