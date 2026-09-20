import { Airport, Aircraft, Flight, Passenger, Booking, Seat, SeatClass, SeatType } from '../models/models';

export const INITIAL_AIRPORTS: Airport[] = [
  {
    id: "3c5c0000-97c6-fc34-a0cb-08db322230c8",
    name: "Lisbon Humberto Delgado Airport",
    code: "LIS",
    address: "Lisbon, Portugal",
    city: "Lisbon",
    country: "Portugal"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230c8",
    name: "São Paulo–Guarulhos Airport",
    code: "GRU",
    address: "São Paulo, Brazil",
    city: "São Paulo",
    country: "Brazil"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230c9",
    name: "London Heathrow Airport",
    code: "LHR",
    address: "London, United Kingdom",
    city: "London",
    country: "United Kingdom"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230ca",
    name: "John F. Kennedy International Airport",
    code: "JFK",
    address: "New York, USA",
    city: "New York",
    country: "United States"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230cb",
    name: "Dubai International Airport",
    code: "DXB",
    address: "Dubai, United Arab Emirates",
    city: "Dubai",
    country: "UAE"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230cc",
    name: "Tokyo Haneda Airport",
    code: "HND",
    address: "Tokyo, Japan",
    city: "Tokyo",
    country: "Japan"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230cd",
    name: "Singapore Changi Airport",
    code: "SIN",
    address: "Singapore",
    city: "Singapore",
    country: "Singapore"
  },
  {
    id: "3c5c0000-97c6-fc34-fc3c-08db322230ce",
    name: "Frankfurt Airport",
    code: "FRA",
    address: "Frankfurt, Germany",
    city: "Frankfurt",
    country: "Germany"
  }
];

export const INITIAL_AIRCRAFTS: Aircraft[] = [
  {
    id: "3c5c0000-97c6-fc34-fcd3-08db322230c8",
    name: "Boeing 737-800",
    model: "B737",
    manufacturingYear: 2019,
    totalSeats: 160
  },
  {
    id: "3c5c0000-97c6-fc34-2e04-08db322230c9",
    name: "Airbus A320neo",
    model: "A320neo",
    manufacturingYear: 2022,
    totalSeats: 180
  },
  {
    id: "3c5c0000-97c6-fc34-2e11-08db322230c9",
    name: "Boeing 787-9 Dreamliner",
    model: "B787-9",
    manufacturingYear: 2023,
    totalSeats: 290
  },
  {
    id: "3c5c0000-97c6-fc34-2e22-08db322230c9",
    name: "Airbus A350-900",
    model: "A350-900",
    manufacturingYear: 2024,
    totalSeats: 325
  }
];

export const INITIAL_FLIGHTS: Flight[] = [
  {
    id: "3c5c0000-97c6-fc34-2eb9-08db322230c9",
    flightNumber: "AE-467",
    aircraftId: "3c5c0000-97c6-fc34-fcd3-08db322230c8",
    aircraftName: "Boeing 737-800",
    departureAirportId: "3c5c0000-97c6-fc34-a0cb-08db322230c8",
    departureAirportCode: "LIS",
    departureCity: "Lisbon",
    arriveAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230c8",
    arriveAirportCode: "GRU",
    arriveCity: "São Paulo",
    departureDate: "2026-09-21T09:30:00",
    arriveDate: "2026-09-21T19:30:00",
    flightDate: "2026-09-21",
    durationMinutes: 600,
    status: "On Time",
    price: 780,
    availableSeatsCount: 42
  },
  {
    id: "01949849-1608-7e16-975a-e7f4cf1d029d",
    flightNumber: "AE-812",
    aircraftId: "3c5c0000-97c6-fc34-2e04-08db322230c9",
    aircraftName: "Airbus A320neo",
    departureAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230c9",
    departureAirportCode: "LHR",
    departureCity: "London",
    arriveAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230ca",
    arriveAirportCode: "JFK",
    arriveCity: "New York",
    departureDate: "2026-09-21T13:45:00",
    arriveDate: "2026-09-21T16:50:00",
    flightDate: "2026-09-21",
    durationMinutes: 425,
    status: "Boarding",
    price: 640,
    availableSeatsCount: 18
  },
  {
    id: "01949849-5432-7e16-975a-e7f4cf1d033a",
    flightNumber: "AE-209",
    aircraftId: "3c5c0000-97c6-fc34-2e11-08db322230c9",
    aircraftName: "Boeing 787-9 Dreamliner",
    departureAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230cb",
    departureAirportCode: "DXB",
    departureCity: "Dubai",
    arriveAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230cc",
    arriveAirportCode: "HND",
    arriveCity: "Tokyo",
    departureDate: "2026-09-22T02:15:00",
    arriveDate: "2026-09-22T17:30:00",
    flightDate: "2026-09-22",
    durationMinutes: 555,
    status: "Scheduled",
    price: 920,
    availableSeatsCount: 65
  },
  {
    id: "01949849-8819-7e16-975a-e7f4cf1d044b",
    flightNumber: "AE-904",
    aircraftId: "3c5c0000-97c6-fc34-2e22-08db322230c9",
    aircraftName: "Airbus A350-900",
    departureAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230cd",
    departureAirportCode: "SIN",
    departureCity: "Singapore",
    arriveAirportId: "3c5c0000-97c6-fc34-fc3c-08db322230ce",
    arriveAirportCode: "FRA",
    arriveCity: "Frankfurt",
    departureDate: "2026-09-22T23:55:00",
    arriveDate: "2026-09-23T06:40:00",
    flightDate: "2026-09-22",
    durationMinutes: 765,
    status: "On Time",
    price: 1150,
    availableSeatsCount: 88
  }
];

export const INITIAL_PASSENGERS: Passenger[] = [
  {
    id: "4c5c0000-97c6-fc34-a0cb-08db322230c0",
    name: "Alexander Vance",
    passportNumber: "US98421034",
    passengerType: "VIP",
    email: "alexander.vance@aeros-aviation.com",
    phoneNumber: "+1 (555) 234-5678",
    createdAt: "2026-08-10"
  },
  {
    id: "4c5c0000-97c6-fc34-a0cb-08db322230c1",
    name: "Elena Rostova",
    passportNumber: "GB44901238",
    passengerType: "ADULT",
    email: "elena.rostova@skyward.org",
    phoneNumber: "+44 20 7946 0912",
    createdAt: "2026-08-14"
  },
  {
    id: "4c5c0000-97c6-fc34-a0cb-08db322230c2",
    name: "Marcus Aurelius Thorne",
    passportNumber: "DE12984567",
    passengerType: "VIP",
    email: "marcus.thorne@enterprise.de",
    phoneNumber: "+49 30 8923451",
    createdAt: "2026-08-18"
  },
  {
    id: "4c5c0000-97c6-fc34-a0cb-08db322230c3",
    name: "Sophia Chen",
    passportNumber: "SG88219045",
    passengerType: "ADULT",
    email: "sophia.chen@pacific-tech.sg",
    phoneNumber: "+65 6712 8900",
    createdAt: "2026-08-20"
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "5c5c0000-97c6-fc34-b0db-08db322230e1",
    flightId: "3c5c0000-97c6-fc34-2eb9-08db322230c9",
    flightNumber: "AE-467",
    passengerId: "4c5c0000-97c6-fc34-a0cb-08db322230c0",
    passengerName: "Alexander Vance",
    passengerEmail: "alexander.vance@aeros-aviation.com",
    seatNumber: "1A",
    seatClass: "FIRST",
    price: 1560,
    departureCity: "Lisbon",
    departureAirportCode: "LIS",
    arriveCity: "São Paulo",
    arriveAirportCode: "GRU",
    departureDate: "2026-09-21T09:30:00",
    arriveDate: "2026-09-21T19:30:00",
    bookingDate: "2026-09-18T11:20:00",
    status: "CONFIRMED",
    gate: "B24",
    terminal: "T2",
    qrToken: "AEROS-PASS-AE467-1A-US98421034"
  },
  {
    id: "5c5c0000-97c6-fc34-b0db-08db322230e2",
    flightId: "01949849-1608-7e16-975a-e7f4cf1d029d",
    flightNumber: "AE-812",
    passengerId: "4c5c0000-97c6-fc34-a0cb-08db322230c1",
    passengerName: "Elena Rostova",
    passengerEmail: "elena.rostova@skyward.org",
    seatNumber: "4C",
    seatClass: "BUSINESS",
    price: 1120,
    departureCity: "London",
    departureAirportCode: "LHR",
    arriveCity: "New York",
    arriveAirportCode: "JFK",
    departureDate: "2026-09-21T13:45:00",
    arriveDate: "2026-09-21T16:50:00",
    bookingDate: "2026-09-19T08:45:00",
    status: "CONFIRMED",
    gate: "A12",
    terminal: "T5",
    qrToken: "AEROS-PASS-AE812-4C-GB44901238"
  }
];

export function generateSeatsForFlight(flightId: string, basePrice: number = 780): Seat[] {
  const seats: Seat[] = [];
  const rows = [
    { row: 1, classType: 'FIRST' as SeatClass, priceMult: 2.0 },
    { row: 2, classType: 'FIRST' as SeatClass, priceMult: 2.0 },
    { row: 3, classType: 'BUSINESS' as SeatClass, priceMult: 1.5 },
    { row: 4, classType: 'BUSINESS' as SeatClass, priceMult: 1.5 },
    { row: 5, classType: 'BUSINESS' as SeatClass, priceMult: 1.5 },
    { row: 6, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
    { row: 7, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
    { row: 8, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
    { row: 9, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
    { row: 10, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
    { row: 11, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
    { row: 12, classType: 'ECONOMY' as SeatClass, priceMult: 1.0 },
  ];

  const cols: { letter: string; type: SeatType }[] = [
    { letter: 'A', type: 'WINDOW' },
    { letter: 'B', type: 'MIDDLE' },
    { letter: 'C', type: 'AISLE' },
    { letter: 'D', type: 'AISLE' },
    { letter: 'E', type: 'MIDDLE' },
    { letter: 'F', type: 'WINDOW' }
  ];

  // Deterministic seed simulation
  let seed = 0;
  for (let i = 0; i < flightId.length; i++) {
    seed = (seed * 31 + flightId.charCodeAt(i)) % 1000;
  }

  rows.forEach(r => {
    cols.forEach(c => {
      const seatNum = `${r.row}${c.letter}`;
      // Certain seats reserved deterministically
      const isReserved = ((r.row * 7 + c.letter.charCodeAt(0) + seed) % 5 === 0) || seatNum === '1A' || seatNum === '4C';
      
      seats.push({
        id: `seat-${flightId}-${seatNum}`,
        seatNumber: seatNum,
        flightId: flightId,
        seatClass: r.classType,
        seatType: c.type,
        price: Math.round(basePrice * r.priceMult),
        isReserved: isReserved
      });
    });
  });

  return seats;
}
