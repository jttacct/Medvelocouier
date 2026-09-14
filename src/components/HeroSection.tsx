import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  Thermometer,
  Lock,
  Clock,
  CheckCircle2,
  Building2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import medicalHeroImg from '../assets/images/medical_hero_courier_1789333071988.jpg';

interface HeroSectionProps {
  onRequestPickup: () => void;
  onPartnerWithUs: () => void;
  onSearchTracking: (code: string) => void;
  onSelectService: (serviceName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestPickup,
  onPartnerWithUs,
  onSearchTracking,
  onSelectService,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchTracking(searchInput.trim());
    } else {
      onSearchTracking('MV-OKC-9824');
    }
  };

  const sampleTrackingNumbers = [
    { code: 'MV-OKC-9824', label: 'Cold Chain Lab Transport (In Transit)', badge: 'Active' },
    { code: 'MV-STAT-5501', label: 'OR Surgical Biopsy (Delivered & Signed)', badge: 'Delivered' },
    { code: 'MV-DOC-6211', label: 'HIPAA Medical Records (En Route)', badge: 'En Route' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & Search */}
          <div className="lg:col-span-7 space-y-8">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-sky-300 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>HIPAA & OSHA Compliant Medical Courier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">Oklahoma Statewide</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display leading-[1.1] text-white">
                Delivering the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-300">
                  Future of Medical
                </span>{' '}
                Logistics
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
                Fast, secure, and HIPAA-compliant medical courier services for clinics, labs,
                pharmacies, and hospitals across Oklahoma.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="hero-request-pickup-btn"
                onClick={onRequestPickup}
                className="px-6 py-3.5 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-teal-300 hover:from-sky-300 hover:to-teal-200 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>Request a Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-partner-with-us-btn"
                onClick={onPartnerWithUs}
                className="px-6 py-3.5 rounded-xl text-base font-bold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/90 hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Partner With Us</span>
              </button>
            </div>

            {/* Live Tracking Input Box */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-850/90 border border-slate-700/80 backdrop-blur-md shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <Search className="w-4 h-4 text-sky-400" />
                    <span>Real-Time Shipment Tracking</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live GPS & Temp Telemetry
                  </span>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      id="hero-tracking-input"
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Enter Tracking # (e.g. MV-OKC-9824)"
                      className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent font-mono"
                    />
                    {searchInput && (
                      <button
                        type="button"
                        onClick={() => setSearchInput('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <button
                    id="hero-tracking-submit-btn"
                    type="submit"
                    className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Track Shipment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Sample Tracking Tags */}
                <div className="pt-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">Quick Live Demo:</span>
                    {sampleTrackingNumbers.map((sample) => (
                      <button
                        key={sample.code}
                        id={`hero-sample-track-${sample.code}`}
                        type="button"
                        onClick={() => {
                          setSearchInput(sample.code);
                          onSearchTracking(sample.code);
                        }}
                        className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all font-mono text-[11px] flex items-center gap-1.5"
                      >
                        <span className="font-semibold text-sky-300">{sample.code}</span>
                        <span className="text-[10px] text-slate-400">({sample.badge})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HIPAA BAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                <Thermometer className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Cold Chain 2°C–8°C</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 STAT Urgent</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                <Lock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Digital Chain of Custody</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Dispatch Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative Card Rim */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500 to-teal-400 opacity-20 blur-xl"></div>

              <div className="relative rounded-2xl bg-slate-800/95 border border-slate-700 p-5 sm:p-6 shadow-2xl space-y-5 overflow-hidden">
                {/* Real Medical Logistics Photo Banner */}
                <div className="relative -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 h-44 sm:h-48 overflow-hidden group">
                  <img
                    id="hero-courier-live-img"
                    src={medicalHeroImg}
                    alt="Certified MedVelo medical courier transporting temperature-regulated specimen case at hospital entrance"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  {/* Badges on Top of Photo */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-bold text-sky-300 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Active Field Courier
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-emerald-300 shadow-md">
                      GPS Signal: Strong
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Transit Corridor
                      </p>
                      <h4 className="text-white text-sm font-extrabold drop-shadow-sm font-display">
                        Oklahoma Health Center Network
                      </h4>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-[11px] font-mono font-bold text-amber-300">
                      ETA 14m
                    </span>
                  </div>
                </div>

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                        Active STAT Route
                      </h2>
                      <p className="text-xs text-slate-400 font-mono">MV-OKC-9824</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                    In Transit
                  </span>
                </div>

                {/* Telemetry Sensor Readout */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-sky-400" />
                      Active Thermo-Chamber Sensor
                    </span>
                    <span className="font-bold text-emerald-400 font-mono">3.8°C (Normal)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="w-1/4 bg-blue-500 opacity-40"></div>
                    <div className="w-2/4 bg-emerald-500 relative">
                      <span className="absolute right-1/3 top-0 bottom-0 w-1 bg-white rounded-full"></span>
                    </div>
                    <div className="w-1/4 bg-red-500 opacity-40"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Min: 2.0°C</span>
                    <span className="text-emerald-400 font-semibold">Cold Chain Calibrated</span>
                    <span>Max: 8.0°C</span>
                  </div>
                </div>

                {/* Handoff Details */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="font-bold text-slate-200">From: Integris Baptist Medical Center</p>
                      <p className="text-slate-400">Pathology Lab · 3300 NW Expressway, OKC</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-4 bg-slate-700 ml-1"></div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="font-bold text-slate-200">To: Oklahoma Blood Institute</p>
                      <p className="text-slate-400">1001 N Lincoln Blvd, OKC · ETA 14 Mins</p>
                    </div>
                  </div>
                </div>

                {/* Courier Badge Info */}
                <div className="p-3 rounded-xl bg-slate-750/70 border border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
                      DR
                    </div>
                    <div>
                      <p className="font-bold text-white">Derrick Reynolds</p>
                      <p className="text-[11px] text-slate-400 font-mono">Badge #MV-OKC-042 · HIPAA Verified</p>
                    </div>
                  </div>
                  <button
                    id="hero-inspect-live-shipment-btn"
                    onClick={() => onSearchTracking('MV-OKC-9824')}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 underline cursor-pointer"
                  >
                    View Telemetry →
                  </button>
                </div>

                {/* Provider Notification Simulation Preview */}
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Automated SMS & EMR update sent to Receiving Lab director.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
