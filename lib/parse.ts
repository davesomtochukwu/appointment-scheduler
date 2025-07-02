import Parse from "parse/dist/parse.min.js"

// Initialize Parse
if (typeof window !== "undefined") {
  Parse.initialize(
    process.env.NEXT_PUBLIC_PARSE_APP_ID || "your-app-id",
    process.env.NEXT_PUBLIC_PARSE_JS_KEY || "your-js-key",
  )
  Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL || "https://parseapi.back4app.com/"
}

// User class
export class User extends Parse.User {
  constructor() {
    super()
  }

  get role(): string {
    return this.get("role")
  }

  set role(value: string) {
    this.set("role", value)
  }

  get email(): string {
    return this.get("email")
  }

  set email(value: string) {
    this.set("email", value)
  }
}

// Service class
export class Service extends Parse.Object {
  constructor() {
    super("Service")
  }

  get name(): string {
    return this.get("name")
  }

  set name(value: string) {
    this.set("name", value)
  }

  get durationMinutes(): number {
    return this.get("durationMinutes")
  }

  set durationMinutes(value: number) {
    this.set("durationMinutes", value)
  }

  get price(): number {
    return this.get("price")
  }

  set price(value: number) {
    this.set("price", value)
  }

  get provider(): User {
    return this.get("provider")
  }

  set provider(value: User) {
    this.set("provider", value)
  }

  get description(): string {
    return this.get("description")
  }

  set description(value: string) {
    this.set("description", value)
  }
}

// Appointment class
export class Appointment extends Parse.Object {
  constructor() {
    super("Appointment")
  }

  get client(): User {
    return this.get("client")
  }

  set client(value: User) {
    this.set("client", value)
  }

  get provider(): User {
    return this.get("provider")
  }

  set provider(value: User) {
    this.set("provider", value)
  }

  get service(): Service {
    return this.get("service")
  }

  set service(value: Service) {
    this.set("service", value)
  }

  get startTime(): Date {
    return this.get("startTime")
  }

  set startTime(value: Date) {
    this.set("startTime", value)
  }

  get endTime(): Date {
    return this.get("endTime")
  }

  set endTime(value: Date) {
    this.set("endTime", value)
  }

  get status(): string {
    return this.get("status")
  }

  set status(value: string) {
    this.set("status", value)
  }

  get notes(): string {
    return this.get("notes")
  }

  set notes(value: string) {
    this.set("notes", value)
  }
}

// Register the subclasses
Parse.Object.registerSubclass("Service", Service)
Parse.Object.registerSubclass("Appointment", Appointment)

export default Parse
