# Software Design - Group Assignment

## Overview

This project consists of a backend service built with Spring Boot and a frontend application created using Create React App. The entire application can be run using Docker and Docker Compose.

## Prerequisites

- Docker: Make sure you have Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).
- Docker Compose: Docker Compose is included with Docker Desktop. Verify its installation by running `docker-compose --version` in your terminal.

## Getting Started

To start the application, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://course-gitlab.tuni.fi/compse110-fall2024/martin-group
    cd https://course-gitlab.tuni.fi/compse110-fall2024/martin-group
    ```

2. Build and start the application using Docker Compose:
    ```sh
    docker-compose up --build
    ```

This command will build the Docker images for both the backend and frontend services and start the containers.

## Accessing the Application

- The frontend application will be available at [http://localhost:3000](http://localhost:3000).
- The backend service will be available at [http://localhost:3001](http://localhost:3001).
