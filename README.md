
# Visit Tracker Backend

This is a backend application built with **Node.js**, **Express**, and **Mongoose** to log and store user visits to websites. It can track visit details, identify unique users using cookies, and query user visits.

## Features
- Log each visit with details like:
  - IP Address
  - User Agent
  - Referrer URL
  - Visit Timestamp
  - User Identifier (using cookies)
- Track visits for multiple websites using the `websiteName` field.
- Retrieve:
  - Unique user count
  - Visit details of specific users
- Designed to be scalable and reusable across multiple projects.

---

## Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository_url>
cd visit-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following contents:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/visitTracker
```

Update `MONGO_URI` as needed for your MongoDB setup.

---

## Project Structure
```
visit-tracker/
├── index.js             # Main entry point
├── models/
│   └── visitModel.js    # Mongoose schema for visits
├── routes/
│   └── visitRoutes.js   # Routes to log visits and fetch data
├── package.json         # NPM dependencies
└── .env                 # Environment variables
```

---

## Usage

### Start the Server
```bash
node index.js
```

The server runs by default on `http://localhost:3000/`.

### API Endpoints
1. **Log a Visit**
   ```http
   POST /api/visit
   Content-Type: application/json
   Body:
   {
     "websiteName": "My Website"
   }
   ```
   Response:
   ```json
   {
     "message": "Visit logged successfully",
     "visit": { /* visit data */ }
   }
   ```

2. **Get Unique User Count**
   ```http
   GET /api/unique-users
   ```
   Response:
   ```json
   {
     "uniqueUserCount": 25
   }
   ```

3. **Get Visits by User**
   ```http
   GET /api/user-visits/:userId
   ```
   Replace `:userId` with the user identifier returned in cookies or stored in the database.

---

## Sample Visit Data
A visit document in MongoDB looks like this:
```json
{
  "_id": "64f12d3ca5848a6b87e896b9",
  "websiteName": "My Website",
  "ipAddress": "123.45.67.89",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "referrer": "https://example.com",
  "visitedAt": "2024-10-27T14:22:34.123Z",
  "userId": "b671d0ff-bc04-4bf6-b2a5-dfa8755e6b71"
}
```

---

## Dependencies
- **Express**: For building the API.
- **Mongoose**: For MongoDB database interaction.
- **Cookie-Parser**: For managing cookies.

---

## Future Enhancements
- Add filtering options for visits (e.g., by date range, website).
- Implement a dashboard to visualize visit data.
- Introduce rate limiting or authentication for secured endpoints.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
This backend system is designed for tracking visits and unique user interactions for multiple projects. Special thanks to **Node.js**, **Express**, and **Mongoose** communities for their support and documentation.
