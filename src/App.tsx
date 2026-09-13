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
import { Shipment, ProviderNotification, DeliveryType, ShipmentStatus } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string>('MV-OKC-9824');
  
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
    if (newShipment.notifications.length > 0) {
      setNotifications((prev) => [...newShipment.notifications, ...prev]);
    }
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
    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber === trackingNumber) {
          const statusLabels: Record<ShipmentStatus, string> = {
            order_received: 'Order Received & Logged',
            courier_dispatched: 'Courier En Route to Facility',
            en_route_pickup: 'Courier Arrived at Facility Intake',
            picked_up: 'Specimen Secured & Verified',
            in_transit: 'In Transit with Active Telemetry',
            delivered: 'Delivered & Dual-Party Signed',
          };

          const newEvt = {
            id: `evt-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: nextStatus,
            title: statusLabels[nextStatus],
            description: `Shipment status progressed to ${nextStatus.replace('_', ' ')}. Chain of custody maintained.`,
            location: 'Oklahoma Medical Transport Corridor',
            handlerName: s.courier.name,
            handlerRole: 'Certified Medical Logistics Courier',
            badgeNumber: s.courier.badgeId,
            tempReadingCelsius: s.currentTempCelsius ?? 3.8,
            tamperSealVerified: true,
          };

          const newAlert: ProviderNotification = {
            id: `notif-${Date.now()}`,
            timestamp: 'Just Now',
            channel: 'SMS',
            recipient: s.phoneTo,
            type: nextStatus === 'delivered' ? 'delivered_signature' : 'status_update',
            title: `Status: ${statusLabels[nextStatus]}`,
            message: `MedVelo Alert for ${s.facilityTo}: Package ${s.trackingNumber} status updated to ${statusLabels[nextStatus]}.`,
            isRead: false,
          };

          return {
            ...s,
            status: nextStatus,
            events: [...s.events, newEvt],
            notifications: [newAlert, ...s.notifications],
          };
        }
        return s;
      })
    );

    // Also update global notifications
    const targetShipment = shipments.find((s) => s.trackingNumber === trackingNumber);
    if (targetShipment) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          timestamp: 'Just Now',
          channel: 'SMS',
          recipient: targetShipment.phoneTo,
          type: nextStatus === 'delivered' ? 'delivered_signature' : 'status_update',
          title: `Status: ${nextStatus.replace('_', ' ').toUpperCase()}`,
          message: `MedVelo Alert for ${targetShipment.facilityTo}: Package ${targetShipment.trackingNumber} is now ${nextStatus.replace('_', ' ')}.`,
          isRead: false,
        },
        ...prev,
      ]);
    }
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-sky-500 selection:text-white">
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
    </div>
  );
}
