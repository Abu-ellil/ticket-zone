export interface Event {
  _id: string;
  title: string;
  artist: string;
  date: string;
  time: {
    eventStartTime: string;
    doorsOpenTime: string;
  };
  location: {
    venue: string;
  };
  imageUrl: string;
  tickets: TicketDetails[];
  currency: string;
  contactInfo: {
    customerServiceNumber: string;
    email: string;
  };
  tags?: string[];
}

export interface Seat {
    id: string;
    label: string;
    status: 'available' | 'taken' | 'selected';
    price: number;
    category: string;
}

export interface SeatRow {
    id: string;
    seats: Seat[];
}

export interface SeatSection {
    id: string;
    name: string;
    rows: SeatRow[];
    color: string;
}

export interface VenueLayout {
    sections: SeatSection[];
}

export interface Ticket {
    seatId: string;
    label: string;
    price: number;
    category: string;
}

export interface Legend {
    name: string;
    imageUrl: string;
    stats: { label: string; value: string | number }[];
    bio: string;
}

export interface TicketDetails {
  type: string;
  price: number;
  currency: string;
  discount?: string;
}

export interface EventDetailsSchema {
  eventName: string;
  date: string;
  time: {
    eventStartTime: string;
    doorsOpenTime: string;
  };
  location: {
    venue: string;
  };
  tickets: TicketDetails[];
  currency: string;
  contactInfo: {
    customerServiceNumber: string;
    email: string;
  };
  imageUrl?: string; // Optional image URL for the event
}
