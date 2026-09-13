import React, { useState } from 'react';
import { Building, ShieldCheck, X, CheckCircle2, ArrowRight, Award } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    organizationName: '',
    organizationType: 'Hospital System',
    primaryContact: '',
    email: '',
    phone: '',
    estimatedVolume: '20–50 shipments / week',
    customNotes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Partner With MedVelo</h3>
              <p className="text-xs text-slate-500">Oklahoma Healthcare Network Logistics</p>
            </div>
          </div>
          <button
            id="close-partner-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Partnership Inquiry Submitted</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Our Oklahoma healthcare account director will review your facility profile and contact
              you with contract route options.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Healthcare Organization / Practice</label>
              <input
                type="text"
                required
                placeholder="e.g. Mercy Health, Integris Clinic, Diagnostic Lab..."
                value={partnerForm.organizationName}
                onChange={(e) => setPartnerForm({ ...partnerForm, organizationName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Organization Type</label>
                <select
                  value={partnerForm.organizationType}
                  onChange={(e) => setPartnerForm({ ...partnerForm, organizationType: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
                >
                  <option>Hospital System</option>
                  <option>Reference Laboratory</option>
                  <option>Outpatient Surgical Center</option>
                  <option>Compounding / Retail Pharmacy</option>
                  <option>Physician Practice / Clinic</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Estimated Transport Volume</label>
                <select
                  value={partnerForm.estimatedVolume}
                  onChange={(e) => setPartnerForm({ ...partnerForm, estimatedVolume: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
                >
                  <option>1–10 shipments / week</option>
                  <option>10–25 shipments / week</option>
                  <option>25–75 shipments / week</option>
                  <option>75+ daily dedicated routes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="Director of Operations / Lab Manager"
                  value={partnerForm.primaryContact}
                  onChange={(e) => setPartnerForm({ ...partnerForm, primaryContact: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="(405) 000-0000"
                  value={partnerForm.phone}
                  onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Official Work Email</label>
              <input
                type="email"
                required
                placeholder="administrator@hospital.org"
                value={partnerForm.email}
                onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Custom Route Requirements</label>
              <textarea
                rows={2}
                placeholder="List specific clinic addresses, cold chain requirements, or schedule hours..."
                value={partnerForm.customNotes}
                onChange={(e) => setPartnerForm({ ...partnerForm, customNotes: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-600"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-150">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Custom BAA execution available
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Submit Partner Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
