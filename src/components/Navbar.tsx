import React, { useState } from 'react';
import { ShieldCheck, Phone, Bell, Menu, X, Clock, MapPin, Activity } from 'lucide-react';
import { ProviderNotification } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestPickupClick: () => void;
  onOpenTracking: (trackingNumber?: string) => void;
  notifications: ProviderNotification[];
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onRequestPickupClick,
  onOpenTracking,
  notifications,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'tracking', label: 'Live Tracking' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top STAT Emergency & Dispatch Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 STAT Dispatch Active
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline flex items-center gap-1 text-slate-300 text-xs">
              <MapPin className="w-3 h-3 text-sky-400" />
              Serving Oklahoma City & Statewide Healthcare Facilities
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-slate-300 hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Mon–Fri: 7 AM – 7 PM (STAT 24/7)
            </span>
            <a
              id="header-phone-hotline"
              href="tel:4056379609"
              className="flex items-center gap-1.5 font-bold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>(405) 637-9609</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-700 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Activity className="w-6 h-6 text-white stroke-[2.2]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                  MedVelo
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                  OKC
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                Medical Courier Services
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  activeSection === item.id
                    ? 'text-sky-700 bg-sky-50 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Automated Provider Notifications Bell */}
            <button
              id="provider-notifications-bell-btn"
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/70"
              title="Provider Automated Status Notifications"
              aria-label="Provider Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Quick Track Direct Trigger */}
            <button
              id="quick-nav-track-btn"
              onClick={() => onOpenTracking()}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              Track Shipment
            </button>

            {/* Request Pickup Primary CTA */}
            <button
              id="header-request-pickup-cta"
              onClick={onRequestPickupClick}
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 shadow-md shadow-sky-600/25 hover:shadow-lg transition-all duration-150 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Request Pickup</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-notif-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white"></span>
              )}
            </button>
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold ${
                activeSection === item.id
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-track-btn"
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center rounded-lg text-slate-800 bg-slate-100 font-semibold text-sm"
            >
              Track Live Shipment
            </button>
            <button
              id="mobile-request-pickup-btn"
              onClick={() => {
                onRequestPickupClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 text-center rounded-lg text-white bg-sky-600 hover:bg-sky-700 font-bold text-sm shadow-md"
            >
              Request a Pickup
            </button>
            <a
              id="mobile-phone-call-btn"
              href="tel:4056379609"
              className="flex items-center justify-center gap-2 py-2 text-sky-700 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              Call Dispatch: (405) 637-9609
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
