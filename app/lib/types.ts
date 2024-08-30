// app/lib/types.ts
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
