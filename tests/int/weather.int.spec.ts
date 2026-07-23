import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getAuthOptions: vi.fn(() => ({})),
}))

import { getServerSession } from 'next-auth'

import { GET } from '@/app/api/weather/route'

const getSession = vi.mocked(getServerSession)

function weatherRequest(params: Record<string, string>) {
  const url = new URL('http://localhost:3000/api/weather')
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return new Request(url)
}

describe('/api/weather', () => {
  const originalEnv = { ...process.env }
  const originalFetch = global.fetch

  beforeEach(() => {
    process.env = { ...originalEnv }
    process.env.OPENWEATHER_API_KEY = 'test-openweather-key'
    getSession.mockReset()
    getSession.mockResolvedValue({ user: { email: 'test@example.com' } } as never)
    global.fetch = vi.fn()
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    global.fetch = originalFetch
  })

  it('returns 401 when there is no session', async () => {
    getSession.mockResolvedValue(null)

    const response = await GET(weatherRequest({ lat: '40.7', lon: '-74' }))

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('returns 503 when OPENWEATHER_API_KEY is missing', async () => {
    delete process.env.OPENWEATHER_API_KEY

    const response = await GET(weatherRequest({ lat: '40.7', lon: '-74' }))

    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toEqual({ error: 'Weather is not configured' })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('returns 400 for invalid coordinates', async () => {
    const response = await GET(weatherRequest({ lat: 'not-a-number', lon: '-74' }))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'Invalid coordinates' })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('returns 400 for out-of-range coordinates', async () => {
    const response = await GET(weatherRequest({ lat: '91', lon: '-74' }))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'Coordinates out of range' })
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('returns mapped weather payload from OpenWeather', async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          name: 'Brooklyn',
          sys: { country: 'US' },
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          main: { temp: 72.4 },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const response = await GET(
      weatherRequest({ lat: '40.7', lon: '-74', units: 'imperial' }),
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      temp: 72,
      units: 'imperial',
      condition: 'Clear',
      description: 'clear sky',
      icon: '01d',
      location: 'Brooklyn, US',
    })

    const calledUrl = String(vi.mocked(global.fetch).mock.calls[0]?.[0])
    expect(calledUrl).toContain('lat=40.7')
    expect(calledUrl).toContain('lon=-74')
    expect(calledUrl).toContain('units=imperial')
    expect(calledUrl).toContain('appid=test-openweather-key')
  })

  it('returns 502 when upstream icon is not allowlisted', async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '../x' }],
          main: { temp: 70 },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const response = await GET(weatherRequest({ lat: '40.7', lon: '-74' }))

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({ error: 'Unexpected weather response' })
  })

  it('returns 502 when upstream body is not JSON', async () => {
    vi.mocked(global.fetch).mockResolvedValue(
      new Response('not-json', { status: 200, headers: { 'Content-Type': 'text/plain' } }),
    )

    const response = await GET(weatherRequest({ lat: '40.7', lon: '-74' }))

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({ error: 'Unexpected weather response' })
  })
})
