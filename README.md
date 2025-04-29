# 🏍️ Bike Servicing Management API

A robust RESTful API for managing bike servicing operations, including customer records, bike details, and service tracking.

## 🌐 Live Demo

**Backend URL**: [https://bike-service-management-seven.vercel.app](https://bike-service-management-seven.vercel.app)

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe programming
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **Jest** - Testing framework
- **Swagger** - API documentation

## ✨ Key Features

- **Customer Management**: CRUD operations for customer profiles
- **Bike Inventory**: Track bikes associated with customers
- **Service Records**: Manage bike servicing from intake to completion
- **Overdue Service Tracking**: Identify services pending for more than 7 days
- **Error Handling**: Comprehensive error responses with appropriate status codes
- **Data Validation**: Input validation for all API endpoints
- **UUID Implementation**: Secure identification using UUIDs for all entities

## 📋 API Endpoints

### Customer Management

- `POST /api/customers` - Create a new customer
- `GET /api/customers` - Retrieve all customers
- `GET /api/customers/:id` - Get customer by ID
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Remove a customer

### Bike Management

- `POST /api/bikes` - Register a new bike
- `GET /api/bikes` - List all bikes
- `GET /api/bikes/:id` - Fetch specific bike details

### Service Records

- `POST /api/services` - Create a service record
- `GET /api/services` - List all service records
- `GET /api/services/:id` - Get specific service details
- `PUT /api/services/:id/complete` - Mark service as completed
- `GET /api/services/status` - View pending/overdue services (>7 days)

## 🚀 Setup Guide

### Prerequisites

- Node.js
- PostgreSQL database
- bun, npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/SMTamim/bike_service_management_assignment_8.git bike_servicing_api
   cd bike_servicing_api
   ```

2. Install dependencies

   ```bash
   bun install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   ```

   Then update the `.env` file with your database connection string and other configurations.

4. Database setup

   ```bash
   bunx prisma migrate dev --name init
   ```

5. Start the development server

   ```bash
   bun dev
   ```

6. For production
   ```bash
   bun run build
   bun start
   ```

## 📊 Database Schema

### Customer

- `customerId` (UUID): Primary key
- `name` (String): Customer's full name
- `email` (String): Contact email (unique)
- `phone` (String): Contact phone number
- `createdAt` (DateTime): Timestamp of creation

### Bike

- `bikeId` (UUID): Primary key
- `brand` (String): Bike manufacturer
- `model` (String): Model name
- `year` (Int): Manufacturing year
- `customerId` (UUID): Foreign key to Customer

### ServiceRecord

- `serviceId` (UUID): Primary key
- `bikeId` (UUID): Foreign key to Bike
- `serviceDate` (DateTime): Service start date
- `completionDate` (DateTime): Service completion date (nullable)
- `description` (String): Service description
- `status` (String): Status (pending, in-progress, done)

## 🔒 Error Handling

All API endpoints include standardized error responses:

```json
{
  "success": false,
  "status": 404,
  "message": "Resource not found",
  "stack": "Optional stack trace (development only)"
}
```
