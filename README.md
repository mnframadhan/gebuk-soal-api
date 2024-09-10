# Project Documentation

This document explains the structure and purpose of the different folders in the `src` directory of the project. The project is organized in a modular and maintainable way, ensuring clear separation of concerns.

## Project Structure

```
src/ 
├── application/ 
├── controller/ 
├── error/ 
├── helpers/ 
├── middleware/ 
├── model/ 
├── service/ 
├── types/ 
├── validation/ 
└── index.ts
```

### Folder Descriptions

### 1. `application/`
This folder contains the core logic to bootstrap the application, such as server setup, configuration loading, and initializing necessary components for the API.
### 2. `controller/`
The controllers are responsible for handling HTTP requests and sending responses. Each controller typically corresponds to a specific feature or resource, and they use services to perform business logic.
### 3. `error/`
This folder contains custom error classes and error handling mechanisms used across the API. It's responsible for defining how the API handles different types of errors.
### 4. `helpers/`
Helper functions are stored here, which provide utility across the application. These functions are usually reusable and abstract common logic.
### 5. `middleware/`
The middleware folder contains custom middleware functions that process requests before reaching the controllers.
### 6. `model/`
Models represent the structure of data in the database. These files define how data is stored, including relationships between tables and data validation. 
### 7. `service/`
Services handle the business logic of the application and communicate with models. Controllers call services to perform tasks. This layer helps to keep controllers clean and focused only on HTTP-related tasks.
### 8. `types/`
This folder contains TypeScript type definitions used across the project to ensure type safety. Common types and interfaces are stored here.
### 9. `validation/`
Validation logic is handled in this folder, which is used to ensure that the data sent in requests is properly structured and contains valid data.
### 10. `index.ts`
The entry point of the application. This file is responsible for initializing the Express server, applying middlewares, and starting the app. 

```ts
import { app } from "./application/web";
import { startScheduler } from "./application/scheduler";

// Start the scheduler, 
// Limit basic member akan direset ke 5 setiap pukul 18.45
startScheduler()

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
```


## Set up your .env

```
DATABASE_URL="mysql://<username>:<password>@localhost:<PORT>/<database-name>"
```


## Install Dependencies
```
npm install
```
## Database Migration
```
npx prisma migrate dev
npx prisma generate
```

## Serve Static Files
```
npm run build
```

## Run Application
```
npm run dev
```