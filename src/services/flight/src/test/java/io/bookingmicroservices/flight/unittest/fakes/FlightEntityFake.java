package io.bookingmicroservices.flight.unittest.fakes;

import io.bookingmicroservices.flight.data.mongo.documents.FlightDocument;
import io.bookingmicroservices.flight.flights.features.createflight.CreateFlightCommand;

public class FlightEntityFake {
  public static FlightDocument generate(){
   CreateFlightCommand command =  CreateFlightCommandFake.generate();
    return new FlightDocument(
        command.id(),
        command.flightNumber(),
        command.aircraftId(),
        command.departureAirportId(),
        command.arriveAirportId(),
        command.durationMinutes(),
        command.status(),
        command.price(),
        command.arriveDate(),
        command.departureDate(),
        command.flightDate(),
        false
    );
  }
}
