import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  Truck,
  MapPin,
  Navigation,
  Thermometer,
  ShieldCheck,
  Radio,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Building,
  User,
  Phone,
  Mail,
  Send,
  ExternalLink,
  Key,
  Layers,
  Maximize2,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Shipment, ShipmentStatus } from '../types';

interface ShipmentTrackingMapProps {
  shipments: Shipment[];
  selectedTrackingNumber: string;
  onSelectTracking: (trackingNumber: string) => void;
  onSimulateNotification: (shipment: Shipment) => void;
  userCreatedTrackingId?: string | null;
}

// Oklahoma City Center coordinates
const OKC_CENTER = { lat: 35.485, lng: -97.525 };

export const ShipmentTrackingMap: React.FC<ShipmentTrackingMapProps> = ({
  shipments,
  selectedTrackingNumber,
  onSelectTracking,
  onSimulateNotification,
  userCreatedTrackingId,
}) => {
  const [apiKey, setApiKey] = useState<string>(
    () => ((import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as string) || ''
  );
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');
  
  // Real-time interval telemetry state
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [updateIntervalSec, setUpdateIntervalSec] = useState<number>(4);
  const [countdown, setCountdown] = useState<number>(4);
  const [pingCount, setPingCount] = useState<number>(1);
  const [lastTelemetryTimestamp, setLastTelemetryTimestamp] = useState<string>('Just now');
  
  // View filter: all active or user's pickup
  const [viewFilter, setViewFilter] = useState<'ALL' | 'MY_PICKUP'>('ALL');

  // Find currently active shipment
  const activeShipment =
    shipments.find((s) => s.trackingNumber === selectedTrackingNumber) || shipments[0];

  // Live interval simulation: tick countdown and trigger telemetry pings
  useEffect(() => {
    if (!isLiveActive) return;

    const intervalTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Trigger Telemetry Ping
          setPingCount((c) => c + 1);
          setLastTelemetryTimestamp(
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          );
          return updateIntervalSec;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, [isLiveActive, updateIntervalSec]);

  // Reset countdown when user changes update interval
  const handleSetInterval = (sec: number) => {
    setUpdateIntervalSec(sec);
    setCountdown(sec);
  };

  const activeShipmentsList = shipments.filter((s) => {
    if (viewFilter === 'MY_PICKUP' && userCreatedTrackingId) {
      return s.trackingNumber === userCreatedTrackingId;
    }
    return true;
  });

  const hasGoogleKey = Boolean(apiKey && apiKey.trim().length > 5);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
      {/* Top Telemetry Control & Status Header */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span
                  className={`w-2 h-2 rounded-full bg-emerald-400 ${
                    isLiveActive ? 'animate-ping' : 'opacity-40'
                  }`}
                ></span>
                {isLiveActive ? 'Live GPS Telemetry Active' : 'GPS Telemetry Paused'}
              </span>

              <span className="text-xs font-mono text-slate-400">
                OKC Metro Fleet Coverage · NIST Sensor Sync
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
              <span>Real-Time Medical Fleet Tracking Map</span>
            </h3>
          </div>

          {/* Telemetry Interval & Controls */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Countdown / Ping Indicator */}
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2 font-mono">
              <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-slate-300">
                Next Ping:{' '}
                <strong className="text-sky-300">
                  {isLiveActive ? `${countdown}s` : 'Paused'}
                </strong>
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Pings: #{pingCount}</span>
            </div>

            {/* Interval Selector */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <span className="text-[11px] text-slate-400 px-1.5">Rate:</span>
              {[3, 5, 10].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleSetInterval(sec)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-semibold transition-all ${
                    updateIntervalSec === sec
                      ? 'bg-sky-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              id="toggle-live-gps-btn"
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLiveActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
              }`}
            >
              {isLiveActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume Pings</span>
                </>
              )}
            </button>

            {/* Google Maps API Key Config Button */}
            <button
              id="open-map-key-modal-btn"
              onClick={() => setShowKeyPrompt(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Configure Google Maps Platform API Key"
            >
              <Key className="w-3.5 h-3.5 text-sky-400" />
              <span>{hasGoogleKey ? 'Maps Key Configured' : 'Google Maps Key'}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills for Active Dispatches */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Filter View:</span>
            <button
              onClick={() => setViewFilter('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                viewFilter === 'ALL'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Active Fleet ({shipments.length})
            </button>

            {userCreatedTrackingId && (
              <button
                id="filter-my-pickup-btn"
                onClick={() => {
                  setViewFilter('MY_PICKUP');
                  onSelectTracking(userCreatedTrackingId);
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  viewFilter === 'MY_PICKUP'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>My Pickup ({userCreatedTrackingId})</span>
              </button>
            )}
          </div>

          <div className="text-slate-400 text-[11px] flex items-center gap-2">
            <span>Last Telemetry Packet:</span>
            <span className="font-mono text-slate-200">{lastTelemetryTimestamp}</span>
          </div>
        </div>
      </div>

      {/* Main Map Stage & Floating Active Details */}
      <div className="relative w-full h-[540px] sm:h-[600px] bg-slate-950 flex flex-col">
        {/* If user configured Google Maps API Key, render @vis.gl/react-google-maps */}
        {hasGoogleKey ? (
          <APIProvider apiKey={apiKey}>
            <div style={{ height: '100%', minHeight: '520px', width: '100%' }}>
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={{
                  lat: activeShipment?.currentLocation?.lat || OKC_CENTER.lat,
                  lng: activeShipment?.currentLocation?.lng || OKC_CENTER.lng,
                }}
                defaultZoom={12}
                gestureHandling="greedy"
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
              >
                {/* Render markers for each active shipment */}
                {activeShipmentsList.map((s) => {
                  const isSelected = s.trackingNumber === activeShipment.trackingNumber;
                  return (
                    <React.Fragment key={s.trackingNumber}>
                      {/* Origin Facility Pin */}
                      <AdvancedMarker
                        position={{ lat: s.originLocation.lat, lng: s.originLocation.lng }}
                        title={`Origin: ${s.facilityFrom}`}
                      >
                        <div className="p-1.5 rounded-full bg-sky-600 text-white shadow-md border-2 border-white text-[10px] flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                        </div>
                      </AdvancedMarker>

                      {/* Destination Facility Pin */}
                      <AdvancedMarker
                        position={{
                          lat: s.destinationLocation.lat,
                          lng: s.destinationLocation.lng,
                        }}
                        title={`Destination: ${s.facilityTo}`}
                      >
                        <div className="p-1.5 rounded-full bg-emerald-600 text-white shadow-md border-2 border-white text-[10px] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                      </AdvancedMarker>

                      {/* Live Courier Vehicle Marker */}
                      <AdvancedMarker
                        position={{
                          lat: s.currentLocation.lat,
                          lng: s.currentLocation.lng,
                        }}
                        onClick={() => onSelectTracking(s.trackingNumber)}
                      >
                        <div
                          className={`relative cursor-pointer transition-transform ${
                            isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                          }`}
                        >
                          <div
                            className={`px-2.5 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 border-2 ${
                              isSelected
                                ? 'bg-slate-900 text-white border-sky-400 ring-4 ring-sky-400/30'
                                : 'bg-slate-900/90 text-white border-slate-600'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
                              <Truck className="w-4 h-4" />
                            </div>
                            <div className="text-left leading-tight">
                              <div className="text-[11px] font-bold font-mono text-sky-300 flex items-center gap-1">
                                <span>{s.trackingNumber}</span>
                                {s.currentTempCelsius && (
                                  <span className="text-[10px] text-emerald-400 font-bold">
                                    {s.currentTempCelsius}°C
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-300">
                                {s.courier.name.split(' ')[0]} · {s.currentLocation.speedMph} mph
                              </div>
                            </div>
                          </div>
                          {/* Pulse beacon */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-sky-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                      </AdvancedMarker>
                    </React.Fragment>
                  );
                })}
              </Map>
            </div>
          </APIProvider>
        ) : (
          /* High-Precision Interactive Vector GPS Map for Oklahoma City Medical Corridor */
          <VectorOkcMedicalMap
            shipments={activeShipmentsList}
            selectedShipment={activeShipment}
            onSelectShipment={(s) => onSelectTracking(s.trackingNumber)}
            pingCount={pingCount}
            isLiveActive={isLiveActive}
            userCreatedTrackingId={userCreatedTrackingId}
          />
        )}

        {/* Floating Real-Time Courier Telemetry Card */}
        {activeShipment && (
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-700/80 text-white space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono font-bold">
                    {activeShipment.trackingNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      activeShipment.status === 'delivered'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {activeShipment.status.replace('_', ' ')}
                  </span>
                  {activeShipment.trackingNumber === userCreatedTrackingId && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                      Your Pickup
                    </span>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {activeShipment.deliveryType}
                </h4>
              </div>

              {/* Instant Automated Notification Trigger */}
              <button
                id="map-simulate-alert-btn"
                onClick={() => onSimulateNotification(activeShipment)}
                className="px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer shrink-0"
                title="Send automated SMS & Email notification for this shipment"
              >
                <Send className="w-3 h-3" />
                <span>Notify</span>
              </button>
            </div>

            {/* GPS Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 block">Speed</span>
                <span className="font-mono font-black text-sky-400 text-sm">
                  {activeShipment.currentLocation?.speedMph ?? 48} mph
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 block">Temperature</span>
                <span className="font-mono font-black text-emerald-400 text-sm flex items-center justify-center gap-0.5">
                  <Thermometer className="w-3 h-3 text-emerald-400" />
                  {activeShipment.currentTempCelsius ?? 3.8}°C
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] text-slate-400 block">GPS Quality</span>
                <span className="font-semibold text-slate-200 text-xs flex items-center justify-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {activeShipment.currentLocation?.gpsSignal ?? '99.8%'}
                </span>
              </div>
            </div>

            {/* Current Position Corridor */}
            <div className="text-xs space-y-1 pt-1 border-t border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Current Road Corridor:</span>
                <span className="font-mono text-slate-300">
                  {activeShipment.currentLocation?.lat.toFixed(4)},{' '}
                  {activeShipment.currentLocation?.lng.toFixed(4)}
                </span>
              </div>
              <p className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">
                  {activeShipment.currentLocation?.streetName ?? 'Oklahoma City Metro Corridor'}
                </span>
              </p>
            </div>

            {/* Designated Provider Contact Notification Status */}
            <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold flex items-center gap-1 text-slate-300">
                  <User className="w-3 h-3 text-sky-400" />
                  Designated Provider Contact:
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  SMS & Email Active
                </span>
              </div>
              <p className="font-medium text-slate-200 truncate">
                {activeShipment.contactPersonTo} · {activeShipment.facilityTo}
              </p>
              <div className="flex items-center gap-3 text-slate-400 font-mono text-[10px]">
                <span>Phone: {activeShipment.phoneTo}</span>
                {activeShipment.emailTo && <span>Email: {activeShipment.emailTo}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Floating Quick Vehicle Switcher (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-30 hidden sm:flex flex-col gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700 shadow-xl space-y-1 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Select Courier Unit
            </span>
            <div className="space-y-1">
              {shipments.map((s) => (
                <button
                  key={s.trackingNumber}
                  id={`map-select-shipment-${s.trackingNumber}`}
                  onClick={() => onSelectTracking(s.trackingNumber)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between gap-3 ${
                    activeShipment?.trackingNumber === s.trackingNumber
                      ? 'bg-sky-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        s.status === 'delivered' ? 'bg-emerald-400' : 'bg-sky-400'
                      }`}
                    ></span>
                    <span>{s.trackingNumber}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {s.courier.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps API Key Modal Prompt */}
      {showKeyPrompt && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-sky-600" />
                <h4 className="text-base font-bold text-slate-900">Google Maps Platform Key</h4>
              </div>
              <button
                onClick={() => setShowKeyPrompt(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your Google Maps Platform API key or Maps Demo Key to render the full Google
              JavaScript Maps SDK with satellite overlays and street-level controls.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setApiKey('');
                  setShowKeyPrompt(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
              >
                Use Built-in Vector Map
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowKeyPrompt(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  id="save-maps-key-btn"
                  onClick={() => {
                    if (tempKeyInput.trim()) {
                      setApiKey(tempKeyInput.trim());
                    }
                    setShowKeyPrompt(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 shadow-sm"
                >
                  Apply Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * High-precision Vector GPS Map of Oklahoma City Medical Corridors
 * Renders major highways (I-44, I-35, I-40, NW Expressway, Lincoln Blvd, Broadway Ext),
 * hospital landmarks, and animated courier positions with real-time interval telemetry.
 */
interface VectorOkcMedicalMapProps {
  shipments: Shipment[];
  selectedShipment: Shipment;
  onSelectShipment: (shipment: Shipment) => void;
  pingCount: number;
  isLiveActive: boolean;
  userCreatedTrackingId?: string | null;
}

const VectorOkcMedicalMap: React.FC<VectorOkcMedicalMapProps> = ({
  shipments,
  selectedShipment,
  onSelectShipment,
  pingCount,
  isLiveActive,
  userCreatedTrackingId,
}) => {
  // Oklahoma City bounding box:
  // Lat: 35.35 (South) to 35.65 (North)
  // Lng: -97.65 (West) to -97.40 (East)
  const mapBounds = {
    minLat: 35.37,
    maxLat: 35.63,
    minLng: -97.64,
    maxLng: -97.41,
  };

  const projectCoord = (lat: number, lng: number, width = 1000, height = 600) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width;
    // Invert Y because latitude goes North (+) while SVG Y goes down (+)
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * height;
    return { x, y };
  };

  // Hospital Facilities in Oklahoma City
  const okcLandmarks = [
    {
      name: 'Integris Baptist Medical Center',
      shortName: 'Integris Baptist',
      lat: 35.5255,
      lng: -97.575,
      type: 'Hospital',
    },
    {
      name: 'Oklahoma Blood Institute Ref Lab',
      shortName: 'OBI Lab',
      lat: 35.4795,
      lng: -97.4985,
      type: 'Laboratory',
    },
    {
      name: 'OU Health Medical Center',
      shortName: 'OU Health',
      lat: 35.482,
      lng: -97.497,
      type: 'University Hospital',
    },
    {
      name: 'Mercy Hospital OKC',
      shortName: 'Mercy Hospital',
      lat: 35.611,
      lng: -97.595,
      type: 'Oncology Center',
    },
    {
      name: 'SSM Health St. Anthony Hospital',
      shortName: 'St. Anthony',
      lat: 35.4785,
      lng: -97.525,
      type: 'Regional Hospital',
    },
    {
      name: 'Oklahoma Heart Hospital South',
      shortName: 'OK Heart South',
      lat: 35.39,
      lng: -97.43,
      type: 'Cardiology Center',
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#0b1120] overflow-hidden select-none">
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Subtle grid lines */}
        <defs>
          <pattern id="okc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#okc-grid)" />

        {/* Major Oklahoma City Arteries & Highway Networks */}
        {/* I-40 East-West */}
        <line
          x1="0"
          y1="380"
          x2="1000"
          y2="380"
          stroke="#1e293b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="380"
          x2="1000"
          y2="380"
          stroke="#334155"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="40" y="374" fill="#64748b" fontSize="10" fontFamily="monospace">
          INTERSTATE 40 (OKC CROSSTOWN)
        </text>

        {/* I-35 North-South */}
        <line
          x1="760"
          y1="0"
          x2="760"
          y2="600"
          stroke="#1e293b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="760"
          y1="0"
          x2="760"
          y2="600"
          stroke="#334155"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text
          x="770"
          y="50"
          fill="#64748b"
          fontSize="10"
          fontFamily="monospace"
          transform="rotate(90, 770, 50)"
        >
          INTERSTATE 35 (NORTH-SOUTH MEDICAL CORRIDOR)
        </text>

        {/* I-44 Diagonal Corridor */}
        <path
          d="M 120 180 Q 400 240 760 300"
          fill="none"
          stroke="#1e293b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 120 180 Q 400 240 760 300"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="250" y="200" fill="#64748b" fontSize="10" fontFamily="monospace">
          I-44 / WILL ROGERS CORRIDOR
        </text>

        {/* NW Expressway Corridor */}
        <path
          d="M 50 120 L 450 340"
          fill="none"
          stroke="#1e293b"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 50 120 L 450 340"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x="80" y="110" fill="#64748b" fontSize="10" fontFamily="monospace">
          NW EXPRESSWAY
        </text>

        {/* Lincoln Blvd Medical Mile */}
        <line
          x1="620"
          y1="180"
          x2="620"
          y2="420"
          stroke="#1e293b"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="620"
          y1="180"
          x2="620"
          y2="420"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <text x="630" y="240" fill="#64748b" fontSize="9" fontFamily="monospace">
          N LINCOLN BLVD (HEALTH CENTER PKWY)
        </text>

        {/* Hospital & Lab Landmarks */}
        {okcLandmarks.map((lm, idx) => {
          const pt = projectCoord(lm.lat, lm.lng);
          return (
            <g key={idx} className="cursor-pointer group">
              {/* Landmark glow */}
              <circle cx={pt.x} cy={pt.y} r="6" fill="#0284c7" opacity="0.4" />
              <circle cx={pt.x} cy={pt.y} r="3.5" fill="#38bdf8" />
              <text
                x={pt.x + 8}
                y={pt.y + 4}
                fill="#cbd5e1"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
                className="group-hover:fill-sky-300 transition-colors"
              >
                {lm.shortName}
              </text>
              <text x={pt.x + 8} y={pt.y + 16} fill="#64748b" fontSize="9">
                {lm.type}
              </text>
            </g>
          );
        })}

        {/* Active Shipment Routes & Vectors */}
        {shipments.map((s) => {
          const isSelected = s.trackingNumber === selectedShipment?.trackingNumber;
          const originPt = projectCoord(s.originLocation.lat, s.originLocation.lng);
          const destPt = projectCoord(s.destinationLocation.lat, s.destinationLocation.lng);

          // Calculate animated waypoint path
          const pathD = s.routeWaypoints
            .map((wp, i) => {
              const pt = projectCoord(wp.lat, wp.lng);
              return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
            })
            .join(' ');

          return (
            <g key={`route-${s.trackingNumber}`}>
              {/* Dashed Route line */}
              <path
                d={pathD}
                fill="none"
                stroke={isSelected ? '#0284c7' : '#334155'}
                strokeWidth={isSelected ? 3.5 : 1.5}
                strokeDasharray={isSelected ? '6 4' : '4 4'}
                opacity={isSelected ? 0.9 : 0.4}
              />

              {/* Origin Marker */}
              <circle cx={originPt.x} cy={originPt.y} r="5" fill="#0284c7" stroke="#fff" strokeWidth="1.5" />
              {/* Destination Marker */}
              <circle cx={destPt.x} cy={destPt.y} r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Active Courier Vehicles */}
        {shipments.map((s) => {
          const isSelected = s.trackingNumber === selectedShipment?.trackingNumber;
          // Calculate interpolated position based on pingCount for smooth movement along Oklahoma routes
          const totalPts = s.routeWaypoints.length;
          const dynamicIndex = (s.currentWaypointIndex + (isLiveActive ? (pingCount % 3) : 0)) % totalPts;
          const currentWaypoint = s.routeWaypoints[dynamicIndex] || s.currentLocation;
          const pt = projectCoord(currentWaypoint.lat, currentWaypoint.lng);

          return (
            <g
              key={`vehicle-${s.trackingNumber}`}
              transform={`translate(${pt.x}, ${pt.y})`}
              className="cursor-pointer"
              onClick={() => onSelectShipment(s)}
            >
              {/* Pulse waves */}
              <circle
                cx="0"
                cy="0"
                r={isSelected ? '22' : '14'}
                fill="#38bdf8"
                opacity="0.2"
                className={isLiveActive ? 'animate-ping' : ''}
              />
              <circle
                cx="0"
                cy="0"
                r={isSelected ? '12' : '9'}
                fill={isSelected ? '#0284c7' : '#1e293b'}
                stroke={isSelected ? '#38bdf8' : '#94a3b8'}
                strokeWidth="2"
              />

              {/* Center Dot */}
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" />

              {/* Floating Vehicle Label */}
              <g transform="translate(14, -10)">
                <rect
                  x="-4"
                  y="-14"
                  width="110"
                  height="26"
                  rx="6"
                  fill={isSelected ? '#0f172a' : '#1e293b'}
                  stroke={isSelected ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                />
                <text x="4" y="0" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  {s.trackingNumber}
                </text>
                <text x="4" y="9" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
                  {s.courier.name.split(' ')[0]} · {s.currentLocation.speedMph} mph
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Map Attribution & Info Legend */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-3 text-[11px] text-slate-400 bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-800">
        <span className="flex items-center gap-1 text-sky-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          MedVelo OKC Telemetry Core
        </span>
        <span>•</span>
        <span>4-Second Interval Sync</span>
        <span>•</span>
        <span className="text-emerald-400 font-medium">HIPAA BAA Protected</span>
      </div>
    </div>
  );
};
