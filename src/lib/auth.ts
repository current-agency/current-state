import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Set it in .env.local (see .env.example).`,
    )
  }
  return value
}

export function getAuthOptions(): NextAuthOptions {
  return {
    providers: [
      GoogleProvider({
        clientId: requireEnv('GOOGLE_CLIENT_ID'),
        clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
      }),
    ],
    pages: {
      signIn: '/signin',
    },
    secret: requireEnv('NEXTAUTH_SECRET'),
  }
}
