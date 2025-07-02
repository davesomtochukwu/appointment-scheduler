import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, Shield, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <div className="flex items-center justify-center">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">AppointmentPro</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
          <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Your Appointments
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Professional appointment scheduling made simple. Connect service providers with clients through our
                  intuitive booking platform.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Powerful features designed for both service providers and clients
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Smart Scheduling</CardTitle>
                  <CardDescription>
                    Intelligent calendar management with automatic conflict detection and availability optimization.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Real-time Booking</CardTitle>
                  <CardDescription>
                    Instant appointment confirmations with automated notifications and reminders.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multi-role Support</CardTitle>
                  <CardDescription>
                    Separate interfaces for service providers and clients with role-specific features.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">For Service Providers</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    Manage your services and pricing
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    Set your availability and working hours
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    Track appointments and revenue
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    Automated booking confirmations
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">For Clients</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    Browse and book services easily
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    View real-time availability
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    Manage your appointments
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    Receive booking confirmations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of service providers and clients who trust AppointmentPro for their scheduling needs.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8">
                    Create Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 AppointmentPro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
