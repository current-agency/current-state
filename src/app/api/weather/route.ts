import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { getAuthOptions } from '@/lib/auth'

type OpenWeatherResponse = {
  name?: string
  weather?: Array<{ id: number; main: string; description: string; icon: string }>
  main?: { temp: number }
  sys?: { country?: string }
  message?: string
  cod?: string | number
}

const OPENWEATHER_ICON = /^\d{2}[dn]$/

export async function GET(request: Request) {
  const session = await getServerSession(getAuthOptions())
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Weather is not configured' },
      { status: 503 },
    )
  }

  const { searchParams } = new URL(request.url)
  const lat = Number(searchParams.get('lat'))
  const lon = Number(searchParams.get('lon'))
  const unitsParam = searchParams.get('units')
  const units = unitsParam === 'metric' ? 'metric' : 'imperial'

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
  }
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return NextResponse.json({ error: 'Coordinates out of range' }, { status: 400 })
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lon))
  url.searchParams.set('units', units)
  url.searchParams.set('appid', apiKey)

  const upstream = await fetch(url, { next: { revalidate: 600 } })

  let data: OpenWeatherResponse
  try {
    data = (await upstream.json()) as OpenWeatherResponse
  } catch {
    return NextResponse.json({ error: 'Unexpected weather response' }, { status: 502 })
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { error: data.message || 'Failed to fetch weather' },
      { status: upstream.status },
    )
  }

  const condition = data.weather?.[0]
  if (!condition || data.main?.temp == null || !OPENWEATHER_ICON.test(condition.icon)) {
    return NextResponse.json({ error: 'Unexpected weather response' }, { status: 502 })
  }

  return NextResponse.json({
    temp: Math.round(data.main.temp),
    units,
    condition: condition.main,
    description: condition.description,
    icon: condition.icon,
    location: [data.name, data.sys?.country].filter(Boolean).join(', '),
  })
}
