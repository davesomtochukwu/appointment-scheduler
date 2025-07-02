import Parse from "./parse"

export interface AuthUser {
  id: string
  username: string
  email: string
  role: "Provider" | "Client"
}

export class AuthService {
  static async login(username: string, password: string): Promise<AuthUser> {
    try {
      const user = await Parse.User.logIn(username, password)
      return {
        id: user.id,
        username: user.getUsername() || "",
        email: user.getEmail() || "",
        role: user.get("role") as "Provider" | "Client",
      }
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async register(
    username: string,
    email: string,
    password: string,
    role: "Provider" | "Client",
  ): Promise<AuthUser> {
    try {
      const user = new Parse.User()
      user.set("username", username)
      user.set("email", email)
      user.set("password", password)
      user.set("role", role)

      await user.signUp()

      return {
        id: user.id,
        username: user.getUsername() || "",
        email: user.getEmail() || "",
        role: user.get("role") as "Provider" | "Client",
      }
    } catch (error) {
      throw new Error(`Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async logout(): Promise<void> {
    try {
      await Parse.User.logOut()
    } catch (error) {
      throw new Error(`Logout failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static getCurrentUser(): AuthUser | null {
    const user = Parse.User.current()
    if (!user) return null

    return {
      id: user.id,
      username: user.getUsername() || "",
      email: user.getEmail() || "",
      role: user.get("role") as "Provider" | "Client",
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      await Parse.User.requestPasswordReset(email)
    } catch (error) {
      throw new Error(`Password reset failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}
