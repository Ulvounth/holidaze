export interface Media {
  url: string;
  alt: string;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: Media;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  reviews: number;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  location: Location;
  meta: Meta;
  owner: User;
  bookings?: Booking[];
}

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  venueManager?: boolean;
}

export interface ProfileData {
  id?: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  bookings?: Array<any>;
  venues?: Array<any>;
  venueManager?: boolean;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: User;
}

export interface Avatar {
  url: string;
  alt: string;
}

export interface ProfileUpdateData {
  bio?: string;
  avatar?: Avatar;
  banner?: Avatar;
  venueManager?: boolean;
}

export interface VenueFormData {
  name: string;
  description: string;
  mediaUrl: string;
  mediaAlt: string;
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}
