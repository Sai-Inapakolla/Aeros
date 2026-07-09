package io.bookingmicroservices.flight.flights.features.deleteflight;

import buildingblocks.mediator.abstractions.commands.ICommandHandler;
import io.bookingmicroservices.flight.data.mongo.documents.FlightDocument;
import io.bookingmicroservices.flight.data.mongo.repositories.FlightReadRepository;
import io.bookingmicroservices.flight.flights.dtos.FlightDto;
import io.bookingmicroservices.flight.flights.exceptions.FlightNotFoundException;
import io.bookingmicroservices.flight.flights.features.Mappings;
import io.bookingmicroservices.flight.flights.models.Flight;
import org.springframework.stereotype.Component;

@Component
public class DeleteFlightCommandHandler implements ICommandHandler<DeleteFlightCommand, FlightDto> {
  private final FlightReadRepository flightRepository;

  public DeleteFlightCommandHandler(FlightReadRepository flightRepository) {
    this.flightRepository = flightRepository;
  }

  @Override
  public FlightDto handle(DeleteFlightCommand command) {

    FlightDocument existingFlight = flightRepository.findByFlightIdAndIsDeletedFalse(command.id());
    if (existingFlight == null) {
      throw new FlightNotFoundException();
    }

    Flight flight = Mappings.toFlightAggregate(existingFlight);

    flight.delete();

    FlightDocument flightEntity = Mappings.toFlightDocument(flight);

    FlightDocument updatedFlight = flightRepository.save(flightEntity);
    return Mappings.toFlightDto(updatedFlight);
  }
}
