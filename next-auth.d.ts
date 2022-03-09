import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth" {
  interface Session {
    isAuthenticated: boolean
  }
  interface User {
    access_token: string
    refresh_token: string
    expires_in: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | undefined
    refreshToken: string
    accessTokenExpires: number
  }
}

