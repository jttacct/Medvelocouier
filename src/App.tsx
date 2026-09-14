import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrackingSection } from './components/TrackingSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { RequestPickupSection } from './components/RequestPickupSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProviderNotificationsDrawer } from './components/ProviderNotificationsDrawer';
import { PartnerModal } from './components/PartnerModal';
import { INITIAL_SHIPMENTS } from './data/mockShipments';
import {
  Shipment,
  ProviderNotification,
  DeliveryType,
  ShipmentStatus,
  NotificationPreferences,
} from './types';
import { Bell, Smartphone, Mail, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string>('MV-OKC-9824');
  const [userCreatedTrackingId, setUserCreatedTrackingId] = useState<string | null>(null);

  // Status update toast alert
  const [statusToast, setStatusToast] = useState<{
    show: boolean;
    title: string;
    message: string;
    shipmentId: string;
    status: string;
    recipient: string;
  } | null>(null);
  
  // Aggregate notifications from all shipments + new system broadcasts
  const [notifications, setNotifications] = useState<ProviderNotification[]>(() => {
    const all = INITIAL_SHIPMENTS.flatMap((s) => s.notifications);
    return all;
  });

  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState<boolean>(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);

  // Form prefill parameters
  const [prefillService, setPrefillService] = useState<DeliveryType | ''>('');
  const [prefillStat, setPrefillStat] = useState<boolean>(false);
  const [prefillColdChain, setPrefillColdChain] = useState<boolean>(false);
  const [prefillBiohazard, setPrefillBiohazard] = useState<boolean>(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenTracking = (trackingNumber?: string) => {
    if (trackingNumber) {
      setSelectedTrackingNumber(trackingNumber);
    }
    handleNavigate('tracking');
  };

  const handleRequestPickupClick = () => {
    setPrefillService('');
    setPrefillStat(false);
    setPrefillColdChain(false);
    setPrefillBiohazard(false);
    handleNavigate('request-pickup');
  };

  const handleSelectServiceForPickup = (service: DeliveryType) => {
    setPrefillService(service);
    setPrefillStat(service === 'STAT & Urgent Delivery');
    setPrefillColdChain(service === 'Specimen & Lab Transport');
    handleNavigate('request-pickup');
  };

  const handleApplyQuote = (quote: {
    serviceType: DeliveryType;
    estimatedCost: string;
    isStat: boolean;
    isColdChain: boolean;
    isBiohazard: boolean;
  }) => {
    setPrefillService(quote.serviceType);
    setPrefillStat(quote.isStat);
    setPrefillColdChain(quote.isColdChain);
    setPrefillBiohazard(quote.isBiohazard);
    handleNavigate('request-pickup');
  };

  const handlePickupCreated = (newShipment: Shipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    setSelectedTrackingNumber(newShipment.trackingNumber);
    setUserCreatedTrackingId(newShipment.trackingNumber);
    if (newShipment.notifications.length > 0) {
      setNotifications((prev) => [...newShipment.notifications, ...prev]);
    }
  };

  const handleUpdateNotificationPreferences = (
    trackingNumber: string,
    preferences: NotificationPreferences
  ) => {
    setShipments((prev) =>
      prev.map((s) => (s.trackingNumber === trackingNumber ? { ...s, notificationPreferences: preferences } : s))
    );
  };

  const handleAddNotification = (newNotif: ProviderNotification) => {
    setNotifications((prev) => [newNotif, ...prev]);
    // Also push to selected shipment
    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber === selectedTrackingNumber) {
          return {
            ...s,
            notifications: [newNotif, ...s.notifications],
          };
        }
        return s;
      })
    );
  };

  const handleUpdateShipmentStatus = (trackingNumber: string, nextStatus: ShipmentStatus) => {
    const statusLabels: Record<ShipmentStatus, string> = {
      order_received: 'Order Received & Logged',
      courier_dispatched: 'Courier En Route to Facility',
      en_route_pickup: 'Courier Arrived at Facility Intake',
      picked_up: 'Specimen Secured & Verified',
      in_transit: 'In Transit with Active Telemetry',
      delivered: 'Delivered & Dual-Party Signed',
    };

    const targetShipment = shipments.find((s) => s.trackingNumber === trackingNumber);
    const prefs = targetShipment?.notificationPreferences;
    const designatedName = prefs?.designatedContactName || targetShipment?.contactPersonTo || 'Attending Clinical Staff';
    const designatedPhone = prefs?.designatedPhone || targetShipment?.phoneTo || '(405) 555-0100';
    const designatedEmail = prefs?.designatedEmail || targetShipment?.emailTo || 'intake@facility.com';

    const sendSms = prefs?.sendSms ?? true;
    const sendEmail = prefs?.sendEmail ?? true;

    const generatedAlerts: ProviderNotification[] = [];

    // Automated SMS Alert
    if (sendSms && targetShipment) {
      generatedAlerts.push({
        id: `notif-sms-${Date.now()}`,
        timestamp: 'Just Now',
        channel: 'SMS',
        recipient: `${designatedPhone} (${designatedName})`,
        type: nextStatus === 'delivered' ? 'delivered_signature' : 'status_update',
        title: `Automated SMS: Status ${statusLabels[nextStatus]}`,
        message: `[MedVelo SMS Alert] Attn: ${designatedName}. Shipment ID ${trackingNumber} status updated to: ${statusLabels[nextStatus]}. Location: Oklahoma Medical Corridor. Temp: ${targetShipment.currentTempCelsius ?? 3.8}°C. Verified by Courier ${targetShipment.courier.name}.`,
        isRead: false,
        details: {
          shipmentId: trackingNumber,
          currentStatus: statusLabels[nextStatus],
          facilityName: targetShipment.facilityTo,
          contactPerson: designatedName,
          phone: designatedPhone,
        },
      });
    }

    // Automated Email Alert
    if (sendEmail && targetShipment) {
      generatedAlerts.push({
        id: `notif-email-${Date.now()}`,
        timestamp: 'Just Now',
        channel: 'Email',
        recipient: designatedEmail,
        type: nextStatus === 'delivered' ? 'delivered_signature' : 'status_update',
        title: `Automated Email: Shipment ${trackingNumber} ${statusLabels[nextStatus]}`,
        message: `Automated MedVelo dispatch notification for ${targetShipment.facilityTo}. Shipment ID: ${trackingNumber}. Current Status: ${statusLabels[nextStatus]}. Courier: ${targetShipment.courier.name} (${targetShipment.courier.badgeId}). Temperature: ${targetShipment.currentTempCelsius ?? 3.8}°C. Chain of Custody Token: ${targetShipment.patientRecordHandling.chainOfCustodyAuditCode}.`,
        isRead: false,
        details: {
          shipmentId: trackingNumber,
          currentStatus: statusLabels[nextStatus],
          facilityName: targetShipment.facilityTo,
          contactPerson: designatedName,
          email: designatedEmail,
        },
      });
    }

    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber === trackingNumber) {
          const newEvt = {
            id: `evt-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: nextStatus,
            title: statusLabels[nextStatus],
            description: `Shipment status progressed to ${nextStatus.replace('_', ' ')}. Automated provider SMS/Email dispatched to ${designatedName}. Chain of custody verified.`,
            location: 'Oklahoma Medical Transport Corridor',
            handlerName: s.courier.name,
            handlerRole: 'Certified Medical Logistics Courier',
            badgeNumber: s.courier.badgeId,
            tempReadingCelsius: s.currentTempCelsius ?? 3.8,
            tamperSealVerified: true,
          };

          return {
            ...s,
            status: nextStatus,
            events: [...s.events, newEvt],
            notifications: [...generatedAlerts, ...s.notifications],
          };
        }
        return s;
      })
    );

    // Global notifications feed
    if (generatedAlerts.length > 0) {
      setNotifications((prev) => [...generatedAlerts, ...prev]);
    }

    // Trigger visual toast
    setStatusToast({
      show: true,
      title: `Automated Alert Sent: ${statusLabels[nextStatus]}`,
      message: `Notifications dispatched to ${designatedName}. Shipment ID: ${trackingNumber}, Status: ${statusLabels[nextStatus]}.`,
      shipmentId: trackingNumber,
      status: statusLabels[nextStatus],
      recipient: designatedName,
    });

    setTimeout(() => {
      setStatusToast(null);
    }, 4500);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleSendCustomProviderNotification = (
    channel: 'SMS' | 'Email' | 'EMR Webhook',
    message: string
  ) => {
    const alert: ProviderNotification = {
      id: `alert-${Date.now()}`,
      timestamp: 'Just Now',
      channel,
      recipient: '(405) 297-5000 (Receiving Pathology)',
      type: 'status_update',
      title: `Simulated Provider Alert (${channel})`,
      message,
      isRead: false,
    };
    setNotifications((prev) => [alert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-500 selection:text-white relative">
      {/* Sticky Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onRequestPickupClick={handleRequestPickupClick}
        onOpenTracking={handleOpenTracking}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsDrawerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero & Real-time Search */}
        <div id="home">
          <HeroSection
            onRequestPickup={handleRequestPickupClick}
            onPartnerWithUs={() => setIsPartnerModalOpen(true)}
            onSearchTracking={handleOpenTracking}
            onSelectService={handleSelectServiceForPickup}
          />
        </div>

        {/* Section 2: Real-time Live Tracking & Secure Chain of Custody */}
        <TrackingSection
          shipments={shipments}
          selectedTrackingNumber={selectedTrackingNumber}
          onSelectTracking={setSelectedTrackingNumber}
          onAddNotification={handleAddNotification}
          onUpdateShipmentStatus={handleUpdateShipmentStatus}
          onRequestNewPickup={handleRequestPickupClick}
          userCreatedTrackingId={userCreatedTrackingId}
          onUpdateNotificationPreferences={handleUpdateNotificationPreferences}
        />

        {/* Section 3: About MedVelo */}
        <AboutSection
          onRequestPickup={handleRequestPickupClick}
          onPartnerWithUs={() => setIsPartnerModalOpen(true)}
        />

        {/* Section 4: Comprehensive Medical Logistics Services */}
        <ServicesSection onRequestPickupForService={handleSelectServiceForPickup} />

        {/* Section 5: Transparent Pricing & Interactive Rate Estimator */}
        <PricingSection
          onRequestPickupWithQuote={handleApplyQuote}
          onContactCustomQuote={() => handleNavigate('contact')}
        />

        {/* Section 6: Request a Pickup Form */}
        <RequestPickupSection
          initialService={prefillService}
          initialIsStat={prefillStat}
          initialIsColdChain={prefillColdChain}
          initialIsBiohazard={prefillBiohazard}
          onPickupCreated={handlePickupCreated}
          onTrackNow={handleOpenTracking}
        />

        {/* Section 7: Contact & Dispatch Support */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onRequestPickup={handleRequestPickupClick} />

      {/* Automated Healthcare Provider Notifications Drawer */}
      <ProviderNotificationsDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSendTestNotification={handleSendCustomProviderNotification}
      />

      {/* Hospital & Healthcare Network Partner Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

      {/* Automated Status Notification Toast */}
      {statusToast && (
        <div
          id="automated-status-toast"
          className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-sky-500/40 flex items-start gap-3.5 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-sky-400 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                Automated Alert Dispatched
              </span>
              <button
                type="button"
                onClick={() => setStatusToast(null)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h5 className="font-bold text-sm text-white mt-1">{statusToast.title}</h5>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{statusToast.message}</p>
            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-300 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                ID: {statusToast.shipmentId}
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/50">
                {statusToast.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
