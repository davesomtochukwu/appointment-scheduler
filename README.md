# AppointmentPro - Professional Appointment Scheduling

A modern, responsive appointment scheduling application built with Next.js and Back4app.

## Features

- **User Authentication**: Role-based authentication for Providers and Clients
- **Service Management**: Providers can create and manage their services
- **Appointment Booking**: Clients can browse and book available services
- **Calendar Integration**: Interactive calendar for managing appointments
- **Real-time Updates**: Live updates for appointment status changes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Back4app (Parse Server)
- **Database**: Parse Database
- **Authentication**: Parse Authentication

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Back4app account and application set up

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd appointment-scheduler
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the environment variables in `.env.local`:
\`\`\`env
NEXT_PUBLIC_PARSE_APP_ID=your_back4app_app_id
NEXT_PUBLIC_PARSE_JS_KEY=your_back4app_javascript_key
NEXT_PUBLIC_PARSE_SERVER_URL=https://parseapi.back4app.com/
\`\`\`

### Back4app Setup

1. Create a new application on [Back4app](https://www.back4app.com/)
2. Go to App Settings > Security & Keys
3. Copy your Application ID and JavaScript Key
4. Update your `.env.local` file with these values

### Database Schema

The application uses the following Parse classes:

#### User (extends Parse.User)
- `username` (String, required, unique)
- `password` (String, required)
- `email` (String, required)
- `role` (String, either "Provider" or "Client")

#### Service
- `name` (String, required)
- `durationMinutes` (Number, required)
- `price` (Number, required)
- `provider` (Pointer to User, required)
- `description` (String, optional)

#### Appointment
- `client` (Pointer to User, required)
- `provider` (Pointer to User, required)
- `service` (Pointer to Service, required)
- `startTime` (Date, required)
- `endTime` (Date, required)
- `status` (String, one of: "pending", "confirmed", "cancelled", "completed")
- `notes` (String, optional)

### Running the Application

1. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### For Service Providers

1. Register as a Provider
2. Create services with pricing and duration
3. Manage your appointment calendar
4. Confirm or cancel appointments
5. View revenue and analytics

### For Clients

1. Register as a Client
2. Browse available services
3. Book appointments with providers
4. Manage your upcoming appointments
5. Cancel appointments when needed

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── register/         
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   └── layout/          # Layout components
├── contexts/            # React contexts
│   └── auth-context.tsx # Authentication context
├── lib/                 # Utility libraries
│   ├── parse.ts         # Parse SDK setup
│   └── auth.ts          # Authentication utilities
└── middleware.ts        # Next.js middleware
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
