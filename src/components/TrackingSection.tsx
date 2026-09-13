import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Thermometer,
  Clock,
  MapPin,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building,
  Lock,
  Send,
  Bell,
  Download,
  Fingerprint,
  Phone,
  RefreshCw,
} from 'lucide-react';
import { Shipment, ProviderNotification, ShipmentStatus } from '../types';

interface TrackingSectionProps {
  shipments: Shipment[];
  selectedTrackingNumber: string;
  onSelectTracking: (trackingNumber: string) => void;
  onAddNotification: (notification: ProviderNotification) => void;
  onUpdateShipmentStatus: (trackingNumber: string, nextStatus: ShipmentStatus) => void;
  onRequestNewPickup: () => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  shipments,
  selectedTrackingNumber,
  onSelectTracking,
  onAddNotification,
  onUpdateShipmentStatus,
  onRequestNewPickup,
}) => {
  const [searchInput, setSearchInput] = useState(selectedTrackingNumber || 'MV-OKC-9824');
  const [showPhiManifestModal, setShowPhiManifestModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'provider_alerts' | 'chain_of_custody'>('timeline');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Find active shipment or fallback to first
  const currentShipment =
    shipments.find((s) => s.trackingNumber.toLowerCase() === selectedTrackingNumber.toLowerCase()) ||
    shipments.find((s) => s.trackingNumber.toLowerCase() === searchInput.trim().toLowerCase()) ||
    shipments[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (!clean) return;

    const matched = shipments.find((s) => s.trackingNumber.toUpperCase() === clean);
    if (matched) {
      onSelectTracking(matched.trackingNumber);
    } else {
      // Allow searching by partial match or switch
      const partial = shipments.find((s) => s.trackingNumber.toUpperCase().includes(clean));
      if (partial) {
        onSelectTracking(partial.trackingNumber);
      } else {
        alert(`Shipment "${clean}" not found in current active dispatches. Try MV-OKC-9824 or MV-STAT-5501, or create a new pickup request!`);
      }
    }
  };

  const getStatusStepIndex = (status: ShipmentStatus) => {
    switch (status) {
      case 'order_received':
        return 0;
      case 'courier_dispatched':
        return 1;
      case 'en_route_pickup':
        return 2;
      case 'picked_up':
        return 3;
      case 'in_transit':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 0;
    }
  };

  const statusSteps = [
    { key: 'order_received', label: 'Order Received' },
    { key: 'courier_dispatched', label: 'Dispatched' },
    { key: 'en_route_pickup', label: 'At Facility' },
    { key: 'picked_up', label: 'Specimen Secured' },
    { key: 'in_transit', label: 'In Transit' },
    { key: 'delivered', label: 'Delivered & Signed' },
  ];

  const currentIndex = getStatusStepIndex(currentShipment.status);

  // Quick simulation trigger for testing healthcare provider notifications
  const handleSimulateProviderAlert = () => {
    const alertId = `notif-${Date.now()}`;
    const newNotif: ProviderNotification = {
      id: alertId,
      timestamp: 'Just Now',
      channel: 'SMS',
      recipient: currentShipment.phoneTo,
      type: 'in_transit_temp',
      title: `Automated Status Alert · ${currentShipment.trackingNumber}`,
      message: `MedVelo Update: Courier ${currentShipment.courier.name} is 1.4 miles from ${currentShipment.facilityTo}. Temperature telemetry locked at ${currentShipment.currentTempCelsius ?? 3.8}°C (Verified).`,
      isRead: false,
    };
    onAddNotification(newNotif);
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const handleAdvanceStatus = () => {
    const order: ShipmentStatus[] = [
      'order_received',
      'courier_dispatched',
      'en_route_pickup',
      'picked_up',
      'in_transit',
      'delivered',
    ];
    const curIdx = order.indexOf(currentShipment.status);
    const nextIdx = (curIdx + 1) % order.length;
    onUpdateShipmentStatus(currentShipment.trackingNumber, order[nextIdx]);
  };

  return (
    <section id="tracking" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <ActivityIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Real-Time Healthcare Provider Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Live Medical Shipment Tracking & Custody
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Real-time GPS routing, active cold-chain temperature telemetry, automated healthcare provider
            alerts, and HIPAA-compliant chain of custody verification.
          </p>
        </div>

        {/* Tracking Search Form & Presets */}
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                id="tracking-page-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter MedVelo Tracking Number (e.g. MV-OKC-9824)"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              id="tracking-page-search-btn"
              type="submit"
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Search Tracking</span>
            </button>
          </form>

          {/* Quick Shipments Switcher */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">Quick Select Sample:</span>
            {shipments.map((s) => (
              <button
                key={s.trackingNumber}
                id={`switch-tracking-${s.trackingNumber}`}
                type="button"
                onClick={() => {
                  setSearchInput(s.trackingNumber);
                  onSelectTracking(s.trackingNumber);
                }}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-all flex items-center gap-1.5 ${
                  currentShipment.trackingNumber === s.trackingNumber
                    ? 'bg-sky-50 border-sky-300 text-sky-800 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{s.trackingNumber}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {s.deliveryType.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Tracking Details Dashboard */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Top Shipment Bar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-sky-300 border border-slate-700 font-bold">
                    {currentShipment.trackingNumber}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    Requisition: {currentShipment.requisitionId}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                      currentShipment.status === 'delivered'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentShipment.status === 'delivered'
                          ? 'bg-emerald-400'
                          : 'bg-amber-400 animate-ping'
                      }`}
                    ></span>
                    {currentShipment.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  {currentShipment.deliveryType}
                </h3>
                <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                  <span>Priority: {currentShipment.priority}</span>
                  <span>•</span>
                  <span>Target Range: {currentShipment.targetTempRange}</span>
                </p>
              </div>

              {/* Action Buttons for Healthcare Provider Testing */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="simulate-provider-alert-btn"
                  onClick={handleSimulateProviderAlert}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  title="Simulate automated SMS/Email dispatch notification to hospital staff"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>{testNotificationSent ? 'Alert Dispatched!' : 'Simulate Provider Alert'}</span>
                </button>

                <button
                  id="advance-status-simulation-btn"
                  onClick={handleAdvanceStatus}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  title="Cycle status step to simulate live delivery progression"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Next Status Step</span>
                </button>
              </div>
            </div>

            {/* Stepper Progress Visualizer */}
            <div className="mt-8 pt-6 border-t border-slate-750">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {statusSteps.map((step, idx) => {
                  const isDone = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isCurrent
                            ? 'bg-sky-500 text-white ring-4 ring-sky-500/30 shadow-lg scale-110'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isCurrent
                            ? 'text-sky-300 font-bold'
                            : isDone
                            ? 'text-slate-300'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Handoff Route & Telemetry Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-slate-200">
            {/* Origin & Destination */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Verified Facilities Route</span>
              </h4>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {/* Pickup Facility */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-sky-600 ring-4 ring-sky-100 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                      Origin Facility (Pickup)
                    </span>
                    <h5 className="text-base font-bold text-slate-900">{currentShipment.facilityFrom}</h5>
                    <p className="text-xs text-slate-600">{currentShipment.addressFrom}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>Contact: {currentShipment.contactPersonFrom}</span>
                      <span>•</span>
                      <a href={`tel:${currentShipment.phoneFrom}`} className="text-sky-700 font-semibold">
                        {currentShipment.phoneFrom}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Delivery Facility */}
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                      Destination Facility (Drop-off)
                    </span>
                    <h5 className="text-base font-bold text-slate-900">{currentShipment.facilityTo}</h5>
                    <p className="text-xs text-slate-600">{currentShipment.addressTo}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>Contact: {currentShipment.contactPersonTo}</span>
                      <span>•</span>
                      <a href={`tel:${currentShipment.phoneTo}`} className="text-sky-700 font-semibold">
                        {currentShipment.phoneTo}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions & Handling Notes */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Handling Instructions & Access Details:
                </span>
                <p className="text-slate-600 leading-relaxed">{currentShipment.specialInstructions}</p>
              </div>
            </div>

            {/* Courier & Telemetry Sensor Card */}
            <div className="space-y-6">
              {/* Cold Chain Sensor Card */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-sky-400" />
                    Cold Chain Sensor
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Compliant
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black font-mono text-emerald-400">
                    {currentShipment.currentTempCelsius ?? 3.8}°C
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Target: {currentShipment.targetTempRange}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Chamber Type:</span>
                    <span className="font-medium text-slate-200">{currentShipment.temperatureCategory}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Temp Excursions:</span>
                    <span className="font-bold text-emerald-400">0 Logged (100% Integrity)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">NIST Calibrated:</span>
                    <span className="font-mono text-slate-300">Cert #NIST-2026-99</span>
                  </div>
                </div>
              </div>

              {/* Certified Courier Details */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    Assigned Medical Courier
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    HIPAA Verified
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-11 h-11 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {currentShipment.courier.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{currentShipment.courier.name}</h5>
                    <p className="text-xs text-slate-500 font-mono">
                      Badge #{currentShipment.courier.badgeId}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className="font-medium text-slate-700">{currentShipment.courier.vehicle}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">License Plate:</span>
                    <span className="font-mono text-slate-700 font-semibold">
                      {currentShipment.courier.licensePlate}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Detail Tabs: Chain of Custody Timeline, Provider Notifications, & PHI Security Shield */}
          <div className="p-6 sm:p-8 bg-slate-50/70">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <button
                  id="tab-timeline-btn"
                  onClick={() => setActiveTab('timeline')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'timeline'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Chain of Custody Events ({currentShipment.events.length})</span>
                </button>

                <button
                  id="tab-provider-alerts-btn"
                  onClick={() => setActiveTab('provider_alerts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'provider_alerts'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  <span>Automated Provider Alerts ({currentShipment.notifications.length})</span>
                </button>

                <button
                  id="tab-custody-audit-btn"
                  onClick={() => setActiveTab('chain_of_custody')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'chain_of_custody'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Secure PHI Handling Shield</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>HIPAA 45 CFR § 164 Audit Log Active</span>
              </div>
            </div>

            {/* Tab 1: Timeline Content */}
            {activeTab === 'timeline' && (
              <div className="mt-6 space-y-4">
                {currentShipment.events.map((evt, index) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h6 className="text-sm font-bold text-slate-900">{evt.title}</h6>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {evt.timestamp}
                          </span>
                          {evt.tamperSealVerified && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Tamper Seal Verified
                            </span>
                          )}
                          {evt.tempReadingCelsius && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                              {evt.tempReadingCelsius}°C
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">{evt.description}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{evt.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 text-xs">
                      <p className="font-semibold text-slate-800">{evt.handlerName}</p>
                      <p className="text-[11px] text-slate-500">{evt.handlerRole}</p>
                      <p className="text-[10px] font-mono text-slate-400">Badge: {evt.badgeNumber}</p>
                      {evt.signature && (
                        <p className="text-[11px] font-serif italic text-sky-800 mt-1 font-bold">
                          ✍️ Signed: &ldquo;{evt.signature}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Healthcare Provider Automated Notifications */}
            {activeTab === 'provider_alerts' && (
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 flex items-start gap-3">
                  <Bell className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Automated Healthcare Provider Alert System</span>
                    <p className="text-sky-800 mt-0.5">
                      MedVelo automatically pushes timestamped SMS, Email, and direct EMR updates to
                      attending physicians, lab intake technicians, and clinic managers as chain of
                      custody unfolds.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentShipment.notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              n.channel === 'SMS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : n.channel === 'Email'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {n.channel} Dispatch
                          </span>
                          <span className="text-xs font-bold text-slate-900">{n.title}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg font-mono border border-slate-100">
                        {n.message}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Recipient: {n.recipient}</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Delivered to Provider
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Secure Patient Record Handling & PHI Shield */}
            {activeTab === 'chain_of_custody' && (
              <div className="mt-6 space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-slate-900">
                          HIPAA Safe Harbor & Chain of Custody Security Shield
                        </h5>
                        <p className="text-xs text-slate-500">
                          Complies with Title II of HIPAA, 45 CFR Part 160 and Part 164
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      BAA Executed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-400 font-medium">Cryptographic Audit Code</span>
                      <p className="font-mono font-bold text-slate-800">
                        {currentShipment.patientRecordHandling.chainOfCustodyAuditCode}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-400 font-medium">Manifest Token Reference</span>
                      <p className="font-mono font-bold text-slate-800">
                        {currentShipment.patientRecordHandling.manifestId}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-400 font-medium">Data Masking Standard</span>
                      <p className="font-semibold text-slate-800">
                        {currentShipment.patientRecordHandling.maskingMethod}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Fingerprint className="w-4 h-4 text-sky-400" />
                      <span>Protected Health Information (PHI) Transport Protocol</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Patient identifiers are isolated behind dual-key tamper-evident seals and tokenized
                      digital requisitions. MedVelo drivers never access unsealed PHI records. All custody
                      handoffs require timestamped biometric or electronic badge authorization.
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                      <span>Witness of Record: {currentShipment.patientRecordHandling.custodyWitness ?? 'Authorized Lab Receiver'}</span>
                      <button
                        id="view-phi-manifest-btn"
                        onClick={() => setShowPhiManifestModal(true)}
                        className="text-sky-400 hover:text-sky-300 font-bold underline cursor-pointer"
                      >
                        View Compliance Certificate →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Certificate Modal */}
      {showPhiManifestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Certificate of Chain of Custody</h4>
                  <p className="text-xs text-slate-500 font-mono">{currentShipment.trackingNumber}</p>
                </div>
              </div>
              <button
                id="close-phi-modal-btn"
                onClick={() => setShowPhiManifestModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-900">MedVelo Oklahoma Medical Logistics Audit Attestation</p>
              <p>
                This shipment was transported under strict compliance with the Health Insurance Portability
                and Accountability Act (HIPAA), OSHA Bloodborne Pathogen standard 29 CFR 1910.1030, and DOT
                Hazmat Hazardous Materials regulations.
              </p>
              <div className="border-t border-slate-200 pt-2 space-y-1 font-mono text-[11px] text-slate-600">
                <p>Origin: {currentShipment.facilityFrom}</p>
                <p>Destination: {currentShipment.facilityTo}</p>
                <p>Courier: {currentShipment.courier.name} (Badge {currentShipment.courier.badgeId})</p>
                <p>Audit Code: {currentShipment.patientRecordHandling.chainOfCustodyAuditCode}</p>
                <p>Status: VERIFIED VALID</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                id="download-cert-btn"
                onClick={() => {
                  alert('Chain of Custody Certificate PDF generated for facility records.');
                  setShowPhiManifestModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Certificate</span>
              </button>
              <button
                id="dismiss-cert-btn"
                onClick={() => setShowPhiManifestModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
