import React from 'react';
import {
  Activity,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  Heart,
  ArrowUp,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onRequestPickup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestPickup }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
                <Activity className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight font-display">MedVelo</span>
                <p className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">
                  Medical Courier Services
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Fast, secure, and HIPAA-compliant medical logistics for Oklahoma healthcare providers.
              Serving clinics, labs, pharmacies, and hospitals across Oklahoma City and surrounding
              regions.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                HIPAA Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400 font-mono text-[11px]">
                <Lock className="w-3.5 h-3.5" />
                Chain of Custody
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['home', 'about', 'services', 'pricing', 'contact'].map((sec) => (
                <li key={sec}>
                  <button
                    id={`footer-nav-${sec}`}
                    onClick={() => onNavigate(sec)}
                    className="hover:text-white capitalize transition-colors cursor-pointer"
                  >
                    {sec}
                  </button>
                </li>
              ))}
              <li>
                <button
                  id="footer-nav-request"
                  onClick={onRequestPickup}
                  className="text-sky-400 hover:text-sky-300 font-bold transition-colors cursor-pointer"
                >
                  Request Pickup
                </button>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Courier Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200">Specimen & Lab Transport</li>
              <li className="hover:text-slate-200">Pharmacy Delivery & Controlled Rx</li>
              <li className="hover:text-slate-200">Medical Equipment & Trays</li>
              <li className="hover:text-slate-200">HIPAA Document Transport</li>
              <li className="hover:text-slate-200 text-amber-400 font-semibold">
                STAT & Urgent 24/7 Delivery
              </li>
              <li className="hover:text-slate-200">Scheduled Route Sweeps</li>
            </ul>
          </div>

          {/* Contact Dispatch Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Emergency & Dispatch
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                id="footer-phone"
                href="tel:4056379609"
                className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-mono text-sm font-bold"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>(405) 637-9609</span>
              </a>

              <a
                id="footer-email"
                href="mailto:info@MedVeloCourier.com"
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>info@MedVeloCourier.com</span>
              </a>

              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Oklahoma City & surrounding regions</span>
              </p>

              <p className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Mon–Fri: 7 AM – 7 PM (STAT 24/7)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} MedVelo Courier (Medvelocourier.com). All rights reserved.
            Oklahoma City, OK.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">HIPAA Protected Health Information (PHI) Compliant</span>
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-semibold"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
