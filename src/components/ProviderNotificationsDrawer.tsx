import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Mail,
  Server,
  Send,
  Filter,
  CheckCheck,
} from 'lucide-react';
import { ProviderNotification } from '../types';

interface ProviderNotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: ProviderNotification[];
  onMarkAllAsRead: () => void;
  onSendTestNotification: (channel: 'SMS' | 'Email' | 'EMR Webhook', message: string) => void;
}

export const ProviderNotificationsDrawer: React.FC<ProviderNotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSendTestNotification,
}) => {
  const [filterChannel, setFilterChannel] = useState<'ALL' | 'SMS' | 'Email' | 'EMR Webhook'>('ALL');
  const [testChannel, setTestChannel] = useState<'SMS' | 'Email' | 'EMR Webhook'>('SMS');
  const [testCustomMsg, setTestCustomMsg] = useState('');

  if (!isOpen) return null;

  const filtered = notifications.filter(
    (n) => filterChannel === 'ALL' || n.channel === filterChannel
  );

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      testCustomMsg.trim() ||
      `STAT Alert: Specimen batch arrived at OU Health Pathology Intake. Verified cold-chain reading 3.6°C. Handed to accessioning.`;
    onSendTestNotification(testChannel, msg);
    setTestCustomMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Provider Notification System
              </h3>
              <p className="text-xs text-slate-400">Automated Dispatch & Custody Alerts</p>
            </div>
          </div>
          <button
            id="close-notifs-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Mark Read */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {(['ALL', 'SMS', 'Email', 'EMR Webhook'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setFilterChannel(ch)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  filterChannel === ch
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <button
            id="mark-all-read-btn"
            onClick={onMarkAllAsRead}
            className="text-[11px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark read</span>
          </button>
        </div>

        {/* Notifications Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-2 text-slate-400">
              <Bell className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-sm font-medium">No alerts matching this filter.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                  item.isRead
                    ? 'bg-white border-slate-200'
                    : 'bg-sky-50/50 border-sky-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {item.channel === 'SMS' && (
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    {item.channel === 'Email' && <Mail className="w-3.5 h-3.5 text-blue-600" />}
                    {item.channel === 'EMR Webhook' && (
                      <Server className="w-3.5 h-3.5 text-purple-600" />
                    )}
                    <span className="font-bold text-slate-800 text-[11px]">{item.channel}</span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg font-mono text-[11px] leading-relaxed border border-slate-100">
                  {item.message}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>To: {item.recipient}</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Dispatched
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Live Test Trigger Form */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Simulate Live Provider Notification</span>
            </span>
            <div className="flex items-center gap-1">
              {(['SMS', 'Email', 'EMR Webhook'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setTestChannel(c)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    testChannel === c ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendTest} className="flex gap-2">
            <input
              type="text"
              placeholder="Custom notification text (optional)..."
              value={testCustomMsg}
              onChange={(e) => setTestCustomMsg(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
            <button
              id="trigger-test-alert-submit-btn"
              type="submit"
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Send Alert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
