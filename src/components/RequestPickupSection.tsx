import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  AlertCircle,
  Thermometer,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { DeliveryType, PickupFormData, Shipment } from '../types';

interface RequestPickupSectionProps {
  initialService?: DeliveryType | '';
  initialIsStat?: boolean;
  initialIsColdChain?: boolean;
  initialIsBiohazard?: boolean;
  onPickupCreated: (newShipment: Shipment) => void;
  onTrackNow: (trackingNumber: string) => void;
}

export const RequestPickupSection: React.FC<RequestPickupSectionProps> = ({
  initialService = '',
  initialIsStat = false,
  initialIsColdChain = false,
  initialIsBiohazard = false,
  onPickupCreated,
  onTrackNow,
}) => {
  const [formData, setFormData] = useState<PickupFormData>({
    facilityName: '',
    contactPerson: '',
    phone: '',
    email: '',
    pickupAddress: '',
    deliveryAddress: '',
    deliveryType: initialService,
    preferredPickupTime: '',
    notes: '',
    isStatUrgent: initialIsStat,
    requiresColdChain: initialIsColdChain,
    isBiohazard: initialIsBiohazard,
    protectPatientRecords: true,
  });

  const [submittedShipment, setSubmittedShipment] = useState<Shipment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryOptions: DeliveryType[] = [
    'Specimen & Lab Transport',
    'Pharmacy Delivery',
    'Medical Equipment Transport',
    'HIPAA-Compliant Document Delivery',
    'STAT & Urgent Delivery',
    'Scheduled Route Services',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validation
    if (
      !formData.facilityName ||
      !formData.contactPerson ||
      !formData.phone ||
      !formData.email ||
      !formData.pickupAddress ||
      !formData.deliveryAddress ||
      !formData.deliveryType
    ) {
      setErrorMsg('Please complete all required fields including facility details and addresses.');
      return;
    }

    setIsSubmitting(true);

    // Generate unique tracking number and shipment record
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const trackingCode = `MV-OKC-${randomSuffix}`;
      const requisitionId = `REQ-${Date.now().toString().slice(-6)}`;

      const newShipment: Shipment = {
        trackingNumber: trackingCode,
        requisitionId: requisitionId,
        facilityFrom: formData.facilityName,
        contactPersonFrom: formData.contactPerson,
        phoneFrom: formData.phone,
        addressFrom: formData.pickupAddress,
        facilityTo: 'Destination Medical Center / Receiving Lab',
        contactPersonTo: 'Attending Receiving Specialist',
        phoneTo: formData.phone,
        addressTo: formData.deliveryAddress,
        deliveryType: formData.deliveryType as DeliveryType,
        priority: formData.isStatUrgent
          ? 'STAT Urgent (Under 60m)'
          : 'Priority Medical (2-3 Hours)',
        status: 'order_received',
        temperatureCategory: formData.requiresColdChain
          ? 'Cold Chain (2°C - 8°C)'
          : 'Controlled Room Temp (20°C - 25°C)',
        currentTempCelsius: formData.requiresColdChain ? 3.4 : 21.0,
        targetTempRange: formData.requiresColdChain ? '2.0°C to 8.0°C' : 'Controlled Ambient',
        estimatedDeliveryTime: formData.isStatUrgent
          ? 'STAT Estimate: ~45 mins from dispatch'
          : 'Today: Within scheduled window',
        courier: {
          name: 'Marcus Vance',
          badgeId: `MV-OKC-0${Math.floor(10 + Math.random() * 80)}`,
          phone: '(405) 637-9609',
          vehicle: '2024 Ford Transit Connect (Active Cold Vault)',
          licensePlate: `OK · ${Math.floor(100 + Math.random() * 899)}-MED`,
          hipaaCertified: true,
        },
        patientRecordHandling: {
          isProtectedPhi: true,
          manifestId: `HIPAA-AES-${randomSuffix}`,
          maskingMethod: 'NIST SP 800-88 / HIPAA Safe Harbor Tokenized',
          chainOfCustodyAuditCode: `COC-OKC-${randomSuffix}-A`,
        },
        specialInstructions: formData.notes || 'Handle with clinical chain of custody protocols.',
        events: [
          {
            id: `evt-${Date.now()}-1`,
            timestamp: 'Just Now',
            status: 'order_received',
            title: 'Pickup Order Logged & Verified',
            description: `Order successfully scheduled for ${formData.facilityName}. Dispatch assigning nearest verified courier.`,
            location: formData.pickupAddress,
            handlerName: 'MedVelo OKC Dispatch',
            handlerRole: 'System Dispatcher',
            badgeNumber: 'SYS-DISPATCH',
            tamperSealVerified: true,
          },
        ],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            timestamp: 'Just Now',
            channel: 'SMS',
            recipient: formData.phone,
            type: 'pickup_confirmed',
            title: `Pickup Confirmed: ${trackingCode}`,
            message: `MedVelo has received your pickup request for ${formData.facilityName}. Courier dispatch in progress.`,
            isRead: false,
          },
        ],
      };

      onPickupCreated(newShipment);
      setSubmittedShipment(newShipment);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedShipment(null);
    setFormData({
      facilityName: '',
      contactPerson: '',
      phone: '',
      email: '',
      pickupAddress: '',
      deliveryAddress: '',
      deliveryType: '',
      preferredPickupTime: '',
      notes: '',
      isStatUrgent: false,
      requiresColdChain: false,
      isBiohazard: false,
      protectPatientRecords: true,
    });
  };

  return (
    <section id="request-pickup" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>24/7 Dispatch Available</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Request a Pickup
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Complete the form below and MedVelo will contact you shortly to confirm your pickup.
          </p>
        </div>

        {/* Confirmation Modal if Submitted */}
        {submittedShipment ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-200 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Pickup Request Confirmed & Dispatched
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                Courier Dispatched for {submittedShipment.facilityFrom}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                An automated SMS and email notification has been dispatched to{' '}
                <span className="font-semibold text-slate-900">{submittedShipment.phoneFrom}</span>.
              </p>
            </div>

            {/* Tracking Code Display */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl max-w-md mx-auto space-y-2 border border-slate-700">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Official Tracking Number:
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400 tracking-wider">
                {submittedShipment.trackingNumber}
              </div>
              <p className="text-[11px] text-slate-400">
                Chain of Custody Code: {submittedShipment.patientRecordHandling.chainOfCustodyAuditCode}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="track-new-shipment-btn"
                onClick={() => onTrackNow(submittedShipment.trackingNumber)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track This Shipment Live</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="submit-another-pickup-btn"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all border border-slate-200 cursor-pointer"
              >
                Schedule Another Pickup
              </button>
            </div>
          </div>
        ) : (
          /* Pickup Request Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-8"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Facility & Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b border-slate-150 pb-2">
                <Building className="w-4 h-4 text-sky-600" />
                <span>1. Facility & Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="facilityName" className="block text-xs font-bold text-slate-700">
                    Facility Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="facilityName"
                      type="text"
                      required
                      placeholder="e.g. Integris Health, OU Health, Quest Lab..."
                      value={formData.facilityName}
                      onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contactPerson" className="block text-xs font-bold text-slate-700">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="contactPerson"
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Lin or Lab Manager"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(405) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="provider@facility.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Addresses & Logistics */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b border-slate-150 pb-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>2. Pickup & Delivery Route</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="pickupAddress" className="block text-xs font-bold text-slate-700">
                    Pickup Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="pickupAddress"
                      type="text"
                      required
                      placeholder="Street address, Suite, Floor, Bay #..."
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <MapPin className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="deliveryAddress" className="block text-xs font-bold text-slate-700">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="deliveryAddress"
                      type="text"
                      required
                      placeholder="Destination Hospital, Lab, or Clinic address..."
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Delivery Type & Timing */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 border-b border-slate-150 pb-2">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>3. Service Type & Preferred Schedule</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="deliveryType" className="block text-xs font-bold text-slate-700">
                    Type of Delivery <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="deliveryType"
                    required
                    value={formData.deliveryType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryType: e.target.value as DeliveryType,
                        isStatUrgent: e.target.value === 'STAT & Urgent Delivery',
                        requiresColdChain:
                          e.target.value === 'Specimen & Lab Transport' || formData.requiresColdChain,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white cursor-pointer"
                  >
                    <option value="">Select...</option>
                    {deliveryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="preferredPickupTime" className="block text-xs font-bold text-slate-700">
                    Preferred Pickup Time
                  </label>
                  <div className="relative">
                    <input
                      id="preferredPickupTime"
                      type="text"
                      placeholder="e.g., Today 3 PM"
                      value={formData.preferredPickupTime}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredPickupTime: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
                    />
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Clinical Handling Options */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Special Handling Requirements
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.isStatUrgent}
                    onChange={(e) => setFormData({ ...formData, isStatUrgent: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      STAT / Urgent
                    </span>
                    <span className="text-slate-500 text-[11px]">Under 60 min response</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.requiresColdChain}
                    onChange={(e) =>
                      setFormData({ ...formData, requiresColdChain: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-sky-600" />
                      Cold Chain (2-8°C)
                    </span>
                    <span className="text-slate-500 text-[11px]">Active temp sensor</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.protectPatientRecords}
                    onChange={(e) =>
                      setFormData({ ...formData, protectPatientRecords: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-teal-600" />
                      HIPAA Record Shield
                    </span>
                    <span className="text-slate-500 text-[11px]">Sealed chain of custody</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 5: Notes & Handling Instructions */}
            <div className="space-y-1.5">
              <label htmlFor="notes" className="block text-xs font-bold text-slate-700">
                Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Special instructions, access details, handling requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>HIPAA & Chain of Custody Protocol automatically verified upon submission.</span>
              </div>

              <button
                id="submit-request-pickup-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Request...</span>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
