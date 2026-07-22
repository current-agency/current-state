import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('getAuthOptions', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('throws a clear error when a required env var is missing', async () => {
    delete process.env.GOOGLE_CLIENT_ID
    process.env.GOOGLE_CLIENT_SECRET = 'secret'
    process.env.NEXTAUTH_SECRET = 'nextauth-secret'

    const { getAuthOptions } = await import('@/lib/auth')

    expect(() => getAuthOptions()).toThrow(/GOOGLE_CLIENT_ID/)
  })

  it('returns Google provider options when env is set', async () => {
    process.env.GOOGLE_CLIENT_ID = 'client-id'
    process.env.GOOGLE_CLIENT_SECRET = 'client-secret'
    process.env.NEXTAUTH_SECRET = 'nextauth-secret'

    const { getAuthOptions } = await import('@/lib/auth')
    const options = getAuthOptions()

    expect(options.pages?.signIn).toBe('/signin')
    expect(options.secret).toBe('nextauth-secret')
    expect(options.providers).toHaveLength(1)
    expect(options.providers[0]?.id).toBe('google')
  })
})
