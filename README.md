# Motor Insurance API

This repository contains a NestJS-based backend API for managing motor insurance premium queries and administrative functionalities. The API is scalable, secure, and deployment-ready, with comprehensive test coverage and proper validation.

---


## Installation and Setup

### Prerequisites
1. Node.js (v16 or later)
2. PostgreSQL database
3. Docker and Docker Compose (optional for deployment)

### Steps
1. **Clone the Repository**
   ```bash
   git clone <repo_url>
   cd <repo_directory>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and configure the following:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=admin
   DATABASE_PASSWORD=password
   DATABASE_NAME=MOTOR_INSURANCE_WEBSITE
   ```

4. **Run Migrations**
   ```bash
   npm run migration:run
   ```

5. **Run the Application**
   ```bash
   npm run start:dev
   ```

6. **Access Swagger Documentation**
   - Navigate to `http://localhost:3000/api`.

---

## Testing

### Unit Tests
Run unit tests to ensure business logic is working as expected:
```bash
npm run test
```

### Test Coverage
Generate test coverage reports:
```bash
npm run test:cov
```

### End-to-End (E2E) Tests
Verify complete API functionality:
```bash
npm run test:e2e
```

---

## Deployment

1. **Start Services with Docker Compose**
   ```bash
   docker-compose up -d
   ```
2. The application will be available at `http://localhost:3000`.

---

## Linting and Formatting

- **Lint Code:**  
  ```bash
  npm run lint
  ```
- **Format Code with Prettier:**  
  ```bash
  npm run prettier
  ```

---


## Features and Requirements Checklist

### 1. API Endpoints
- **GET /product**  
  Accessible by all users to query products by `productCode` and `location`.  
  ✅ Implemented in `ProductController` with validation using DTOs.

- **POST /product**  
  Admin-only endpoint to add new products.  
  ✅ Implemented with role-based access control (using middleware/guards).

- **PUT /product**  
  Admin-only endpoint to update products.  
  ✅ Included in the implementation with the appropriate query and body parameters.

- **DELETE /product**  
  Admin-only endpoint to delete products by `productCode`.  
  ✅ Implemented and tested for admin access control.

### 2. Swagger Integration
- Swagger documentation is included for all endpoints.  
  ✅ Swagger setup is implemented in `main.ts`, and DTOs ensure standardized communication.

### 3. NestJS Structure
- One module with one controller and provider.  
  ✅ `ProductModule` contains `ProductController` and `ProductService`, adhering to the structure.

### 4. Database Integration
- **PostgreSQL connection using TypeORM.**  
  ✅ Connected using `TypeOrmModule` with `Product` entity and repository.

### 5. Security and Role-Based Access Control
- Middleware for security and role checking.  
  ✅ Middleware checks `role` in headers, and an `AdminGuard` ensures restricted access to certain endpoints.

### 6. Scalability and Load Handling
- **Should handle heavy loads.**  
  ✅ Proper TypeORM integration and middleware ensure scalability. For production, scaling can be managed via Docker and horizontal scaling strategies.

### 7. Deployment Readiness
- **Docker Compose setup.**  
  ✅ Provided `docker-compose.yml` for database and application setup.

### 8. Unit Tests
- **At least 80% code coverage.**  
  ✅ Comprehensive unit tests are provided for `ProductService` and `ProductController`.  
  ✅ Tests include coverage for all major functionalities.

### 9. End-to-End (E2E) Tests
✅ E2E tests provided for all endpoints using SQLite as a test database.

### 10. Linter Usage
- Linter setup encouraged.  
  ✅ ESLint configuration and Prettier integration included for code quality.

---

## Edge Cases Handled
- **Non-Existent Product:** Tests and logic handle cases where a product is not found.
- **Invalid Inputs:** DTOs ensure proper validation of inputs.
- **Role Validation:** Middleware and guards ensure only authorized users can access admin endpoints.
- **Database Errors:** Handled gracefully with exceptions (e.g., `NotFoundException`).

---
