import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "dummy_provider",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("pretend successful API authorization")
        return {access_token: "dummy_access_token", expires_in: 10, refresh_token: "dummy_refresh_token"};
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({token, user, account}) {
      if (account && user) {
        console.log("new session (successful login), creating complete token")
        return {
          accessToken: user?.access_token,
          refreshToken: user?.refresh_token,
          accessTokenExpires: Date.now() + user?.expires_in * 1000,
        }
      } else if (Date.now() < token.accessTokenExpires) {
        console.log("current access token still valid")
        return token
      } else {
        console.log("current access token expired on " + token.accessTokenExpires + ", pretend successful API refresh using refresh token " + token.refreshToken)
        var newExpiration = Date.now() + 10 * 1000
        console.log("new access token expiration " + newExpiration)
        return {
          accessToken: "refreshed_access_token",
          refreshToken: "refreshed_refresh_token",
          accessTokenExpires: newExpiration,
        }
      }
    },
    async session({session, token}) {
      session.accessToken = token.accessToken
      return session
    },

  },
})
