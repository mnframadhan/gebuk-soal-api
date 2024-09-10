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

- **`database.ts`**: Sets up Prisma Client and manages database connections.
- **`scheduler.ts`**: Manages background tasks and scheduled operations.
- **`web.ts`**: Configures API endpoints and handles routing logic.


### 2. `controller/`
The controllers are responsible for handling HTTP requests and sending responses. Each controller typically corresponds to a specific feature or resource, and they use services to perform business logic.

- **`administrator-controller.ts`**: Manages operations related to administrators, including CRUD functions.
- **`contributor-controller.ts`**: Handles contributor-related requests and business logic.
- **`order-controller.ts`**: Manages order-related operations such as creation of orders.
- **`soal-controller.ts`**: Handles operations related to `Soal` entities (e.g., questions, texts, options, answer, ... , explanation).
- **`student-controller.ts`**: Manages student profiles and interactions.
- **`works-controller.ts`**: Handles work submissions and related operations.

### 3. `error/`
This folder contains custom error classes and error handling mechanisms used across the API. It's responsible for defining how the API handles different types of errors.

- **`response-error.ts`**: Defines custom error classes and error-handling logic for the application. It standardizes how errors are thrown and handled, ensuring consistent responses and simplifying error management across the application.

### 4. `helpers/`
Helper functions are stored here, which provide utility across the application. These functions are usually reusable and abstract 
common logic.

- **`create-works-update.ts`**: Provides a helper function to create or update work-related data. It simplifies the logic for managing work submissions or updates, ensuring consistency across the application.
  
- **`get-random-integer.ts`**: Contains a utility function to generate a random integer within a specified range. It is useful for tasks like generating random IDs, selecting random items, or any scenario that requires random number generation.

### 5. `middleware/`
The middleware folder contains custom middleware functions that process requests before reaching the controllers.

- **`auth-admin-middleware.ts`**: Middleware for authenticating administrators using the `X-API-TOKEN-ADMIN` header. It verifies the token and grants access to admin-specific routes.

- **`auth-middleware.ts`**: Middleware for authenticating contributors using the `X-API-TOKEN` header. It ensures that only authorized contributors can access specific resources.

- **`auth-student-middleware.ts`**: Middleware for authenticating students using the `X-API-TOKEN-STUDENT` header. It validates the token to restrict access to student-specific routes.

- **`error-middleware.ts`**: Handles application-wide error responses. It catches and formats errors in a consistent manner before sending them to the client.

- **`request-limiter.ts`**: Middleware that limits the number of requests a client can make within a specified time window. Helps to prevent abuse by throttling excessive requests from the same IP.

### 6. `model/`
Models represent the structure of data in the database. These files define how data is stored, including relationships between tables and data validation. 

- **`administrator-model.ts`**: Defines the data structure and database schema for the `Administrator` entity. This model includes fields and relationships specific to administrators.

- **`contributor-model.ts`**: Contains the schema for the `Contributor` entity, defining the structure for contributors' data and related fields.

- **`order-model.ts`**: Defines the data model for `Order` entities, including fields for managing order details and transactions.

- **`pages.ts`**: Manages the structure for paginated data or static pages in the application.

- **`soal-model.ts`**: Contains the schema for `Soal` entities, which may represent quiz or exam questions, along with their attributes like options and correct answers.

- **`works-model.ts`**: Defines the structure for `Works` entities, managing student submissions or assignments.

### 7. `service/`
Services handle the business logic of the application and communicate with models. Controllers call services to perform tasks. This layer helps to keep controllers clean and focused only on HTTP-related tasks.

- **`administrator-service.ts`**: Implements the business logic for managing `Administrator` entities. It interacts with the model and handles operations like creating, updating, or deleting administrators.

- **`contributor-service.ts`**: Contains the core business logic for managing `Contributor` entities. It deals with tasks such as contributor management and updates to contributor data.

- **`order-service.ts`**: Handles the business logic related to `Order` entities, including order creation, processing, and updating.

- **`soal-service.ts`**: Implements logic for managing `Soal` entities (e.g., quiz or exam questions), including creation, updates, and retrieval of question data.

- **`student-service.ts`**: Provides the business logic for managing `Student` entities, handling tasks such as student registration, profile management, and related student operations.

- **`works-service.ts`**: Manages the business logic for handling `Works` entities, including student work submissions and other related operations.

### 8. `types/`
This folder contains TypeScript type definitions used across the project to ensure type safety. Common types and interfaces are stored here.
- **`admin-request.ts`**: Defines custom types for requests related to `Administrator` entities. It extends the Express `Request` interface and adds additional properties relevant to administrator-specific requests.

- **`contributor-request.ts`**: Contains type definitions for requests involving `Contributor` entities. This file extends the Express `Request` interface to include contributor-related properties.

- **`student-request.ts`**: Defines custom types for requests associated with `Student` entities. For example, it extends the `Request` interface from Express and includes an optional `student` property, which refers to the `Student` model from Prisma.

### 9. `validation/`
Validation logic is handled in this folder, which is used to ensure that the data sent in requests is properly structured and contains valid data.

- **`Validation.ts`**: A utility class that provides a generic validation method using Zod. It takes a Zod schema and data as input, and parses the data to ensure it conforms to the schema.

- **`contributor-validation.ts`**: Contains Zod schemas for validating data related to `Contributor` entities, such as creation, update, and other contributor-specific operations.

- **`order-validation.ts`**: Defines Zod schemas for validating `Order` data, ensuring that order creation, updates, and other operations meet the specified criteria.

- **`soal-validation.ts`**: Provides Zod schemas for validating `Soal` (question) data, such as question creation, options, and other related fields.

- **`student-validation.ts`**: Contains multiple Zod schemas for validating `Student` data. It includes validation for actions like student creation, login, and updates (e.g., username, password, avatar).


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