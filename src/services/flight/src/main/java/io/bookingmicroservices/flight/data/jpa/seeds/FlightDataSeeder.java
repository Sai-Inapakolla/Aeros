package io.bookingmicroservices.flight.data.jpa.seeds;

import io.bookingmicroservices.flight.data.mongo.documents.AircraftDocument;
import io.bookingmicroservices.flight.data.mongo.documents.AirportDocument;
import io.bookingmicroservices.flight.data.mongo.documents.FlightDocument;
import io.bookingmicroservices.flight.data.mongo.documents.SeatDocument;
import io.bookingmicroservices.flight.data.mongo.repositories.AircraftReadRepository;
import io.bookingmicroservices.flight.data.mongo.repositories.AirportReadRepository;
import io.bookingmicroservices.flight.data.mongo.repositories.FlightReadRepository;
import io.bookingmicroservices.flight.data.mongo.repositories.SeatReadRepository;
import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import static io.bookingmicroservices.flight.aircrafts.features.Mappings.toAircraftDocument;
import static io.bookingmicroservices.flight.airports.features.Mappings.toAirportDocument;
import static io.bookingmicroservices.flight.flights.features.Mappings.toFlightDocument;
import static io.bookingmicroservices.flight.seats.features.Mappings.toSeatDocument;

@Component
public class FlightDataSeeder implements CommandLineRunner {

  private final AirportReadRepository airportReadRepository;
  private final AircraftReadRepository aircraftReadRepository;
  private final FlightReadRepository flightReadRepository;
  private final SeatReadRepository seatReadRepository;
  private final Logger logger;

  public FlightDataSeeder(
    AirportReadRepository airportReadRepository,
    AircraftReadRepository aircraftReadRepository,
    FlightReadRepository flightReadRepository,
    SeatReadRepository seatReadRepository,
    Logger logger) {
    this.airportReadRepository = airportReadRepository;
    this.aircraftReadRepository = aircraftReadRepository;
    this.flightReadRepository = flightReadRepository;
    this.seatReadRepository = seatReadRepository;
    this.logger = logger;
  }

  @Override
  public void run(String... args) {
    logger.info("Data seeder is started.");
    seedAirport();
    seedAircraft();
    seedFlight();
    seedSeat();
    logger.info("Data seeder is finished.");
  }

  private void seedAirport() {
    if (airportReadRepository.count() == 0) {
      InitialData.airports.forEach(airport -> airportReadRepository.save(toAirportDocument(airport)));
    }
  }

  private void seedAircraft() {
    if (aircraftReadRepository.count() == 0) {
      InitialData.aircrafts.forEach(aircraft -> aircraftReadRepository.save(toAircraftDocument(aircraft)));
    }
  }

  private void seedFlight() {
    if (flightReadRepository.count() == 0) {
      InitialData.flights.forEach(flight -> flightReadRepository.save(toFlightDocument(flight)));
    }
  }

  private void seedSeat() {
    if (seatReadRepository.count() == 0) {
      InitialData.seats.forEach(seat -> seatReadRepository.save(toSeatDocument(seat)));
    }
  }
}
