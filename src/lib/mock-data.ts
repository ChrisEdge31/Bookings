/**
 * Placeholder data so every screen renders something realistic.
 * Replace these functions with real queries; the pages only depend on the
 * function signatures and the types in `@/lib/types`.
 */
import type {
  Booking,
  Customer,
  DayHours,
  Provider,
  TimeSlot,
} from "@/lib/types";

/** The "current" moment for mock data. Swap for `new Date()` with real data. */
export const MOCK_NOW = "2026-10-05T08:00:00Z";

/** The signed-in business owner's provider, for /dashboard. */
export const CURRENT_PROVIDER_SLUG = "northside-barbers";

/** The signed-in customer, for /account. */
export const CURRENT_CUSTOMER_ID = "c1";

const weekdayHours = (start = "09:00", end = "17:30"): DayHours[] => [
  { day: 1, open: true, start, end },
  { day: 2, open: true, start, end },
  { day: 3, open: true, start, end },
  { day: 4, open: true, start, end: "19:00" },
  { day: 5, open: true, start, end },
  { day: 6, open: true, start: "10:00", end: "15:00" },
  { day: 0, open: false, start: "10:00", end: "15:00" },
];

const providers: Provider[] = [
  {
    slug: "northside-barbers",
    name: "Northside Barbers",
    category: "Barber",
    tagline: "Cuts, fades and hot towel shaves",
    description:
      "A three-chair shop on Elm Street. Walk-ins when we can, but booking gets you the chair you want at the time you want.",
    address: "214 Elm Street",
    city: "Cape Town",
    phone: "021 555 0142",
    email: "hello@northsidebarbers.example",
    listedInDirectory: true,
    hours: weekdayHours(),
    nextAvailable: "2026-10-05T11:15:00Z",
    staff: [
      {
        id: "st1",
        name: "Sam Okafor",
        role: "Owner, barber",
        email: "sam@northsidebarbers.example",
        phone: "021 555 0100",
      },
      {
        id: "st2",
        name: "Rosa Lindqvist",
        role: "Barber",
        email: "rosa@northsidebarbers.example",
      },
      {
        id: "st3",
        name: "Theo Marsh",
        role: "Junior barber",
        email: "theo@northsidebarbers.example",
      },
    ],
    services: [
      {
        id: "s1",
        name: "Skin fade",
        description: "Clipper fade down to the skin, scissor work on top.",
        durationMinutes: 45,
        priceCents: 17500,
        staffIds: ["st1", "st2"],
        active: true,
      },
      {
        id: "s2",
        name: "Classic cut",
        description: "Scissor or clipper cut, washed and styled.",
        durationMinutes: 30,
        priceCents: 14000,
        staffIds: ["st1", "st2", "st3"],
        active: true,
      },
      {
        id: "s3",
        name: "Beard trim",
        description: "Shape-up and line-up with a hot towel finish.",
        durationMinutes: 20,
        priceCents: 7500,
        staffIds: ["st1", "st2", "st3"],
        active: true,
      },
      {
        id: "s4",
        name: "Cut and beard",
        durationMinutes: 60,
        priceCents: 22500,
        staffIds: ["st1", "st2"],
        active: true,
      },
      {
        id: "s5",
        name: "Hot towel shave",
        description: "Straight razor shave with pre-shave oil and hot towels.",
        durationMinutes: 40,
        priceCents: 16000,
        staffIds: ["st1"],
        active: false,
      },
    ],
  },
  {
    slug: "harbour-physio",
    name: "Harbour Physio",
    category: "Physiotherapy",
    tagline: "Sports injuries and back pain",
    description:
      "Assessment and treatment for sports injuries, back and neck pain, and post-surgery rehab.",
    address: "88 Front Avenue, Suite 3",
    city: "Cape Town",
    phone: "021 555 0187",
    email: "clinic@harbourphysio.example",
    listedInDirectory: true,
    hours: weekdayHours("08:00", "18:00"),
    nextAvailable: "2026-10-06T08:30:00Z",
    staff: [
      {
        id: "hp1",
        name: "Dr. Priya Nair",
        role: "Physiotherapist",
        email: "priya@harbourphysio.example",
      },
    ],
    services: [
      {
        id: "hp-s1",
        name: "Initial assessment",
        durationMinutes: 60,
        priceCents: 55000,
        staffIds: ["hp1"],
        active: true,
      },
      {
        id: "hp-s2",
        name: "Follow-up session",
        durationMinutes: 30,
        priceCents: 35000,
        staffIds: ["hp1"],
        active: true,
      },
    ],
  },
  {
    slug: "muddy-paws",
    name: "Muddy Paws Grooming",
    category: "Pet grooming",
    tagline: "Baths, trims and nail clips for dogs of every size",
    description:
      "Calm, unhurried grooming. We book one dog at a time so nobody waits in a cage.",
    address: "1290 Division Street",
    city: "Cape Town",
    phone: "021 555 0119",
    email: "woof@muddypaws.example",
    listedInDirectory: true,
    hours: weekdayHours("08:30", "16:00"),
    nextAvailable: "2026-10-07T09:00:00Z",
    staff: [
      {
        id: "mp1",
        name: "Jess Moreno",
        role: "Groomer",
        email: "jess@muddypaws.example",
      },
    ],
    services: [
      {
        id: "mp-s1",
        name: "Bath and tidy, small dog",
        durationMinutes: 60,
        priceCents: 27500,
        staffIds: ["mp1"],
        active: true,
      },
      {
        id: "mp-s2",
        name: "Full groom, large dog",
        durationMinutes: 120,
        priceCents: 47500,
        staffIds: ["mp1"],
        active: true,
      },
      {
        id: "mp-s3",
        name: "Nail clip",
        durationMinutes: 15,
        priceCents: 7500,
        staffIds: ["mp1"],
        active: true,
      },
    ],
  },
  {
    slug: "studio-nine-nails",
    name: "Studio Nine Nails",
    category: "Nail salon",
    tagline: "Gel, BIAB and nail art",
    description: "Small studio, two techs, a lot of colours.",
    address: "9 Alder Street",
    city: "Johannesburg",
    phone: "011 555 0163",
    email: "book@studionine.example",
    listedInDirectory: true,
    hours: weekdayHours("10:00", "19:00"),
    nextAvailable: "2026-10-05T15:00:00Z",
    staff: [
      {
        id: "sn1",
        name: "Mei Tanaka",
        role: "Nail tech",
        email: "mei@studionine.example",
      },
      {
        id: "sn2",
        name: "Ava Brooks",
        role: "Nail tech",
        email: "ava@studionine.example",
      },
    ],
    services: [
      {
        id: "sn-s1",
        name: "Gel manicure",
        durationMinutes: 45,
        priceCents: 20000,
        staffIds: ["sn1", "sn2"],
        active: true,
      },
      {
        id: "sn-s2",
        name: "BIAB infill",
        durationMinutes: 75,
        priceCents: 27500,
        staffIds: ["sn1"],
        active: true,
      },
    ],
  },
  {
    slug: "ridgeline-pt",
    name: "Ridgeline Personal Training",
    category: "Personal training",
    tagline: "One-to-one strength coaching",
    description:
      "Private gym sessions focused on strength, mobility and sticking with it.",
    address: "402 Burnside Street",
    city: "Cape Town",
    phone: "021 555 0175",
    email: "coach@ridgeline.example",
    listedInDirectory: true,
    hours: weekdayHours("06:00", "20:00"),
    staff: [
      {
        id: "rp1",
        name: "Marcus Hale",
        role: "Coach",
        email: "marcus@ridgeline.example",
      },
    ],
    services: [
      {
        id: "rp-s1",
        name: "Training session",
        durationMinutes: 60,
        priceCents: 42500,
        staffIds: ["rp1"],
        active: true,
      },
    ],
  },
  {
    slug: "ink-and-anchor",
    name: "Ink & Anchor",
    category: "Tattoo studio",
    tagline: "Custom work and flash days",
    description:
      "Book a consultation to talk through your idea before we schedule the session.",
    address: "55 Pike Street",
    city: "Johannesburg",
    phone: "011 555 0131",
    email: "studio@inkandanchor.example",
    listedInDirectory: true,
    hours: weekdayHours("12:00", "20:00"),
    nextAvailable: "2026-10-09T13:00:00Z",
    staff: [
      {
        id: "ia1",
        name: "Noor Haddad",
        role: "Artist",
        email: "noor@inkandanchor.example",
      },
    ],
    services: [
      {
        id: "ia-s1",
        name: "Consultation",
        durationMinutes: 30,
        priceCents: 0,
        staffIds: ["ia1"],
        active: true,
      },
    ],
  },
];

const customers: Customer[] = [
  {
    id: "c1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "021 555 0211",
    createdAt: "2025-11-02T10:00:00Z",
  },
  {
    id: "c2",
    name: "Jordan Kim",
    email: "jordan.kim@example.com",
    phone: "021 555 0234",
    createdAt: "2026-01-14T10:00:00Z",
  },
  {
    id: "c3",
    name: "Daniel Osei",
    email: "d.osei@example.com",
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "c4",
    name: "Liam Novak",
    email: "liam.novak@example.com",
    phone: "021 555 0277",
    createdAt: "2026-04-03T10:00:00Z",
  },
  {
    id: "c5",
    name: "Chris Patel",
    email: "chris.patel@example.com",
    createdAt: "2026-06-18T10:00:00Z",
  },
  {
    id: "c6",
    name: "Ben Hartley",
    email: "ben.h@example.com",
    phone: "021 555 0290",
    createdAt: "2026-09-29T10:00:00Z",
  },
  {
    id: "c7",
    name: "Omar Said",
    email: "omar.said@example.com",
    createdAt: "2026-10-01T10:00:00Z",
  },
];

const bookings: Booking[] = [
  // Past
  {
    id: "b101",
    providerSlug: "northside-barbers",
    serviceId: "s1",
    staffId: "st1",
    customerId: "c1",
    startsAt: "2026-09-08T10:30:00Z",
    status: "completed",
  },
  {
    id: "b102",
    providerSlug: "northside-barbers",
    serviceId: "s2",
    staffId: "st2",
    customerId: "c2",
    startsAt: "2026-09-21T14:00:00Z",
    status: "completed",
  },
  {
    id: "b103",
    providerSlug: "northside-barbers",
    serviceId: "s3",
    staffId: "st3",
    customerId: "c4",
    startsAt: "2026-09-26T11:00:00Z",
    status: "no_show",
  },
  {
    id: "b104",
    providerSlug: "harbour-physio",
    serviceId: "hp-s1",
    staffId: "hp1",
    customerId: "c1",
    startsAt: "2026-09-15T08:30:00Z",
    status: "completed",
  },
  {
    id: "b105",
    providerSlug: "northside-barbers",
    serviceId: "s4",
    staffId: "st1",
    customerId: "c3",
    startsAt: "2026-10-02T15:00:00Z",
    status: "completed",
  },
  {
    id: "b106",
    providerSlug: "northside-barbers",
    serviceId: "s2",
    staffId: "st2",
    customerId: "c5",
    startsAt: "2026-10-03T10:00:00Z",
    status: "cancelled",
  },
  // This week
  {
    id: "b201",
    providerSlug: "northside-barbers",
    serviceId: "s1",
    staffId: "st1",
    customerId: "c2",
    startsAt: "2026-10-05T09:00:00Z",
    status: "confirmed",
  },
  {
    id: "b202",
    providerSlug: "northside-barbers",
    serviceId: "s3",
    staffId: "st3",
    customerId: "c6",
    startsAt: "2026-10-05T09:30:00Z",
    status: "confirmed",
  },
  {
    id: "b203",
    providerSlug: "northside-barbers",
    serviceId: "s2",
    staffId: "st2",
    customerId: "c4",
    startsAt: "2026-10-05T10:00:00Z",
    status: "confirmed",
  },
  {
    id: "b204",
    providerSlug: "northside-barbers",
    serviceId: "s4",
    staffId: "st1",
    customerId: "c7",
    startsAt: "2026-10-05T13:00:00Z",
    status: "pending",
    notes: "First visit. Wants to keep some length on top.",
  },
  {
    id: "b205",
    providerSlug: "northside-barbers",
    serviceId: "s2",
    staffId: "st3",
    customerId: "c5",
    startsAt: "2026-10-05T15:30:00Z",
    status: "confirmed",
  },
  {
    id: "b206",
    providerSlug: "northside-barbers",
    serviceId: "s1",
    staffId: "st2",
    customerId: "c3",
    startsAt: "2026-10-06T11:00:00Z",
    status: "confirmed",
  },
  {
    id: "b207",
    providerSlug: "northside-barbers",
    serviceId: "s3",
    staffId: "st1",
    customerId: "c1",
    startsAt: "2026-10-07T16:00:00Z",
    status: "confirmed",
  },
  {
    id: "b208",
    providerSlug: "northside-barbers",
    serviceId: "s4",
    staffId: "st2",
    customerId: "c6",
    startsAt: "2026-10-08T12:00:00Z",
    status: "confirmed",
  },
  {
    id: "b209",
    providerSlug: "northside-barbers",
    serviceId: "s2",
    staffId: "st1",
    customerId: "c2",
    startsAt: "2026-10-08T17:30:00Z",
    status: "cancelled",
  },
  {
    id: "b210",
    providerSlug: "northside-barbers",
    serviceId: "s1",
    staffId: "st3",
    customerId: "c7",
    startsAt: "2026-10-09T09:30:00Z",
    status: "confirmed",
  },
  {
    id: "b211",
    providerSlug: "northside-barbers",
    serviceId: "s2",
    staffId: "st1",
    customerId: "c4",
    startsAt: "2026-10-10T10:30:00Z",
    status: "pending",
  },
  // Later
  {
    id: "b301",
    providerSlug: "studio-nine-nails",
    serviceId: "sn-s1",
    staffId: "sn1",
    customerId: "c1",
    startsAt: "2026-10-16T15:00:00Z",
    status: "confirmed",
  },
  {
    id: "b302",
    providerSlug: "northside-barbers",
    serviceId: "s1",
    staffId: "st1",
    customerId: "c1",
    startsAt: "2026-11-02T10:30:00Z",
    status: "pending",
  },
];

export function listProviders({
  query,
  category,
}: {
  query?: string;
  category?: string;
} = {}) {
  const q = query?.trim().toLowerCase();
  return providers.filter(
    (p) =>
      p.listedInDirectory &&
      (!category || p.category === category) &&
      (!q ||
        [p.name, p.category, p.city, p.tagline].some((s) =>
          s.toLowerCase().includes(q),
        )),
  );
}

export function listCategories() {
  return [...new Set(providers.map((p) => p.category))].sort();
}

export function getProvider(slug: string) {
  return providers.find((p) => p.slug === slug);
}

export function getCurrentProvider() {
  // biome-ignore lint/style/noNonNullAssertion: mock data always has it
  return getProvider(CURRENT_PROVIDER_SLUG)!;
}

export function getCustomer(id: string) {
  return customers.find((c) => c.id === id);
}

export function getBooking(id: string) {
  return bookings.find((b) => b.id === id);
}

export function listBookingsForProvider(slug: string) {
  return bookings
    .filter((b) => b.providerSlug === slug)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function listBookingsForCustomer(customerId: string) {
  return bookings
    .filter((b) => b.customerId === customerId)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function listCustomersForProvider(slug: string) {
  const providerBookings = listBookingsForProvider(slug);
  return customers
    .map((customer) => {
      const theirs = providerBookings.filter(
        (b) => b.customerId === customer.id && b.status !== "cancelled",
      );
      const past = theirs.filter((b) => b.startsAt < MOCK_NOW);
      const upcoming = theirs.filter((b) => b.startsAt >= MOCK_NOW);
      return {
        ...customer,
        visits: past.filter((b) => b.status === "completed").length,
        lastVisit: past.at(-1)?.startsAt,
        nextBooking: upcoming[0]?.startsAt,
      };
    })
    .filter((c) => c.visits > 0 || c.nextBooking);
}

/** Expands a booking with its provider, service, staff member and customer. */
export function resolveBooking(booking: Booking) {
  // biome-ignore lint/style/noNonNullAssertion: mock data is consistent
  const provider = getProvider(booking.providerSlug)!;
  const service = provider.services.find((s) => s.id === booking.serviceId);
  const staff = provider.staff.find((s) => s.id === booking.staffId);
  const customer = getCustomer(booking.customerId);
  if (!service || !staff || !customer) {
    throw new Error(`Mock booking ${booking.id} has a dangling reference`);
  }
  const endsAt = new Date(
    new Date(booking.startsAt).getTime() + service.durationMinutes * 60_000,
  ).toISOString();
  return { ...booking, endsAt, provider, service, staff, customer };
}

export type ResolvedBooking = ReturnType<typeof resolveBooking>;

/** Every half hour from opening to close, with a few already taken. */
export function getMockSlots(date: string): TimeSlot[] {
  const seed = Number(date.slice(-2));
  const slots: TimeSlot[] = [];
  for (let minutes = 9 * 60; minutes <= 17 * 60; minutes += 30) {
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mm = String(minutes % 60).padStart(2, "0");
    slots.push({
      time: `${hh}:${mm}`,
      available: (minutes / 30 + seed) % 4 !== 0 && (minutes / 30) % 5 !== 1,
    });
  }
  return slots;
}

/** The next `count` calendar days starting from MOCK_NOW, as "YYYY-MM-DD". */
export function getUpcomingDates(count: number) {
  const start = new Date(MOCK_NOW);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });
}
