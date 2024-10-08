# Sparkle Car Wash Frontend

A modern car washing booking system web application built with React, TypeScript, and Vite.

## Quick Links

- Live Demo: [Sparkle Car Wash](https://car-service-frontend-ten.vercel.app/)
- Backend Repository: [Backend](https://github.com/the-pujon/car-service-backend)
- Video Overview: [Overview](https://drive.google.com/file/d/17T3AQg9l1rsLo3HS8PT1xSZsCwprgdXA/view?usp=sharing)

## Technologies

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit, Redux Persist
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS, clsx, tailwind-merge
- **UI Components**: Radix UI, Lucide React icons
- **Forms**: React Hook Form, Zod
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **HTTP Client**: RTQ Query

## Features

- 🔐 User authentication and authorization
- 📱 Responsive design for mobile and desktop
- 🔍 Advanced search and filtering
- 📊 Interactive data visualizations
- 🔄 Offline support and data synchronization
- 🌐 Internationalization and localization
- 🚀 Optimized performance with lazy loading and code splitting

## Project Structure

```
├───assets
│   ├───feature
│   ├───heroImage
│   ├───icons
│   └───Image
│       └───Services
├───components
│   ├───Dashboard
│   ├───home
│   ├───layout
│   └───ui
├───context
├───hooks
├───lib
├───pages
│   ├───Authentication
│   ├───Booking
│   ├───Dashboard
│   │   ├───Admin
│   │   │   ├───AdminOverview
│   │   │   ├───ServiceManagement
│   │   │   ├───SlotManagement
│   │   │   └───UserManagement
│   │   └───User
│   │       ├───MyBookings
│   │       └───Profile
│   ├───Error
│   ├───Home
│   ├───Review
│   ├───ServiceDetails
│   └───Services
├───redux
│   ├───api
│   └───features
│       ├───auth
│       ├───bookings
│       ├───review
│       ├───service
│       ├───slot
│       └───users
├───routes
└───utils
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`

### Scripts

- `npm run dev` : Start development server
- `npm run build` : Build for production
- `npm run lint` : Run linter

## Credentials

For testing purposes, use the following credentials:

- **User**: test@example.com / password123
- **Admin**: admin@example.com / adminpass456
