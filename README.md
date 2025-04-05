# Wildheart Project

## Overview
Wildheart is a comprehensive system for managing and analyzing organizational structures and relationships.

## Project Structure

### Backend (.NET)
- **Wildheart.API**: REST API layer with controllers and configuration
- **Wildheart.Application**: Application services, use cases, handlers, and DTOs
- **Wildheart.Domain**: Domain models, aggregates, entities, and repository interfaces
- **Wildheart.Infrastructure**: Infrastructure implementations, external integrations
- **Wildheart.Persistence**: Database configuration and migrations
- **Wildheart.EventBus**: Message bus implementation using RabbitMQ
- **Wildheart.Graph**: Graph analysis and visualization logic

### Frontend (Angular)
- **wildheart-fe**: Angular application with Material Design
  - Core services and models
  - Shared components and styles
  - Feature modules
  - Global styling with SCSS

### Infrastructure
- Docker configurations for PostgreSQL and RabbitMQ
- Kubernetes deployment manifests

## Getting Started
1. Clone the repository
2. Install dependencies
3. Set up the development environment
4. Run the application

## Development
- Backend: .NET 9.x
- Frontend: Angular 19.x
- Database: PostgreSQL
- Message Bus: RabbitMQ

## License
[License information] 