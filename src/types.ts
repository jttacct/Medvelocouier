export type DeliveryType =
  | 'Specimen & Lab Transport'
  | 'Pharmacy Delivery'
  | 'Medical Equipment Transport'
  | 'HIPAA-Compliant Document Delivery'
  | 'STAT & Urgent Delivery'
  | 'Scheduled Route Services';

export type ShipmentStatus =
  | 'order_received'
  | 'courier_dispatched'
  | 'en_route_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'delivered';

export interface ChainOfCustodyEvent {
  id: string;
  timestamp: string;
  status: ShipmentStatus;
  title: string;
  description: string;
  location: string;
  handlerName: string;
  handlerRole: string;
  badgeNumber: string;
  tempReadingCelsius?: number;
  tamperSealVerified?: boolean;
  signature?: string;
}

export interface ProviderNotification {
  id: string;
  timestamp: string;
  channel: 'SMS' | 'Email' | 'EMR Webhook' | 'Portal Alert';
  recipient: string;
  type:
    | 'pickup_confirmed'
    | 'in_transit_temp'
    | 'approaching_destination'
    | 'delivered_signature'
    | 'stat_dispatch'
    | 'status_update';
  title: string;
  message: string;
  isRead: boolean;
}

export interface Shipment {
  trackingNumber: string;
  requisitionId: string;
  facilityFrom: string;
  contactPersonFrom: string;
  phoneFrom: string;
  addressFrom: string;
  facilityTo: string;
  contactPersonTo: string;
  phoneTo: string;
  addressTo: string;
  deliveryType: DeliveryType;
  priority: 'STAT Urgent (Under 60m)' | 'Priority Medical (2-3 Hours)' | 'Scheduled Routine';
  status: ShipmentStatus;
  temperatureCategory: 'Cold Chain (2°C - 8°C)' | 'Frozen (-20°C)' | 'Controlled Room Temp (20°C - 25°C)' | 'Dry Ice / Ultra Cold';
  currentTempCelsius?: number;
  targetTempRange: string;
  estimatedDeliveryTime: string;
  courier: {
    name: string;
    badgeId: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
    hipaaCertified: boolean;
    photoUrl?: string;
  };
  patientRecordHandling: {
    isProtectedPhi: boolean;
    manifestId: string;
    maskingMethod: string;
    chainOfCustodyAuditCode: string;
    custodyWitness?: string;
  };
  specialInstructions: string;
  events: ChainOfCustodyEvent[];
  notifications: ProviderNotification[];
  recipientSignature?: {
    signedBy: string;
    title: string;
    signedAt: string;
    signatureDataUrl?: string;
  };
}

export interface PickupFormData {
  facilityName: string;
  contactPerson: string;
  phone: string;
  email: string;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryType: DeliveryType | '';
  preferredPickupTime: string;
  notes: string;
  isStatUrgent: boolean;
  requiresColdChain: boolean;
  isBiohazard: boolean;
  protectPatientRecords: boolean;
}
