import React, { useState } from 'react';
import {
  Bell,
  X,
  Smartphone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Send,
  User,
  Phone,
  Settings,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Shipment, ShipmentStatus, NotificationPreferences } from '../types';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment;
  onUpdatePreferences: (preferences: NotificationPreferences) => void;
  onSendAutomatedAlert: (
    shipment: Shipment,
    status: ShipmentStatus,
    channels: { sms: boolean; email: boolean }
  ) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  shipment,
  onUpdatePreferences,
  onSendAutomatedAlert,
}) => {
  const [prefs, setPrefs] = useState<NotificationPreferences>(
    shipment.notificationPreferences || {
      sendSms: true,
      sendEmail: true,
      designatedContactName: shipment.contactPersonTo || 'Attending Clinical Staff',
      designatedPhone: shipment.phoneTo || '(405) 555-0100',
      designatedEmail: shipment.emailTo || 'intake@facility.com',
      notifyOnPickup: true,
      notifyOnEnRoute: true,
      notifyOnDelivery: true,
    }
  );

  const [activePreviewTab, setActivePreviewTab] = useState<'SMS' | 'Email'>('SMS');
  const [simulatedStatus, setSimulatedStatus] = useState<ShipmentStatus>(shipment.status);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences(prefs);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  const handleTriggerNow = (targetStatus: ShipmentStatus) => {
    onSendAutomatedAlert(shipment, targetStatus, {
      sms: prefs.sendSms,
      email: prefs.sendEmail,
    });
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);
  };

  const statusLabel = (st: ShipmentStatus) => {
    switch (st) {
      case 'order_received':
        return 'ORDER RECEIVED';
      case 'courier_dispatched':
        return 'COURIER DISPATCHED';
      case 'en_route_pickup':
        return 'EN ROUTE TO PICKUP';
      case 'picked_up':
        return 'PICKED UP & SECURED';
      case 'in_transit':
        return 'EN ROUTE / IN TRANSIT';
      case 'delivered':
        return 'DELIVERED & SIGNED';
      default:
        return String(st).toUpperCase();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Automated Healthcare Provider Notifications
              </h3>
              <p className="text-xs text-slate-400">
                Configure SMS & Email delivery alerts for shipment{' '}
                <span className="font-mono text-sky-300 font-semibold">{shipment.trackingNumber}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {successToast && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Automated SMS & Email dispatched to designated healthcare contact!
              </span>
              <span className="text-[11px] font-mono text-emerald-600">Delivered</span>
            </div>
          )}

          {/* Form: Designated Contact & Channel Toggles */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Designated Contact Person
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={prefs.designatedContactName}
                    onChange={(e) =>
                      setPrefs({ ...prefs, designatedContactName: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-sky-600 focus:bg-white"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Designated Facility
                </label>
                <input
                  type="text"
                  disabled
                  value={shipment.facilityTo}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  SMS Notification Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={prefs.designatedPhone}
                    onChange={(e) => setPrefs({ ...prefs, designatedPhone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-sky-600 focus:bg-white"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Email Notification Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={prefs.designatedEmail}
                    onChange={(e) => setPrefs({ ...prefs, designatedEmail: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-sky-600 focus:bg-white"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Channels Enabled */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Automated Notification Channels:
              </span>
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={prefs.sendSms}
                    onChange={(e) => setPrefs({ ...prefs, sendSms: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                  />
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Send Automated SMS Texts</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={prefs.sendEmail}
                    onChange={(e) => setPrefs({ ...prefs, sendEmail: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
                  />
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Send Automated Email Alerts</span>
                </label>
              </div>
            </div>

            {/* Event Triggers */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-700 block">Automatic Status Triggers:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={prefs.notifyOnPickup}
                    onChange={(e) => setPrefs({ ...prefs, notifyOnPickup: e.target.checked })}
                    className="w-3.5 h-3.5 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>When Picked Up</span>
                </label>

                <label className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={prefs.notifyOnEnRoute}
                    onChange={(e) => setPrefs({ ...prefs, notifyOnEnRoute: e.target.checked })}
                    className="w-3.5 h-3.5 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>When En Route</span>
                </label>

                <label className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={prefs.notifyOnDelivery}
                    onChange={(e) => setPrefs({ ...prefs, notifyOnDelivery: e.target.checked })}
                    className="w-3.5 h-3.5 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>When Delivered</span>
                </label>
              </div>
            </div>
          </form>

          {/* Live Mockup Preview: What Healthcare Staff Receives */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Live Dispatch Preview:
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('SMS')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activePreviewTab === 'SMS'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    SMS View
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('Email')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activePreviewTab === 'Email'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Email View
                  </button>
                </div>
              </div>

              {/* Status Selector for Preview */}
              <select
                value={simulatedStatus}
                onChange={(e) => setSimulatedStatus(e.target.value as ShipmentStatus)}
                className="text-xs bg-white border border-slate-300 rounded-lg px-2 py-1 font-medium text-slate-700"
              >
                <option value="picked_up">Preview: Picked Up</option>
                <option value="in_transit">Preview: En Route / In Transit</option>
                <option value="delivered">Preview: Delivered</option>
              </select>
            </div>

            {/* Preview Box */}
            {activePreviewTab === 'SMS' ? (
              /* SMS Message Device Preview */
              <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col items-center justify-center">
                <div className="w-full max-w-sm bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-lg space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-700 pb-2">
                    <span className="font-bold text-sky-400 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" />
                      MedVelo Dispatch (+1 405-637-9609)
                    </span>
                    <span>Just Now</span>
                  </div>

                  <div className="p-3 bg-sky-600 rounded-2xl rounded-tl-xs text-white text-xs space-y-1.5 leading-relaxed font-sans shadow-md">
                    <p className="font-bold text-sky-100 flex items-center justify-between">
                      <span>[MedVelo Medical Courier Alert]</span>
                      <span className="text-[10px] bg-sky-700 px-1.5 py-0.5 rounded font-mono">
                        {statusLabel(simulatedStatus)}
                      </span>
                    </p>
                    <p>
                      Shipment ID:{' '}
                      <strong className="font-mono text-sky-200">{shipment.trackingNumber}</strong>
                    </p>
                    <p>
                      Attn: {prefs.designatedContactName} ({shipment.facilityTo})
                    </p>
                    <p>
                      Current Status:{' '}
                      <strong className="underline text-emerald-300">
                        {statusLabel(simulatedStatus)}
                      </strong>
                    </p>
                    <p className="text-[11px] text-sky-100">
                      Courier: {shipment.courier.name} · Temp: {shipment.currentTempCelsius ?? 3.8}°C
                    </p>
                    <p className="text-[10px] text-sky-200 underline pt-1">
                      Track Live GPS: https://medvelocourier.com/track/{shipment.trackingNumber}
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    Sent to {prefs.designatedPhone}
                  </div>
                </div>
              </div>
            ) : (
              /* Email Inbox Preview */
              <div className="p-4 bg-slate-50 text-slate-800 space-y-3 font-sans text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-slate-500">From: </span>
                      <strong className="text-slate-900">
                        MedVelo Automated Dispatch &lt;dispatch@medvelocourier.com&gt;
                      </strong>
                    </div>
                    <span className="text-slate-400 text-[10px]">Just now</span>
                  </div>
                  <div>
                    <span className="text-slate-500">To: </span>
                    <span className="font-semibold text-slate-800">
                      {prefs.designatedContactName} &lt;{prefs.designatedEmail}&gt;
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 pt-1">
                    Subject: [MedVelo Alert] Shipment {shipment.trackingNumber} Status Update:{' '}
                    {statusLabel(simulatedStatus)}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">
                      Healthcare Logistics Status Notification
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>
                        <span className="text-slate-500">Shipment ID:</span>
                        <p className="font-mono font-bold text-sky-700">{shipment.trackingNumber}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Requisition Code:</span>
                        <p className="font-mono">{shipment.requisitionId}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Current Status:</span>
                        <p className="font-bold text-emerald-700">{statusLabel(simulatedStatus)}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Receiving Facility:</span>
                        <p className="font-medium">{shipment.facilityTo}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Courier: {shipment.courier.name} (Badge {shipment.courier.badgeId}) · Cold
                      Chain Sensor: {shipment.currentTempCelsius ?? 3.8}°C
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Dispatch: <strong className="text-slate-700">dispatch@medvelocourier.com</strong></span>
                      <span>Billing: <strong className="text-slate-700">billing@medvelocourier.com</strong></span>
                      <span>Support: <strong className="text-slate-700">info@medvelocourier.com</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            id="trigger-instant-automated-notification-btn"
            onClick={() => handleTriggerNow(simulatedStatus)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>Send Test Alert ({statusLabel(simulatedStatus)})</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-700 border border-slate-200 text-xs font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              id="save-notification-prefs-btn"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
