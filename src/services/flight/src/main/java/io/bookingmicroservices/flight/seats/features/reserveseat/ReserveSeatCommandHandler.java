package io.bookingmicroservices.flight.seats.features.reserveseat;

import buildingblocks.mediator.abstractions.commands.ICommandHandler;
import io.bookingmicroservices.flight.data.mongo.documents.SeatDocument;
import io.bookingmicroservices.flight.data.mongo.repositories.SeatReadRepository;
import io.bookingmicroservices.flight.seats.dtos.SeatDto;
import io.bookingmicroservices.flight.seats.exceptions.SeatNumberAlreadyReservedException;
import io.bookingmicroservices.flight.seats.features.Mappings;
import io.bookingmicroservices.flight.seats.models.Seat;
import io.bookingmicroservices.flight.seats.valueobjects.FlightId;
import io.bookingmicroservices.flight.seats.valueobjects.SeatNumber;
import org.springframework.stereotype.Service;


@Service
public class ReserveSeatCommandHandler implements ICommandHandler<ReserveSeatCommand, SeatDto> {
  private final SeatReadRepository seatRepository;

  public ReserveSeatCommandHandler(SeatReadRepository seatRepository) {
    this.seatRepository = seatRepository;
  }

  @Override
  public SeatDto handle(ReserveSeatCommand command) {
    SeatDocument existSeat = seatRepository.findSeatByFlightIdAndSeatNumberAndIsDeletedFalse(command.flightId(), command.seatNumber());

    if (existSeat == null) {
         throw new SeatNumberAlreadyReservedException();
    }

    SeatDocument seatUpdated = seatRepository.save(Mappings.toReserveSeatDocument(existSeat));

    return Mappings.toSeatDto(seatUpdated);
  }
}
