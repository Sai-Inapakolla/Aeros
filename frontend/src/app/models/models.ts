export interface Airport {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  country: string;
}

export interface Aircraft {
  id: string;
  name: string;
  model: string;
  manufacturingYear: number;
  totalSeats: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  aircraftId: string;
  aircraftName: string;
  departureAirportId: string;
  departureAirportCode: string;
  departureCity: string;
  arriveAirportId: string;
  arriveAirportCode: string;
  arriveCity: string;
  departureDate: string;
  arriveDate: string;
  flightDate: string;
  durationMinutes: number;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Scheduled' | 'Departed';
  price: number;
  availableSeatsCount: number;
}

export type SeatClass = 'FIRST' | 'BUSINESS' | 'ECONOMY';
export type SeatType = 'WINDOW' | 'MIDDLE' | 'AISLE';

export interface Seat {
  id: string;
  seatNumber: string;
  flightId: string;
  seatClass: SeatClass;
  seatType: SeatType;
  price: number;
  isReserved: boolean;
  passengerId?: string;
  passengerName?: string;
}

export interface Passenger {
  id: string;
  name: string;
  passportNumber: string;
  passengerType: 'ADULT' | 'CHILD' | 'INFANT' | 'VIP';
  email: string;
  phoneNumber?: string;
  createdAt?: string;
}

export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface Booking {
  id: string;
  flightId: string;
  flightNumber: string;
  passengerId: string;
  passengerName: string;
  passengerEmail: string;
  seatNumber: string;
  seatClass: SeatClass;
  price: number;
  departureCity: string;
  departureAirportCode: string;
  arriveCity: string;
  arriveAirportCode: string;
  departureDate: string;
  arriveDate: string;
  bookingDate: string;
  status: BookingStatus;
  gate: string;
  terminal: string;
  qrToken?: string;
}

export interface ServiceHealth {
  gateway: boolean;
  flight: boolean;
  passenger: boolean;
  booking: boolean;
  keycloak: boolean;
  rabbitmq: boolean;
  lastChecked?: string;
}

export interface AppConfig {
  isLiveMode: boolean;
  gatewayUrl: string;
  flightServiceUrl: string;
  passengerServiceUrl: string;
  bookingServiceUrl: string;
  keycloakUrl: string;
  token: string;
  theme: 'dark' | 'light';
}
