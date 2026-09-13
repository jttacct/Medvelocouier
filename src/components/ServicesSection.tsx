import React from 'react';
import {
  FlaskConical,
  Pill,
  Stethoscope,
  FileCheck,
  Zap,
  Route,
  ArrowRight,
  ShieldCheck,
  Thermometer,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { DeliveryType } from '../types';

interface ServicesSectionProps {
  onRequestPickupForService: (serviceName: DeliveryType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onRequestPickupForService,
}) => {
  const services = [
    {
      id: 'specimen',
      title: 'Specimen & Lab Transport' as DeliveryType,
      tagline: 'Pathology & Diagnostics',
      description:
        'Secure, temperature-controlled transport for lab samples, bloodwork, and diagnostic specimens.',
      icon: FlaskConical,
      accent: 'from-sky-500 to-blue-600',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      features: [
        'Continuous cold chain telemetry (2°C–8°C, Frozen -20°C, Ambient)',
        'OSHA Bloodborne Pathogens & UN3373 Category B compliant',
        'Direct intake to lab accessioning desks with timestamped handoff',
      ],
      tempSupport: 'Cold Chain & Frozen',
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Delivery' as DeliveryType,
      tagline: 'Prescriptions & Controlled Substances',
      description:
        'Reliable delivery of prescriptions, medications, and controlled substances.',
      icon: Pill,
      accent: 'from-teal-500 to-emerald-600',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      features: [
        'Strict DEA & Oklahoma Pharmacy Board chain of custody protocols',
        'Tamper-evident locking vault containers',
        'Electronic dual-party sign-off and delivery verification',
      ],
      tempSupport: 'Room Temp & Refrigerated Rx',
    },
    {
      id: 'equipment',
      title: 'Medical Equipment Transport' as DeliveryType,
      tagline: 'Devices & Surgical Instruments',
      description:
        'Safe handling and delivery of medical devices, supplies, and equipment.',
      icon: Stethoscope,
      accent: 'from-indigo-500 to-purple-600',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      features: [
        'Sterilized surgical tray & durable medical equipment (DME) handling',
        'Shock-cushioned and climate-stabilized cargo securing',
        'Same-day loaner tray transfers between surgical facilities',
      ],
      tempSupport: 'Specialized Securing',
    },
    {
      id: 'document',
      title: 'HIPAA-Compliant Document Delivery' as DeliveryType,
      tagline: 'Protected Health Records (PHI)',
      description:
        'Protected transport for sensitive medical records and confidential documents.',
      icon: FileCheck,
      accent: 'from-slate-700 to-slate-900',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      features: [
        'Zero-exposure sealed courier transit adhering to 45 CFR § 164',
        'Tokenized manifest tracking and encrypted audit trail',
        'Legal medical chart, oncology imaging, and records archive handoff',
      ],
      tempSupport: 'Climate Protected',
    },
    {
      id: 'stat',
      title: 'STAT & Urgent Delivery' as DeliveryType,
      tagline: 'Emergency 60-Minute Response',
      description:
        'When timing matters most, MedVelo delivers with speed and precision.',
      icon: Zap,
      accent: 'from-amber-500 to-red-600',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      features: [
        'Dedicated direct point-to-point courier (no secondary stops)',
        'Immediate dispatch within 15 minutes of call / online submission',
        'Live GPS milestone pings to surgeons and attending providers',
      ],
      tempSupport: 'All Temperatures Available',
    },
    {
      id: 'route',
      title: 'Scheduled Route Services' as DeliveryType,
      tagline: 'Custom Daily & Weekly Sweeps',
      description:
        'Daily, weekly, and custom routes for clinics, labs, and hospitals.',
      icon: Route,
      accent: 'from-blue-600 to-cyan-600',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      features: [
        'Predictable morning, midday, and evening clinic collection sweeps',
        'Discounted volume recurring rates for healthcare systems',
        'Dedicated trained recurring drivers familiar with your facility layout',
      ],
      tempSupport: 'Multi-Stop Optimized',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Specialized Oklahoma Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Comprehensive Medical Courier Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Engineered specifically for clinical laboratories, hospital networks, outpatient centers,
            and pharmacies across Oklahoma.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${srv.accent} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${srv.badgeColor}`}
                    >
                      {srv.tagline}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-sky-700 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {srv.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {srv.tempSupport}
                  </span>
                  <button
                    id={`request-service-${srv.id}`}
                    onClick={() => onRequestPickupForService(srv.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Request Pickup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
