import type { AuthStrategy } from 'payload'
import { getToken } from 'next-auth/jwt'

/**
 * Authenticates Payload requests from the NextAuth session cookie.
 * Local email/password login is disabled — Google via NextAuth is the only login.
 */
export const nextAuthStrategy: AuthStrategy = {
  name: 'next-auth',
  authenticate: async ({ payload, headers }) => {
    const cookieHeader = headers.get('cookie') ?? ''
    const cookies = Object.fromEntries(
      cookieHeader
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
          const eq = part.indexOf('=')
          if (eq === -1) return [part, '']
          return [part.slice(0, eq), decodeURIComponent(part.slice(eq + 1))]
        }),
    )

    const token = await getToken({
      // next-auth's getToken types expect a full IncomingMessage; cookie header is enough at runtime.
      req: { headers: { cookie: cookieHeader }, cookies } as Parameters<
        typeof getToken
      >[0]['req'],
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token?.email || typeof token.email !== 'string') {
      return { user: null }
    }

    const result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: token.email,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const user = result.docs[0]
    if (!user) {
      return { user: null }
    }

    return {
      user: {
        ...user,
        collection: 'users',
        _strategy: 'next-auth',
      },
    }
  },
}
