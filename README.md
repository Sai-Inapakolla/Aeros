# Aeros ✈️

Aeros is a distributed flight booking system built with a modern microservices architecture using Java Spring Boot.

## Overview

This project provides a robust backend infrastructure designed for high availability, scalability, and performance in managing flight reservations, passenger data, and core travel services.

### Core Microservices

The application is broken down into the following bounded contexts:
- **API Gateway**: Central entry point routing requests to the appropriate microservices.
- **Flight Service**: Manages flight operations, schedules, and airplane details.
- **Passenger Service**: Manages passenger information and tracking.
- **Booking Service**: Handles the ticket reservation flow and booking lifecycle.

## Technologies Used

* **Java Spring Boot**: Core framework for all microservices.
* **Spring Cloud Gateway**: API routing.
* **PostgreSQL**: Relational database for the write side.
* **MongoDB**: NoSQL database for the read side (CQRS).
* **RabbitMQ**: Message broker for asynchronous event-driven communication.
* **Keycloak**: Identity and access management (OAuth2 / OpenID-Connect).
* **OpenTelemetry**: Metrics, tracing, and logging.

## Architecture

The project leverages several modern architectural patterns:
* **Vertical Slice Architecture** for feature encapsulation.
* **CQRS (Command Query Responsibility Segregation)** to optimize read and write operations independently.
* **Event-Driven Architecture** for decoupled microservice communication.

## Getting Started

*(Note: Docker configuration is currently being set up. To run this natively, you will need Java 17+, Maven, PostgreSQL, MongoDB, RabbitMQ, and Keycloak running locally).*

1. Build the microservices:
   ```bash
   mvn clean install
   ```
2. Run each service individually:
   ```bash
   mvn spring-boot:run
   ```

---
*Created and maintained by Sai-Inapakolla*
