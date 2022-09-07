import { GeoPoint } from '@firebase/firestore-types';
import * as firestore from '@firebase/firestore'

export interface Location {
  name: string;
  phone: string;
  address: string;
  uid?: string;
  id?: string;
  author_id?: string;
  google_id?: string;
  verification_stage?: number;
  active?: boolean;
  managed?: boolean;
  image_url?: string;
  updated_at?: firestore.FieldValue,
  food?: SpecialObject;
  drinks?: SpecialObject;
  events?: SpecialObject;
  happyHourMenu?: string;
  brunchMenu?: string;
  distance?: number;
  categories?: [string];
  coordinates?: GeoPoint;
  formattedPhone?: string;
  geohash?: string;
  thumb_url?: string;
  lat?: number;
  lng?: number;
  brunch?: boolean;
  website?: string;
  outdoorSeating?: boolean;
  g?: { geohash: string; geopoint: GeoPoint };
}

export interface RecurringSpecial {
  active: boolean;
  specials: Array<string>;
  specialDescriptions: Array<string>;
  days: Array<string>;
  start: number;
  end: number;
  formattedTime: string;
}

export interface SpecialObject {
  color: string;
  active: boolean;
  recurring: boolean;
  recurringSpecials: RecurringSpecial[];
  specificDate: false;
  specificDateSpecials: SpecificDateSpecial[];
}
export interface SpecificDateSpecial {
  active: boolean;
  specials: Array<string>;
  date: string;
  start: number;
  end: number;
  formattedTime: string;
}
