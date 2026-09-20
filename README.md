# Aeros - A Flight Booking Simulator Using Microsevices

**Aeros** is an enterprise distributed flight reservation and operations platform built with a high-performance **Java Spring Boot Microservices** backend and a modern **Angular 21** frontend.

---

## 🌟 Overview & Highlights

- **Microservices Architecture**: Decentralized domain boundaries for Flights, Passengers, Bookings, and API Gateway.
- **CQRS Pattern**: Optimized transactional writes on **PostgreSQL** and read-optimized query projections on **MongoDB**.
- **Event-Driven Messaging**: Asynchronous event publishing and consuming orchestrated via **RabbitMQ**.
- **Identity & Access Management**: Centralized OAuth2 / OpenID Connect token authentication powered by **Keycloak**.
- **Modern Angular Frontend**: Clean cockpit aviation UI (Deep Navy, Sky Blue, Warm Amber, Vivid Red buttons, and zero purple) featuring an interactive cabin seat map, real-time booking flows, digital boarding passes, and live telemetry.

---

## 🏗️ Architecture & Port Map

| Component / Service | Port | Directory | Description |
| :--- | :--- | :--- | :--- |
| **Keycloak IAM** | `8080` | `deployments/docker-compose` | OAuth2 & OpenID Connect auth provider |
| **API Gateway** | `8081` | `src/apigateway` | Spring Cloud Gateway reverse proxy & token relay |
| **Flight Service** | `8082` | `src/services/flight` | Flight schedules, airports, and aircraft fleet |
| **Passenger Service** | `8083` | `src/services/passenger` | Passenger profiles and identity records |
| **Booking Service** | `8084` | `src/services/booking` | Reservation coordinator, seat assignment, and CQRS |
| **PostgreSQL** | `5432` | `deployments/docker-compose` | Relational database for transactional write side |
| **MongoDB** | `27017` | `deployments/docker-compose` | NoSQL database for read projections |
| **RabbitMQ** | `5672` (UI: `15672`) | `deployments/docker-compose` | Asynchronous message broker |
| **Angular Frontend** | `4200` | `frontend` | Modern Angular SPA dashboard & cabin seat map |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java 17+ / JDK 22**
- **Apache Maven 3.9+**
- **Node.js v20+ & npm** (with Angular CLI)
- **Docker & Docker Compose** (for infrastructure)

---

### Step 1: Start Backing Services (DBs, Broker & IAM)
Launch PostgreSQL, MongoDB, RabbitMQ, and Keycloak with Docker Compose:
```powershell
docker compose -f "deployments/docker-compose/docker-compose.yml" up -d
```

---

### Step 2: Build the Core Shared Library
The microservices depend on the shared kernel library `buildingblocks`. Compile and install it to your local Maven repository:
```powershell
cd "src/buildingblocks"
mvn clean install -DskipTests
cd ../..
```

---

### Step 3: Launch the Microservices

You can start all 4 services at once in parallel PowerShell windows:

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'src/services/flight'; mvn spring-boot:run"; `
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'src/services/passenger'; mvn spring-boot:run"; `
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'src/services/booking'; mvn spring-boot:run"; `
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'src/apigateway'; mvn spring-boot:run"
```

*(Or launch them individually by running `mvn spring-boot:run` inside each service directory).*

---

### Step 4: Start the Angular Frontend
Navigate to the `frontend` directory and start the development server:
```powershell
cd "frontend"
npm start
```
Then open your browser at **[http://localhost:4200](http://localhost:4200)**.

---

## 📡 API Testing & REST Client

A comprehensive set of sample requests is available in [`booking.rest`](booking.rest). You can execute these requests directly using VS Code / IDE REST Client:

- **Keycloak Token Generation**: `POST http://localhost:8080/realms/keycloak-realm/protocol/openid-connect/token`
- **Flight Service**: `GET http://localhost:8082` / `http://localhost:8081/api/v1/flight`
- **Passenger Service**: `GET http://localhost:8083` / `http://localhost:8081/api/v1/passenger`
- **Booking Service**: `GET http://localhost:8084` / `http://localhost:8081/api/v1/booking`

---

## 📁 Repository Structure

```text
Aeros/
├── deployments/
│   └── docker-compose/        # Docker Compose configuration (Postgres, Mongo, RabbitMQ, Keycloak)
├── frontend/                  # Modern Angular 21 Single Page Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/        # TypeScript domain models (Flight, Seat, Passenger, Booking)
│   │   │   └── services/      # Reactive API & State management services
│   │   └── styles.css         # Aviation Design System (No purple, Sky Blue, Navy, Amber, Red)
│   └── package.json
├── src/
│   ├── apigateway/            # Spring Cloud Gateway (Port 8081)
│   ├── buildingblocks/        # Shared core kernel library (CQRS, Events, JPA, Mongo)
│   └── services/
│       ├── flight/            # Flight Microservice (Port 8082)
│       ├── passenger/         # Passenger Microservice (Port 8083)
│       └── booking/           # Booking Microservice (Port 8084)
├── booking.rest               # REST Client endpoint test scripts
└── README.md
```

---

*Created and maintained by Sai-Inapakolla*
