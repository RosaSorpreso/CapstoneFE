import { iItinerary } from "./i-itinerary"

export interface iTravelRequest {
  name: string
  description: string
  startDate: string
  endDate: string
  availableSeats: number
  price: number
  place: string
  idContinent: number
  passportIsRequired: boolean
  whatsIncluded: string[]
  itinerary: iItinerary
  idCategories: number
}
