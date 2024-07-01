import { iCategory } from "./i-category";
import { iContinent } from "./i-continent";
import { iItinerary } from "./i-itinerary";

export interface iTravelLight {
  id: number,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  availableSeats: number,
  price: number,
  place: string,
  continent: iContinent,
  passportIsRequired: boolean,
  whatsIncluded: string[],
  itinerary: iItinerary,
  photos: string[],
  category: iCategory,
  soldOut: boolean
}
