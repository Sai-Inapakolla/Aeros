import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airport, Aircraft, Flight, Passenger, Booking, Seat, ServiceHealth, AppConfig, SeatClass } from '../models/models';
import { INITIAL_AIRPORTS, INITIAL_AIRCRAFTS, INITIAL_FLIGHTS, INITIAL_PASSENGERS, INITIAL_BOOKINGS, generateSeatsForFlight } from './mock-data';

const STORAGE_KEYS = {
  AIRPORTS: 'aeros_ng_airports',
  AIRCRAFTS: 'aeros_ng_aircrafts',
  FLIGHTS: 'aeros_ng_flights',
  PASSENGERS: 'aeros_ng_passengers',
  BOOKINGS: 'aeros_ng_bookings',
  SEATS_PREFIX: 'aeros_ng_seats_',
  CONFIG: 'aeros_ng_config'
};

@Injectable({
  providedIn: 'root'
})
export class AerosApiService {
  // Config & State Signals
  readonly config = signal<AppConfig>(this.loadInitialConfig());
  readonly activeTab = signal<'flights' | 'seats' | 'passengers' | 'bookings' | 'admin'>('flights');
  
  // Data Signals
  readonly airports = signal<Airport[]>([]);
  readonly aircrafts = signal<Aircraft[]>([]);
  readonly flights = signal<Flight[]>([]);
  readonly passengers = signal<Passenger[]>([]);
  readonly bookings = signal<Booking[]>([]);
  
  // Selection Signals for the booking journey
  readonly selectedFlight = signal<Flight | null>(null);
  readonly selectedSeat = signal<Seat | null>(null);
  readonly selectedPassenger = signal<Passenger | null>(null);
  readonly activeFlightSeats = signal<Seat[]>([]);

  // System Health
  readonly serviceHealth = signal<ServiceHealth>({
    gateway: false,
    flight: false,
    passenger: false,
    booking: false,
    keycloak: false,
    rabbitmq: false
  });

  readonly isHealthy = computed(() => {
    const h = this.serviceHealth();
    return h.gateway || h.flight || h.passenger || h.booking;
  });

  constructor(private http: HttpClient) {
    this.initData();
    this.applyTheme(this.config().theme);
    this.checkHealth();
    
    // Auto periodic health check
    setInterval(() => this.checkHealth(), 12000);
  }

  private loadInitialConfig(): AppConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read config from storage', e);
    }
    return {
      isLiveMode: false,
      gatewayUrl: 'http://localhost:8081',
      flightServiceUrl: 'http://localhost:8082',
      passengerServiceUrl: 'http://localhost:8083',
      bookingServiceUrl: 'http://localhost:8084',
      keycloakUrl: 'http://localhost:8080',
      token: '',
      theme: 'dark'
    };
  }

  private saveConfig(config: AppConfig) {
    this.config.set(config);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }

  toggleTheme() {
    const newTheme = this.config().theme === 'dark' ? 'light' : 'dark';
    const updated = { ...this.config(), theme: newTheme as 'dark' | 'light' };
    this.saveConfig(updated);
    this.applyTheme(newTheme);
  }

  private applyTheme(theme: 'dark' | 'light') {
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleLiveMode() {
    const updated = { ...this.config(), isLiveMode: !this.config().isLiveMode };
    this.saveConfig(updated);
    if (updated.isLiveMode) {
      this.checkHealth();
    }
  }

  setTab(tab: 'flights' | 'seats' | 'passengers' | 'bookings' | 'admin') {
    this.activeTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initData() {
    try {
      // Airports
      const storedAirports = localStorage.getItem(STORAGE_KEYS.AIRPORTS);
      this.airports.set(storedAirports ? JSON.parse(storedAirports) : INITIAL_AIRPORTS);
      if (!storedAirports) localStorage.setItem(STORAGE_KEYS.AIRPORTS, JSON.stringify(INITIAL_AIRPORTS));

      // Aircrafts
      const storedAircrafts = localStorage.getItem(STORAGE_KEYS.AIRCRAFTS);
      this.aircrafts.set(storedAircrafts ? JSON.parse(storedAircrafts) : INITIAL_AIRCRAFTS);
      if (!storedAircrafts) localStorage.setItem(STORAGE_KEYS.AIRCRAFTS, JSON.stringify(INITIAL_AIRCRAFTS));

      // Flights
      const storedFlights = localStorage.getItem(STORAGE_KEYS.FLIGHTS);
      const flightsList = storedFlights ? JSON.parse(storedFlights) : INITIAL_FLIGHTS;
      this.flights.set(flightsList);
      if (!storedFlights) localStorage.setItem(STORAGE_KEYS.FLIGHTS, JSON.stringify(INITIAL_FLIGHTS));

      // Set default selected flight
      if (flightsList.length > 0) {
        this.selectFlight(flightsList[0]);
      }

      // Passengers
      const storedPassengers = localStorage.getItem(STORAGE_KEYS.PASSENGERS);
      const passList = storedPassengers ? JSON.parse(storedPassengers) : INITIAL_PASSENGERS;
      this.passengers.set(passList);
      if (!storedPassengers) localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(INITIAL_PASSENGERS));
      if (passList.length > 0) {
        this.selectedPassenger.set(passList[0]);
      }

      // Bookings
      const storedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      this.bookings.set(storedBookings ? JSON.parse(storedBookings) : INITIAL_BOOKINGS);
      if (!storedBookings) localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));

    } catch (e) {
      console.error('Error loading initial data', e);
      this.airports.set(INITIAL_AIRPORTS);
      this.aircrafts.set(INITIAL_AIRCRAFTS);
      this.flights.set(INITIAL_FLIGHTS);
      this.passengers.set(INITIAL_PASSENGERS);
      this.bookings.set(INITIAL_BOOKINGS);
    }
  }

  selectFlight(flight: Flight) {
    this.selectedFlight.set(flight);
    this.loadSeatsForFlight(flight.id, flight.price);
  }

  loadSeatsForFlight(flightId: string, basePrice: number = 780) {
    const key = `${STORAGE_KEYS.SEATS_PREFIX}${flightId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        this.activeFlightSeats.set(JSON.parse(stored));
        return;
      }
    } catch (e) {
      console.warn('Seat storage read error', e);
    }

    const generated = generateSeatsForFlight(flightId, basePrice);
    this.activeFlightSeats.set(generated);
    localStorage.setItem(key, JSON.stringify(generated));
  }

  selectSeat(seat: Seat) {
    if (seat.isReserved) return;
    this.selectedSeat.set(seat);
  }

  selectPassenger(passenger: Passenger) {
    this.selectedPassenger.set(passenger);
  }

  // --- Actions ---

  addPassenger(passengerData: Omit<Passenger, 'id' | 'createdAt'>): Passenger {
    const newPassenger: Passenger = {
      ...passengerData,
      id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newPassenger, ...this.passengers()];
    this.passengers.set(updated);
    localStorage.setItem(STORAGE_KEYS.PASSENGERS, JSON.stringify(updated));
    this.selectedPassenger.set(newPassenger);
    return newPassenger;
  }

  createBooking(flight: Flight, seat: Seat, passenger: Passenger): Booking {
    const bookingId = `bkg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const gates = ['A12', 'B04', 'C18', 'D22', 'B24', 'E09'];
    const terminals = ['T1', 'T2', 'T3', 'T5'];
    
    const newBooking: Booking = {
      id: bookingId,
      flightId: flight.id,
      flightNumber: flight.flightNumber,
      passengerId: passenger.id,
      passengerName: passenger.name,
      passengerEmail: passenger.email,
      seatNumber: seat.seatNumber,
      seatClass: seat.seatClass,
      price: seat.price,
      departureCity: flight.departureCity,
      departureAirportCode: flight.departureAirportCode,
      arriveCity: flight.arriveCity,
      arriveAirportCode: flight.arriveAirportCode,
      departureDate: flight.departureDate,
      arriveDate: flight.arriveDate,
      bookingDate: new Date().toISOString(),
      status: 'CONFIRMED',
      gate: gates[Math.floor(Math.random() * gates.length)],
      terminal: terminals[Math.floor(Math.random() * terminals.length)],
      qrToken: `AEROS-PASS-${flight.flightNumber}-${seat.seatNumber}-${passenger.passportNumber}`
    };

    // Update seat reservation
    const currentSeats = this.activeFlightSeats().map(s => {
      if (s.id === seat.id || s.seatNumber === seat.seatNumber) {
        return { ...s, isReserved: true, passengerId: passenger.id, passengerName: passenger.name };
      }
      return s;
    });
    this.activeFlightSeats.set(currentSeats);
    localStorage.setItem(`${STORAGE_KEYS.SEATS_PREFIX}${flight.id}`, JSON.stringify(currentSeats));

    // Update flight available seats count
    const updatedFlights = this.flights().map(f => {
      if (f.id === flight.id) {
        return { ...f, availableSeatsCount: Math.max(0, f.availableSeatsCount - 1) };
      }
      return f;
    });
    this.flights.set(updatedFlights);
    localStorage.setItem(STORAGE_KEYS.FLIGHTS, JSON.stringify(updatedFlights));

    // Save booking
    const updatedBookings = [newBooking, ...this.bookings()];
    this.bookings.set(updatedBookings);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));

    // Reset selected seat
    this.selectedSeat.set(null);

    return newBooking;
  }

  cancelBooking(bookingId: string) {
    const booking = this.bookings().find(b => b.id === bookingId);
    if (!booking) return;

    // Mark booking cancelled
    const updatedBookings = this.bookings().map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'CANCELLED' as const };
      }
      return b;
    });
    this.bookings.set(updatedBookings);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));

    // Release the seat if on active flight
    const key = `${STORAGE_KEYS.SEATS_PREFIX}${booking.flightId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const seats: Seat[] = JSON.parse(stored);
        const updatedSeats = seats.map(s => {
          if (s.seatNumber === booking.seatNumber) {
            return { ...s, isReserved: false, passengerId: undefined, passengerName: undefined };
          }
          return s;
        });
        localStorage.setItem(key, JSON.stringify(updatedSeats));
        if (this.selectedFlight()?.id === booking.flightId) {
          this.activeFlightSeats.set(updatedSeats);
        }
      }
    } catch (e) {
      console.warn('Error freeing seat', e);
    }
  }

  addFlight(flightData: Omit<Flight, 'id' | 'availableSeatsCount'>): Flight {
    const newFlight: Flight = {
      ...flightData,
      id: `fl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      availableSeatsCount: 160
    };

    const updated = [newFlight, ...this.flights()];
    this.flights.set(updated);
    localStorage.setItem(STORAGE_KEYS.FLIGHTS, JSON.stringify(updated));
    return newFlight;
  }

  addAircraft(aircraftData: Omit<Aircraft, 'id'>): Aircraft {
    const newAircraft: Aircraft = {
      ...aircraftData,
      id: `ac-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };

    const updated = [...this.aircrafts(), newAircraft];
    this.aircrafts.set(updated);
    localStorage.setItem(STORAGE_KEYS.AIRCRAFTS, JSON.stringify(updated));
    return newAircraft;
  }

  // --- Health Checks ---
  async checkHealth() {
    const urls = {
      gateway: this.config().gatewayUrl,
      flight: this.config().flightServiceUrl,
      passenger: this.config().passengerServiceUrl,
      booking: this.config().bookingServiceUrl,
      keycloak: this.config().keycloakUrl
    };

    const ping = async (url: string): Promise<boolean> => {
      try {
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 1200);
        await fetch(url, { method: 'GET', signal: ctrl.signal, mode: 'no-cors' });
        clearTimeout(timeout);
        return true;
      } catch (e) {
        return false;
      }
    };

    const [gw, fl, ps, bk, kc] = await Promise.all([
      ping(urls.gateway),
      ping(urls.flight),
      ping(urls.passenger),
      ping(urls.booking),
      ping(urls.keycloak)
    ]);

    this.serviceHealth.set({
      gateway: gw,
      flight: fl,
      passenger: ps,
      booking: bk,
      keycloak: kc,
      rabbitmq: fl || bk || ps, // RabbitMQ is usually up if microservices run
      lastChecked: new Date().toLocaleTimeString()
    });
  }
}
