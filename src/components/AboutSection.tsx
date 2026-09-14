import React from 'react';
import {
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  HeartHandshake,
  Zap,
  Lock,
  Award,
  MapPin,
  Clock,
  Building,
  Camera,
  Check,
} from 'lucide-react';
import medicalHeroImg from '../assets/images/medical_hero_courier_1789333071988.jpg';
import specimenLabImg from '../assets/images/specimen_cold_chain_1789333082729.jpg';
import pharmacyRxImg from '../assets/images/pharmacy_secure_rx_1789333093193.jpg';
import statTransitImg from '../assets/images/stat_medical_transit_1789333103540.jpg';

interface AboutSectionProps {
  onRequestPickup: () => void;
  onPartnerWithUs: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onRequestPickup,
  onPartnerWithUs,
}) => {
  const values = [
    {
      name: 'Integrity',
      description: 'We protect every delivery with honesty and accountability.',
      icon: ShieldCheck,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      name: 'Precision',
      description: 'Every route and handoff matters.',
      icon: Target,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      name: 'Speed',
      description: 'Healthcare moves fast; so do we.',
      icon: Zap,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      name: 'Compliance',
      description: 'HIPAA and chain-of-custody are non-negotiable.',
      icon: Lock,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      name: 'Service',
      description: 'We exist to support patients and providers.',
      icon: HeartHandshake,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  const serviceAreas = [
    'Oklahoma City Metro',
    'Edmond',
    'Norman & Moore',
    'Yukon & Mustang',
    'Midwest City & Del City',
    'Shawnee & Guthrie',
    'Tulsa Corridor Transfer',
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main About Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider">
              <Building className="w-3.5 h-3.5 text-sky-600" />
              <span>Based in Oklahoma City</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
              About <span className="text-sky-700">MedVelo</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
              MedVelo is a medical courier company based in Oklahoma City, providing fast, secure, and
              compliant delivery solutions for healthcare providers. We understand that every delivery
              impacts patient care — and we treat it with the urgency and precision it deserves.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              From urgent intraoperative biopsies and diagnostic bloodwork to critical pharmaceuticals
              and sensitive medical records, MedVelo connects hospitals, outpatient surgical centers,
              independent clinics, and diagnostic laboratories across Oklahoma with unbroken chain of
              custody.
            </p>

            {/* Oklahoma Service Area Highlights */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Primary Operational Coverage Area:</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="about-request-pickup-btn"
                onClick={onRequestPickup}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Schedule Facility Pickup
              </button>
              <button
                id="about-partner-btn"
                onClick={onPartnerWithUs}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors border border-slate-200 cursor-pointer"
              >
                Explore Provider Partnership
              </button>
            </div>
          </div>

          {/* Right Column: Mission & Vision Showcase */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mission Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl space-y-4 border border-slate-700">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white font-display">Our Mission</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                To deliver fast, secure, and reliable medical logistics solutions that support patient
                care and strengthen healthcare operations.
              </p>
            </div>

            {/* Vision Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50/50 border border-sky-100 text-slate-900 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display">Our Vision</h3>
              <p className="text-slate-700 text-base leading-relaxed">
                To become the most trusted and innovative medical courier service in the region, setting
                the standard for speed, compliance, and service excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="pt-8 border-t border-slate-150 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              Our Core Values
            </h3>
            <p className="text-slate-600 text-sm">
              The foundational principles guiding every dispatch, handoff, and patient record we protect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.name}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${v.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{v.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clinical Operations Photo Showcase */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5 text-sky-600" />
                <span>Field Operations Gallery</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                Medical Logistics in Action
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                A glimpse into our daily chain-of-custody protocols, temperature-controlled transport equipment, and certified medical courier operations across Oklahoma.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% HIPAA & OSHA Certified Workflows</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Photo 1 */}
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={medicalHeroImg}
                  alt="Certified medical courier outside hospital medical center entrance"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                  Field Courier
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Hospital Intake & Dispatch</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Direct handoffs at major medical corridors, outpatient surgical suites, and trauma emergency bays.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Uniformed & HIPAA Badged</span>
                </div>
              </div>
            </div>

            {/* Photo 2 */}
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={specimenLabImg}
                  alt="Clinical laboratory specimen coolers with barcode labeled test tubes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-sky-950/80 backdrop-blur-sm text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                  Cold Chain
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Laboratory Accessioning</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Continuous 2°C–8°C thermal telemetry, frozen -20°C chambers, and barcode-level specimen tracking.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>UN3373 Category B Compliant</span>
                </div>
              </div>
            </div>

            {/* Photo 3 */}
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={pharmacyRxImg}
                  alt="Secure tamper-evident medical delivery container for hospital pharmaceuticals"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-teal-950/80 backdrop-blur-sm text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  Pharmacy Rx
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Pharmacy & Vault Transport</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tamper-evident locking vault cases and electronic dual-party verification for controlled medications.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DEA Chain of Custody</span>
                </div>
              </div>
            </div>

            {/* Photo 4 */}
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={statTransitImg}
                  alt="Medical specimen transport cooler with digital temperature telemetry display reading 3.8C"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-amber-950/80 backdrop-blur-sm text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  STAT Urgent
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">STAT Telemetry Coolers</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Intraoperative surgical biopsies and emergency pathology transport with real-time temperature loggers.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-Time Sensor Logging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
