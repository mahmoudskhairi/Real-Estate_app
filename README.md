# Real Estate Mini ERP + Client Portal

A futuristic, production-grade Real Estate Management System built with Next.js 14, Hono, Prisma, and Tailwind CSS.

## Features

- **Role-Based Access**: Admin, Supervisor, Operator, Client.
- **Leads Management**: Kanban board with drag-and-drop.
- **Real Estate Products**: Property management and tracking.
- **Client Portal**: Dedicated view for clients to track properties and claims.
- **Claims System**: Ticket management with status updates.
- **Futuristic UI**: Glassmorphism, gradients, and smooth animations.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query.
- **Backend**: Hono (API Routes), Prisma ORM, PostgreSQL.
- **DevOps**: Docker, GitHub Actions.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd perihelion-crater
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Database**

   - Create a `.env` file with your `DATABASE_URL` and `JWT_SECRET`.
   - Run migrations:
     ```bash
     npx prisma migrate dev
     ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Docker

Build and run with Docker:

```bash
docker build -t real-estate-erp .
docker run -p 3000:3000 real-estate-erp
```
