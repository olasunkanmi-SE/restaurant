# Restaurant Management System

This project is a comprehensive restaurant management system with a NestJS backend and React frontend, designed to streamline restaurant operations and enhance customer experience.

The system provides functionality for managing menus, orders, restaurants, and customers. It includes features such as user authentication, role-based access control, and real-time order processing.

## Postman Collection
https://documenter.getpostman.com/view/6737031/2sAYQiC8QX#640e3128-ede1-4647-b61e-f059300e7917

## Repository Structure

```
.
├── backend/
│   ├── src/
│   │   ├── addon/
│   │   ├── application/
│   │   ├── audit/
│   │   ├── cart/
│   │   ├── category/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── item/
│   │   ├── location/
│   │   ├── menu/
│   │   ├── order/
│   │   ├── order_manager/
│   │   ├── order_notes/
│   │   ├── order_processing_queue/
│   │   ├── order_statuses/
│   │   ├── restaurant/
│   │   ├── shared/
│   │   ├── singleclient/
│   │   └── utils/
│   ├── test/
│   ├── nest-cli.json
│   ├── ormconfig.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── apis/
    │   ├── application/
    │   ├── components/
    │   ├── contexts/
    │   ├── data/
    │   ├── hooks/
    │   ├── interfaces/
    │   ├── models/
    │   ├── pages/
    │   ├── reducers/
    │   └── utility/
    ├── package.json
    └── tsconfig.json
```

## Usage Instructions

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend && npm run start:dev
   ```
2. Start the frontend development server:
   ```
   cd frontend && npm run start:dev
   ```

### API Endpoints

- `/api/restaurants`: CRUD operations for restaurants
- `/api/menus`: CRUD operations for menus
- `/api/items`: CRUD operations for menu items
- `/api/orders`: CRUD operations for orders
- `/api/singleclients`: User management and authentication

### Authentication

The system uses JWT for authentication. To access protected routes, include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer <your_jwt_token>
```

### Testing

Run backend tests:

```
cd backend && npm run test
```

Run frontend tests:

```
cd frontend && npm run test
```

## Data Flow

1. User authentication: Users sign in through the frontend, which sends a request to the backend's authentication service.
2. Restaurant owners create a new restaurant
4. Menu management: Restaurant owners can create and update menus.
5. Order processing: Customers place orders through the frontend, which sends the order details to the backend's order service.
6. Order status updates: The backend processes orders and updates their status, which is then reflected in the frontend in real-time.

```
[Frontend] <--> [API Gateway] <--> [Backend Services (Auth, Menu, Order, etc.)] <--> [Database]
```

## Infrastructure

The backend application uses NestJS and is structured with the following key components:

- AuthModule: Handles user authentication and authorization
- DocumentDatabaseModule: Configures the MongoDB connection
- Various repository interfaces and implementations for data access

Key resources:

- MongoDB database (configured in DocumentDatabaseModule)
- JWT for authentication (configured in AuthModule)

## Troubleshooting

- If you encounter CORS issues, ensure that the backend's CORS settings match your frontend's domain.
- For database connection issues, verify that the `DATABASE_URL` environment variable is correctly set.
- If authentication fails, check that the JWT secret keys are properly configured in both the backend and frontend.

##
<img width="363" alt="Screenshot 2023-06-22 at 10 32 04 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/e5602acd-788b-4274-88bf-1b60755da07d">

<img width="360" alt="Screenshot 2023-06-22 at 10 49 25 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/55685caf-f6a4-4150-a92e-96506b21aca4">

<img width="360" alt="Screenshot 2023-06-22 at 10 51 45 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/5660845f-81c3-4f5b-b943-113877b592f8">

<img width="364" alt="Screenshot 2023-06-22 at 10 53 26 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/6ac5c682-d398-4c6a-9f60-6d9979a16c98">

<img width="363" alt="Screenshot 2023-06-22 at 10 53 53 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/882d5f21-3af2-4b5b-9953-8ccbfa16b2a1">

<img width="361" alt="Screenshot 2023-06-22 at 10 54 29 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/4dde348e-5a33-49f3-a2ea-4d166394aba1">

<img width="359" alt="Screenshot 2023-06-22 at 10 55 07 AM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/f8a4c014-3cec-4c77-9f73-e878b532b6e0">

<img width="362" alt="Screenshot 2023-07-25 at 9 21 50 PM" src="https://github.com/olasunkanmi-SE/restaurant/assets/60177090/2905a9c3-9a85-4156-851e-d7df753d3c3b">
