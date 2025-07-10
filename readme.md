### `README.md`

````markdown
# HuntLog API

An express.js API for tracking job applications with secure JWT authentication, refresh tokens, password reset via email (SendGrid), and advanced CSV export filtering.

---

## 🚀 Features

- 🔐 JWT-based authentication (access + refresh tokens)
- 🔄 Token refresh flow with secure cookies
- 🧾 Forgot/reset password via secure email links (SendGrid)
- 📝 CRUD operations on job applications
- 🧃 Tagging and note support
- 📤 Export job applications to CSV
- 🔍 Filter CSV by status, tag, and date range
- 🛡️ Protected routes using middleware

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT + HTTP-only cookies
- **Email**: SendGrid
- **CSV**: json2csv

---

## Installation

```bash
git clone https://github.com/yourusername/HuntLog_Backend.git
cd HuntLog_Backend
npm install
````

Create a `.env` file with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_jwt_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=your_email@example.com
BASE_URL=http://localhost:5000
```

---

## Run the App

```bash
npm start
```

---

## API Overview

### Auth Routes

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | `/api/auth/register`     | Register new user    |
| POST   | `/api/auth/login`        | Login user           |
| POST   | `/api/auth/logout`       | Logout user          |
| POST   | `/api/auth/refresh`      | Refresh access token |
| POST   | `/api/auth/forgot`       | Send reset email     |
| POST   | `/api/auth/reset/:token` | Reset password       |

---

### Job Application Routes

All routes below require authentication via `Authorization: Bearer <token>` or a secure cookie if using refresh flow.

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/api/jobs`        | Get all jobs for user      |
| POST   | `/api/jobs`        | Create new job application |
| GET    | `/api/jobs/:id`    | Get a single job           |
| PUT    | `/api/jobs/:id`    | Update a job application   |
| DELETE | `/api/jobs/:id`    | Delete a job               |
| GET    | `/api/jobs/export` | Export jobs to CSV         |

#### CSV Export Filters

You can apply filters like:

```http
GET /api/jobs/export?status=Applied&tag=frontend&from=2024-01-01&to=2024-12-31
```

---

## Authentication

Access tokens are sent via Bearer token or cookie. Refresh tokens are HTTP-only cookies. You can integrate it securely with a frontend like React or Next.js.

---

## SendGrid Setup

1. [Sign up at SendGrid](https://sendgrid.com/)
2. Generate an API key
3. Set `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` in `.env`
4. Vercel-compatible — uses environment variables only

---

## License

MIT

---

## Author

Developed by [Mayank Tiwari](https://github.com/mayankt28)