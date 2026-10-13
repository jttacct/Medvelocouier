import React, { useState } from 'react';
import {
  Calculator,
  ShieldAlert,
  Thermometer,
  Clock,
  Layers,
  ArrowRight,
  Phone,
  HelpCircle,
  FileCheck,
  Zap,
} from 'lucide-react';
import { DeliveryType } from '../types';

interface PricingSectionProps {
  onRequestPickupWithQuote: (quoteDetails: {
    serviceType: DeliveryType;
    estimatedCost: string;
    isStat: boolean;
    isColdChain: boolean;
    isBiohazard: boolean;
  }) => void;
  onContactCustomQuote: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onRequestPickupWithQuote,
  onContactCustomQuote,
}) => {
  // Interactive Calculator State
  const [miles, setMiles] = useState<number>(14);
  const [isStat, setIsStat] = useState<boolean>(false);
  const [isAfterHours, setIsAfterHours] = useState<boolean>(false);
  const [isTempControlled, setIsTempControlled] = useState<boolean>(true);
  const [isBiohazard, setIsBiohazard] = useState<boolean>(false);
  const [extraStops, setExtraStops] = useState<number>(0);

  // Quick Oklahoma Distance Presets
  const oklahomaPresets = [
    { label: 'Downtown OKC → Edmond (14 mi)', miles: 14 },
    { label: 'OU Health → Integris Baptist (8 mi)', miles: 8 },
    { label: 'Integris → Mercy Hospital (11 mi)', miles: 11 },
    { label: 'Downtown OKC → Norman (22 mi)', miles: 22 },
    { label: 'OKC Metro → Shawnee (38 mi)', miles: 38 },
    { label: 'OKC → Tulsa Medical Corridor (105 mi)', miles: 105 },
  ];

  // Pricing calculation based exactly on prompt rates
  const calculateEstimate = () => {
    let baseMin = 0;
    let baseMax = 0;

    if (miles <= 15) {
      baseMin = 25;
      baseMax = 35;
    } else if (miles <= 40) {
      baseMin = 25 + (miles - 15) * 1.25;
      baseMax = 35 + (miles - 15) * 1.5;
    } else {
      // 40+ miles
      baseMin = 25 + 25 * 1.25 + (miles - 40) * 1.75;
      baseMax = 35 + 25 * 1.5 + (miles - 40) * 2.25;
    }

    // STAT surcharge: +$20-$40
    if (isStat) {
      baseMin += 20;
      baseMax += 40;
    }

    // After-hours / weekend: +$25-$50
    if (isAfterHours) {
      baseMin += 25;
      baseMax += 50;
    }

    // Temperature-controlled: +$10
    if (isTempControlled) {
      baseMin += 10;
      baseMax += 10;
    }

    // Biohazard specimens: +$10-$20
    if (isBiohazard) {
      baseMin += 10;
      baseMax += 20;
    }

    // Multi-stop routes: $5-$10 per stop
    if (extraStops > 0) {
      baseMin += extraStops * 5;
      baseMax += extraStops * 10;
    }

    return {
      min: Math.round(baseMin),
      max: Math.round(baseMax),
    };
  };

  const estimate = calculateEstimate();

  const handleApplyEstimate = () => {
    onRequestPickupWithQuote({
      serviceType: isStat ? 'STAT & Urgent Delivery' : 'Specimen & Lab Transport',
      estimatedCost: `$${estimate.min} – $${estimate.max}`,
      isStat,
      isColdChain: isTempControlled,
      isBiohazard,
    });
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            <span>Transparent Healthcare Rates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Clear, Predictable Medical Delivery Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Transparent pricing tailored for clinics, laboratories, hospital systems, and pharmacies
            with no hidden fuel surcharges.
          </p>
        </div>

        {/* Pricing Cards Grid (Exact Prompt Figures) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Standard Delivery */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 font-mono">
                  Tier 1
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display">Standard Delivery</h3>
                <p className="text-xs text-slate-600">
                  Ideal for routine daily specimen transfers, non-urgent pharmacy supplies, and records.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200 text-sm">
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">0–15 miles</span>
                  <span className="font-bold text-slate-900 font-mono text-base">$25–$35</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">16–40 miles</span>
                  <span className="font-bold text-slate-900 font-mono text-base">$1.25–$1.50 / mi</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">40+ miles</span>
                  <span className="font-bold text-slate-900 font-mono text-base">$1.75–$2.25 / mi</span>
                </div>
              </div>

              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Routine scheduled pickup window
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Digital Proof of Delivery (POD)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Automated provider notification
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: STAT / Urgent (Featured) */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-850 text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                <Zap className="w-3 h-3 fill-slate-950" />
                24/7 STAT
              </span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Tier 2 · Emergency Response
                </span>
                <h3 className="text-2xl font-black text-white font-display">STAT / Urgent</h3>
                <p className="text-xs text-slate-300">
                  Immediate dispatch for time-critical surgical biopsies, arterial blood gas, and emergency blood units.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-750 text-sm">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">STAT Surcharge</span>
                  <span className="font-bold text-amber-400 font-mono text-base">+$20–$40</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">After-hours / weekend</span>
                  <span className="font-bold text-amber-400 font-mono text-base">+$25–$50</span>
                </div>
              </div>

              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Dispatched within 15 minutes guaranteed
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Dedicated point-to-point courier (no batch stops)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Continuous live GPS & temperature telemetry
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Routes & Special Handling */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
                  Tier 3 · Custom & Clinical
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display">Routes & Handling</h3>
                <p className="text-xs text-slate-600">
                  Custom recurring route sweeps and clinical temperature-controlled handling additions.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-200 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Daily routes</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">$65–$150</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Multi-stop routes</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">$5–$10 / stop</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Temperature-controlled</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">+$10</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Biohazard specimens</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">+$10–$20</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Large equipment</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">Quote required</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Oklahoma Rate Estimator */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Instant Calculator
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  Oklahoma Rate Estimator
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Calculate an immediate transparent estimate based on distance and clinical handling parameters.
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs text-slate-400">Estimated Price Range:</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                ${estimate.min} – ${estimate.max}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-8 space-y-6">
              {/* Distance Slider & Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-300">Estimated Route Distance:</span>
                  <span className="font-bold text-sky-400 font-mono text-base">{miles} Miles</span>
                </div>
                <input
                  id="pricing-mileage-slider"
                  type="range"
                  min="1"
                  max="120"
                  value={miles}
                  onChange={(e) => setMiles(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />

                {/* Presets */}
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-2">Common Oklahoma Medical Routes:</span>
                  <div className="flex flex-wrap gap-2">
                    {oklahomaPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setMiles(preset.miles)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          miles === preset.miles
                            ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Handling Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    STAT / Urgent Delivery (+$20-$40)
                  </span>
                  <input
                    type="checkbox"
                    checked={isStat}
                    onChange={(e) => setIsStat(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 bg-slate-900 border-slate-700"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-sky-400" />
                    Temperature-Controlled (+$10)
                  </span>
                  <input
                    type="checkbox"
                    checked={isTempControlled}
                    onChange={(e) => setIsTempControlled(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 bg-slate-900 border-slate-700"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    After-hours / Weekend (+$25-$50)
                  </span>
                  <input
                    type="checkbox"
                    checked={isAfterHours}
                    onChange={(e) => setIsAfterHours(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 bg-slate-900 border-slate-700"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Biohazard Specimens (+$10-$20)
                  </span>
                  <input
                    type="checkbox"
                    checked={isBiohazard}
                    onChange={(e) => setIsBiohazard(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 bg-slate-900 border-slate-700"
                  />
                </label>
              </div>
            </div>

            {/* Summary & Apply CTA */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Quote Breakdown
              </h4>

              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>Base Mileage ({miles} mi):</span>
                  <span>Calculated</span>
                </div>
                {isStat && (
                  <div className="flex justify-between text-amber-300">
                    <span>STAT Rapid Response:</span>
                    <span>+$20–$40</span>
                  </div>
                )}
                {isTempControlled && (
                  <div className="flex justify-between text-sky-300">
                    <span>Cold Chain Active:</span>
                    <span>+$10</span>
                  </div>
                )}
                {isBiohazard && (
                  <div className="flex justify-between text-rose-300">
                    <span>Biohazard Category B:</span>
                    <span>+$10–$20</span>
                  </div>
                )}
                {isAfterHours && (
                  <div className="flex justify-between text-purple-300">
                    <span>After-Hours / Weekend:</span>
                    <span>+$25–$50</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-sm text-emerald-400">
                  <span>Total Estimated:</span>
                  <span>${estimate.min} – ${estimate.max}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Final pricing may vary based on distance, volume, and service level. Contact us for a custom quote.
              </p>

              <button
                id="apply-calculated-quote-btn"
                onClick={handleApplyEstimate}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 via-sky-300 to-teal-300 hover:from-sky-300 hover:to-teal-200 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Pickup With This Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Custom Hospital / Route Quote Banner */}
        <div className="p-8 rounded-3xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Need Contract Recurring Daily Routes or Large Hospital Quotes?
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl">
              We offer volume contracted pricing and monthly consolidated invoicing for Oklahoma hospital systems, outpatient laboratory chains, and multi-facility clinic groups.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                Billing & Accounts:
                <a
                  href="mailto:billing@medvelocourier.com"
                  className="font-mono font-bold text-sky-700 hover:text-sky-900 underline"
                >
                  billing@medvelocourier.com
                </a>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                Direct Dispatch:
                <a
                  href="mailto:dispatch@medvelocourier.com"
                  className="font-mono font-bold text-sky-700 hover:text-sky-900 underline"
                >
                  dispatch@medvelocourier.com
                </a>
              </span>
            </div>
          </div>
          <button
            id="custom-quote-cta-btn"
            onClick={onContactCustomQuote}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm shrink-0 transition-colors cursor-pointer"
          >
            Request Custom Route Quote
          </button>
        </div>
      </div>
    </section>
  );
};
