package io.bookingmicroservices.passenger.data.jpa.seeds;

import org.slf4j.Logger;
import io.bookingmicroservices.passenger.data.mongo.repositories.PassengerReadRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class PassengerDataSeeder implements CommandLineRunner {

    private final PassengerReadRepository passengerReadRepository;
    private final Logger logger;

    public PassengerDataSeeder(PassengerReadRepository passengerReadRepository, Logger logger) {
        this.passengerReadRepository = passengerReadRepository;
        this.logger = logger;
    }

    @Override
    public void run(String... args) {
        logger.info("Passenger data seeder is started.");
        seedPassenger();
        logger.info("Passenger data seeder is finished.");
    }

    private void seedPassenger() {
        if (passengerReadRepository.count() == 0) {
            InitialPassengerData.passengers.forEach(passengerReadRepository::save);
        }
    }
}
