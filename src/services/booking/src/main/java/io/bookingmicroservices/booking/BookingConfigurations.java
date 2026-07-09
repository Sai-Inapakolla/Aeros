package io.bookingmicroservices.booking;

import buildingblocks.core.event.EventDispatcherConfiguration;
import buildingblocks.keycloak.KeycloakConfiguration;
import buildingblocks.logger.LoggerConfiguration;
import buildingblocks.mediator.MediatorConfiguration;
import buildingblocks.mongo.MongoConfiguration;
import buildingblocks.otel.collector.OtelCollectorConfiguration;
import buildingblocks.outboxprocessor.PersistMessageProcessorConfiguration;
import buildingblocks.problemdetails.CustomProblemDetailsHandler;
import buildingblocks.rabbitmq.RabbitmqConfiguration;
import buildingblocks.swagger.SwaggerConfiguration;
import buildingblocks.threadpool.ThreadPoolConfiguration;
import buildingblocks.web.WebClientConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        CustomProblemDetailsHandler.class,
        MongoConfiguration.class,
        LoggerConfiguration.class,
        RabbitmqConfiguration.class,
        OtelCollectorConfiguration.class,
        SwaggerConfiguration.class,
        KeycloakConfiguration.class,
        WebClientConfiguration.class,
        ThreadPoolConfiguration.class,
        PersistMessageProcessorConfiguration.class,
        EventDispatcherConfiguration.class,
        MediatorConfiguration.class
})
public class BookingConfigurations {
}
