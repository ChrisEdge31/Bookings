/** 0 = Sunday … 6 = Saturday, matching Date#getUTCDay. */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayHours = {
  day: DayOfWeek;
  open: boolean;
  /** "HH:mm", 24-hour */
  start: string;
  end: string;
};

export type Service = {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  priceCents: number;
  staffIds: string[];
  active: boolean;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
};

export type Provider = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  listedInDirectory: boolean;
  hours: DayHours[];
  services: Service[];
  staff: StaffMember[];
  /** ISO timestamp of the next free slot, if any. */
  nextAvailable?: string;
};

export type BookingStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled"
  | "no_show";

export type Booking = {
  id: string;
  providerSlug: string;
  serviceId: string;
  staffId: string;
  customerId: string;
  /** ISO timestamp */
  startsAt: string;
  status: BookingStatus;
  notes?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  /** ISO timestamp */
  createdAt: string;
};

export type TimeSlot = {
  /** "HH:mm" */
  time: string;
  available: boolean;
};
