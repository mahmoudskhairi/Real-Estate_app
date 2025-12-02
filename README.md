# Real Estate Mini ERP + Client Portal

A futuristic, production-grade Real Estate Management System built with Next.js 16, Hono, Prisma, and Tailwind CSS.

## Features

- **Role-Based Access**: Admin, Supervisor, Operator, Client.
- **Leads Management**: Kanban board with drag-and-drop.
- **Real Estate Products**: Property management and tracking.
- **Client Portal**: Dedicated view for clients to track properties and claims.
- **Claims System**: Ticket management with status updates.
- **Futuristic UI**: Glassmorphism, gradients, and smooth animations.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query.
- **Backend**: Hono v4 (API Routes), Prisma ORM, PostgreSQL.
- **DevOps**: Docker, Docker Compose.

## Prerequisites

- **Node.js**: >= 20.9.0 (Required for Next.js 16)
- **npm**: >= 10.0.0
- **Docker**: (Optional, for database)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mahmoudskhairi/Real-Estate_app.git
   cd Rea-Estate_app
   ```

2. **Install Node.js 20+ (if needed)**

   Using nvm:
   ```bash
   nvm install 20
   nvm use 20
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Setup Database**

   - Create a `.env` file based on `.env.example`:
     ```bash
     cp env.example .env
     ```
   - Update `DATABASE_URL` and `JWT_SECRET` in `.env`
   
   - Start PostgreSQL with Docker:
     ```bash
     npm run db:start
     ```
   
   - Run migrations:
     ```bash
     npm run db:migrate
     ```
   
   - Seed the database:
     ```bash
     npm run db:seed
     ```
   
   Or run all database setup at once:
   ```bash
   npm run db:setup
   ```

5. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:start` - Start PostgreSQL with Docker Compose
- `npm run db:stop` - Stop PostgreSQL container
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:setup` - Complete database setup (start + migrate + seed)

## Docker

### Database Only
Start PostgreSQL database:
```bash
docker compose up -d
```

### Full Application
Build and run the entire application with Docker:

```bash
docker build -t real-estate-erp .
docker run -p 3000:3000 --env-file .env real-estate-erp
```

## Key Dependencies

- **Next.js**: 16.0.6
- **React**: 19.2.0
- **Hono**: 4.10.7
- **Prisma**: 5.10.2
- **TanStack Query**: 5.90.11
- **Framer Motion**: 12.23.24
- **Zod**: 4.1.13
- **TypeScript**: 5.x

## Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── (auth)/     # Authentication pages
│   │   ├── (dashboard)/# Dashboard pages
│   │   └── api/        # Hono API routes
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   ├── leads/      # Leads/Kanban components
│   │   └── ui/         # shadcn/ui components
│   ├── lib/            # Utilities
│   └── server/         # Backend logic
│       ├── middleware/ # Auth middleware
│       └── routes/     # API route handlers
└── docker-compose.yml  # PostgreSQL setup
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key-here"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
