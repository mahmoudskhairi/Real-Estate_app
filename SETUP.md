# Real Estate Mini ERP + Client Portal - Setup Guide

## Quick Start

### 1. Start the Database

```bash
npm run db:start
```

This will start a PostgreSQL database in Docker on port 5432.

### 2. Run Migrations

```bash
npm run db:migrate
```

### 3. Seed Sample Data

```bash
npm run db:seed
```

Or run all at once:

```bash
npm run db:setup
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000/login

## Sample Credentials

### Admin

- Email: `admin@nexuserp.com`
- Password: `admin123`

### Supervisor

- Email: `supervisor@nexuserp.com`
- Password: `user123`

### Operator

- Email: `operator1@nexuserp.com`
- Password: `user123`

### Client

- Email: `client1@example.com`
- Password: `user123`

## Database Management

- **Start DB**: `npm run db:start`
- **Stop DB**: `npm run db:stop`
- **Migrate**: `npm run db:migrate`
- **Seed**: `npm run db:seed`
- **Full Setup**: `npm run db:setup`

## Environment Variables

Copy `env.example` to `.env`:

```bash
cp env.example .env
```

The default configuration works with the Docker Compose setup.
