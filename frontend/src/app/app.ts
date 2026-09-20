import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AerosApiService } from './services/aeros-api.service';
import { Flight, Seat, Passenger, Booking, Airport, Aircraft, SeatClass } from './models/models';

interface Toast {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly api = inject(AerosApiService);

  // Search Filters
  searchOrigin = signal<string>('');
  searchDestination = signal<string>('');
  searchDate = signal<string>('');
  searchClass = signal<string>('ALL');

  // Modals
  showPassengerModal = signal<boolean>(false);
  showFlightModal = signal<boolean>(false);
  showAircraftModal = signal<boolean>(false);

  // Form State: New Passenger
  newPassName = signal<string>('');
  newPassEmail = signal<string>('');
  newPassPassport = signal<string>('');
  newPassPhone = signal<string>('');
  newPassType = signal<'ADULT' | 'CHILD' | 'INFANT' | 'VIP'>('ADULT');

  // Form State: New Flight
  newFlightNumber = signal<string>('');
  newFlightAircraftId = signal<string>('');
  newFlightDepAirportId = signal<string>('');
  newFlightArrAirportId = signal<string>('');
  newFlightDepDate = signal<string>('');
  newFlightArrDate = signal<string>('');
  newFlightPrice = signal<number>(650);

  // Form State: New Aircraft
  newAircraftName = signal<string>('');
  newAircraftModel = signal<string>('');
  newAircraftYear = signal<number>(2023);
  newAircraftSeats = signal<number>(180);

  // Toasts
  toasts = signal<Toast[]>([]);

  // Computed Filtered Flights
  filteredFlights = computed(() => {
    const origin = this.searchOrigin();
    const dest = this.searchDestination();
    const all = this.api.flights();

    return all.filter(f => {
      const matchOrigin = !origin || f.departureAirportId === origin || f.departureAirportCode === origin;
      const matchDest = !dest || f.arriveAirportId === dest || f.arriveAirportCode === dest;
      return matchOrigin && matchDest;
    });
  });

  // Seat groupings for aircraft visual map
  firstClassSeats = computed(() => {
    return this.api.activeFlightSeats().filter(s => s.seatClass === 'FIRST');
  });

  businessClassSeats = computed(() => {
    return this.api.activeFlightSeats().filter(s => s.seatClass === 'BUSINESS');
  });

  economyClassSeats = computed(() => {
    return this.api.activeFlightSeats().filter(s => s.seatClass === 'ECONOMY');
  });

  // Unique rows helper
  getSeatRows(seats: Seat[]): { rowNumber: number; seats: Seat[] }[] {
    const rowsMap = new Map<number, Seat[]>();
    for (const seat of seats) {
      const rowNum = parseInt(seat.seatNumber.replace(/\D/g, ''), 10);
      if (!rowsMap.has(rowNum)) {
        rowsMap.set(rowNum, []);
      }
      rowsMap.get(rowNum)!.push(seat);
    }

    return Array.from(rowsMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([rowNumber, sList]) => ({
        rowNumber,
        seats: sList.sort((a, b) => a.seatNumber.localeCompare(b.seatNumber))
      }));
  }

  showToast(type: 'success' | 'danger' | 'warning' | 'info', title: string, message: string) {
    const toast: Toast = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      message
    };
    this.toasts.update(current => [toast, ...current]);
    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== toast.id));
    }, 4500);
  }

  removeToast(id: string) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  // --- Flight Actions ---
  selectAndNavigateToSeats(flight: Flight) {
    this.api.selectFlight(flight);
    this.api.setTab('seats');
    this.showToast('info', 'Flight Selected', `Selected flight ${flight.flightNumber} (${flight.departureAirportCode} → ${flight.arriveAirportCode})`);
  }

  // --- Seat & Booking Actions ---
  selectSeat(seat: Seat) {
    if (seat.isReserved) {
      this.showToast('warning', 'Seat Occupied', `Seat ${seat.seatNumber} is already occupied.`);
      return;
    }
    this.api.selectSeat(seat);
  }

  confirmBooking() {
    const flight = this.api.selectedFlight();
    const seat = this.api.selectedSeat();
    const passenger = this.api.selectedPassenger();

    if (!flight) {
      this.showToast('danger', 'Error', 'Please select a flight first.');
      return;
    }
    if (!seat) {
      this.showToast('danger', 'Error', 'Please select a seat on the cabin map.');
      return;
    }
    if (!passenger) {
      this.showToast('danger', 'Error', 'Please select or create a passenger.');
      return;
    }

    const booking = this.api.createBooking(flight, seat, passenger);
    this.showToast(
      'success',
      'Booking Confirmed! ✈️',
      `Seat ${seat.seatNumber} reserved for ${passenger.name}. Boarding pass generated!`
    );
    this.api.setTab('bookings');
  }

  cancelBooking(booking: Booking) {
    if (confirm(`Are you sure you want to cancel booking for ${booking.passengerName} (${booking.flightNumber})?`)) {
      this.api.cancelBooking(booking.id);
      this.showToast('danger', 'Booking Cancelled', `Reservation #${booking.id.substring(0, 8)} has been cancelled.`);
    }
  }

  // --- Passenger Registration ---
  registerPassenger() {
    if (!this.newPassName() || !this.newPassEmail() || !this.newPassPassport()) {
      this.showToast('danger', 'Validation Error', 'Please fill in Name, Email, and Passport number.');
      return;
    }

    const newP = this.api.addPassenger({
      name: this.newPassName(),
      email: this.newPassEmail(),
      passportNumber: this.newPassPassport(),
      phoneNumber: this.newPassPhone() || '+1 (555) 000-0000',
      passengerType: this.newPassType()
    });

    this.showToast('success', 'Passenger Added', `${newP.name} registered successfully.`);
    this.showPassengerModal.set(false);

    // Reset Form
    this.newPassName.set('');
    this.newPassEmail.set('');
    this.newPassPassport.set('');
    this.newPassPhone.set('');
  }

  // --- Flight Registration ---
  createFlight() {
    if (!this.newFlightNumber() || !this.newFlightDepAirportId() || !this.newFlightArrAirportId()) {
      this.showToast('danger', 'Validation Error', 'Please fill in flight number and origin/destination.');
      return;
    }

    const depAirport = this.api.airports().find(a => a.id === this.newFlightDepAirportId());
    const arrAirport = this.api.airports().find(a => a.id === this.newFlightArrAirportId());
    const aircraft = this.api.aircrafts().find(a => a.id === this.newFlightAircraftId()) || this.api.aircrafts()[0];

    const flight = this.api.addFlight({
      flightNumber: this.newFlightNumber(),
      aircraftId: aircraft.id,
      aircraftName: aircraft.name,
      departureAirportId: depAirport?.id || '',
      departureAirportCode: depAirport?.code || 'DEP',
      departureCity: depAirport?.city || 'Origin',
      arriveAirportId: arrAirport?.id || '',
      arriveAirportCode: arrAirport?.code || 'ARR',
      arriveCity: arrAirport?.city || 'Destination',
      departureDate: this.newFlightDepDate() || new Date().toISOString(),
      arriveDate: this.newFlightArrDate() || new Date().toISOString(),
      flightDate: this.newFlightDepDate()?.split('T')[0] || new Date().toISOString().split('T')[0],
      durationMinutes: 480,
      status: 'Scheduled',
      price: this.newFlightPrice() || 750
    });

    this.showToast('success', 'Flight Scheduled', `Flight ${flight.flightNumber} added to global schedule.`);
    this.showFlightModal.set(false);
  }

  // --- Aircraft Registration ---
  createAircraft() {
    if (!this.newAircraftName() || !this.newAircraftModel()) {
      this.showToast('danger', 'Validation Error', 'Please fill in aircraft name and model.');
      return;
    }

    const ac = this.api.addAircraft({
      name: this.newAircraftName(),
      model: this.newAircraftModel(),
      manufacturingYear: this.newAircraftYear(),
      totalSeats: this.newAircraftSeats()
    });

    this.showToast('success', 'Aircraft Added', `${ac.name} registered into active fleet.`);
    this.showAircraftModal.set(false);
  }

  printBoardingPass(booking: Booking) {
    window.print();
  }
}
