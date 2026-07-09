package io.bookingmicroservices.passenger.data.jpa.seeds;

import io.bookingmicroservices.passenger.data.mongo.documents.PassengerDocument;
import io.bookingmicroservices.passenger.passengers.enums.PassengerType;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public final class InitialPassengerData {

    public static final List<PassengerDocument> passengers = new ArrayList<>();

    static {
        passengers.add(new PassengerDocument(UUID.fromString("4c5c0000-97c6-fc34-a0cb-08db322230c0"), "test-passenger", "123456789", PassengerType.Male, 30, false));
    }
}
