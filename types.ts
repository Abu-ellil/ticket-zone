
export interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  imageUrl: string;
  priceFrom?: number;
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
