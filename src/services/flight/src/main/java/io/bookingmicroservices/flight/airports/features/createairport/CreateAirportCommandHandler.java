package io.bookingmicroservices.flight.airports.features.createairport;

import buildingblocks.mediator.abstractions.commands.ICommandHandler;
import io.bookingmicroservices.flight.airports.dtos.AirportDto;
import io.bookingmicroservices.flight.airports.exceptions.AirportAlreadyExistException;
import io.bookingmicroservices.flight.airports.features.Mappings;
import io.bookingmicroservices.flight.airports.models.Airport;
import io.bookingmicroservices.flight.airports.valueobjects.Address;
import io.bookingmicroservices.flight.airports.valueobjects.AirportId;
import io.bookingmicroservices.flight.airports.valueobjects.Code;
import io.bookingmicroservices.flight.airports.valueobjects.Name;
import io.bookingmicroservices.flight.data.mongo.documents.AirportDocument;
import io.bookingmicroservices.flight.data.mongo.repositories.AirportReadRepository;
import org.springframework.stereotype.Service;

@Service
public class CreateAirportCommandHandler implements ICommandHandler<CreateAirportCommand, AirportDto> {
  private final AirportReadRepository airportRepository;

  public CreateAirportCommandHandler(
    AirportReadRepository airportRepository) {
    this.airportRepository = airportRepository;
  }

  @Override
  public AirportDto handle(CreateAirportCommand command) {

    AirportDocument existAirport = airportRepository.findAirportByCodeAndIsDeletedFalse(command.code());
    if (existAirport != null) {
      throw new AirportAlreadyExistException();
    }

    Airport airport = Airport.create(
      new AirportId(command.id()),
      new Name(command.name()),
      new Code(command.code()),
      new Address(command.address())
    );

    AirportDocument airportEntity = Mappings.toAirportDocument(airport);

    AirportDocument airportCreated = airportRepository.save(airportEntity);
    return Mappings.toAirportDto(airportCreated);
  }
}
