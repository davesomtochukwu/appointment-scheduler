"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, DollarSign, Plus } from "lucide-react"
import Link from "next/link"
import { Appointment, Service } from "@/lib/parse"
import Parse from "@/lib/parse"

interface DashboardStats {
  upcomingAppointments: number
  totalServices: number
  totalRevenue: number
  completedAppointments: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    upcomingAppointments: 0,
    totalServices: 0,
    totalRevenue: 0,
    completedAppointments: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      if (user?.role === "Provider") {
        await loadProviderData()
      } else {
        await loadClientData()
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadProviderData = async () => {
    const currentUser = Parse.User.current()
    if (!currentUser) return

    // Load services
    const serviceQuery = new Parse.Query(Service)
    serviceQuery.equalTo("provider", currentUser)
    const services = await serviceQuery.find()

    // Load appointments
    const appointmentQuery = new Parse.Query(Appointment)
    appointmentQuery.equalTo("provider", currentUser)
    appointmentQuery.include(["client", "service"])
    appointmentQuery.descending("startTime")
    const appointments = await appointmentQuery.find()

    // Calculate stats
    const now = new Date()
    const upcomingAppointments = appointments.filter(
      (apt) => apt.get("startTime") > now && apt.get("status") !== "cancelled",
    ).length

    const completedAppointments = appointments.filter((apt) => apt.get("status") === "completed").length

    const totalRevenue = appointments
      .filter((apt) => apt.get("status") === "completed")
      .reduce((sum, apt) => sum + (apt.get("service")?.get("price") || 0), 0)

    setStats({
      upcomingAppointments,
      totalServices: services.length,
      totalRevenue,
      completedAppointments,
    })

    setRecentAppointments(appointments.slice(0, 5))
  }

  const loadClientData = async () => {
    const currentUser = Parse.User.current()
    if (!currentUser) return

    // Load client appointments
    const appointmentQuery = new Parse.Query(Appointment)
    appointmentQuery.equalTo("client", currentUser)
    appointmentQuery.include(["provider", "service"])
    appointmentQuery.descending("startTime")
    const appointments = await appointmentQuery.find()

    // Calculate stats
    const now = new Date()
    const upcomingAppointments = appointments.filter(
      (apt) => apt.get("startTime") > now && apt.get("status") !== "cancelled",
    ).length

    const completedAppointments = appointments.filter((apt) => apt.get("status") === "completed").length

    setStats({
      upcomingAppointments,
      totalServices: 0,
      totalRevenue: 0,
      completedAppointments,
    })

    setRecentAppointments(appointments.slice(0, 5))
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.username}!</p>
        </div>
        {user?.role === "Provider" && (
          <Link href="/services/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
          </CardContent>
        </Card>

        {user?.role === "Provider" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalServices}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalRevenue}</div>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Appointments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAppointments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
          <CardDescription>Your latest appointment activity</CardDescription>
        </CardHeader>
        <CardContent>
          {recentAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No appointments found</p>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.get("service")?.get("name")}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.role === "Provider"
                        ? `Client: ${appointment.get("client")?.get("username")}`
                        : `Provider: ${appointment.get("provider")?.get("username")}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.get("startTime")?.toLocaleDateString()} at{" "}
                      {appointment.get("startTime")?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        appointment.get("status") === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : appointment.get("status") === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.get("status") === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {appointment.get("status")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {user?.role === "Provider" ? (
              <>
                <Link href="/services" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Manage Services
                  </Button>
                </Link>
                <Link href="/appointments" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    View Calendar
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/services" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Browse Services
                  </Button>
                </Link>
                <Link href="/appointments" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    My Appointments
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
