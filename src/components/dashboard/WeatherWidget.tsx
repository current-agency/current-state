'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

type WeatherUnits = 'imperial' | 'metric'

type WeatherPayload = {
  temp: number
  units: WeatherUnits
  condition: string
  description: string
  icon: string
  location: string
}

const STORAGE_KEY = 'weather-units'

function readStoredUnits(): WeatherUnits {
  if (typeof window === 'undefined') return 'imperial'
  return window.localStorage.getItem(STORAGE_KEY) === 'metric' ? 'metric' : 'imperial'
}

export function WeatherWidget() {
  const [units, setUnits] = useState<WeatherUnits>('imperial')
  const [weather, setWeather] = useState<WeatherPayload | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'denied' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const requestIdRef = useRef(0)

  const loadWeather = useCallback(async (nextUnits: WeatherUnits) => {
    const requestId = ++requestIdRef.current
    setStatus('loading')
    setErrorMessage(null)

    if (!navigator.geolocation) {
      if (requestId !== requestIdRef.current) return
      setStatus('error')
      setErrorMessage('Location is not supported in this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (requestId !== requestIdRef.current) return

        try {
          const params = new URLSearchParams({
            lat: String(position.coords.latitude),
            lon: String(position.coords.longitude),
            units: nextUnits,
          })
          const response = await fetch(`/api/weather?${params}`)
          if (requestId !== requestIdRef.current) return

          const data = (await response.json()) as WeatherPayload & { error?: string }
          if (requestId !== requestIdRef.current) return

          if (!response.ok) {
            setStatus('error')
            setErrorMessage(data.error || 'Could not load weather.')
            return
          }
          setWeather(data)
          setStatus('ready')
        } catch {
          if (requestId !== requestIdRef.current) return
          setStatus('error')
          setErrorMessage('Could not load weather.')
        }
      },
      (error) => {
        if (requestId !== requestIdRef.current) return
        if (error.code === error.PERMISSION_DENIED) {
          setStatus('denied')
          setErrorMessage('Location permission is needed for local weather.')
          return
        }
        setStatus('error')
        setErrorMessage('Could not determine your location.')
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10 * 60 * 1000 },
    )
  }, [])

  useEffect(() => {
    const initial = readStoredUnits()
    setUnits(initial)
    void loadWeather(initial)

    return () => {
      requestIdRef.current += 1
    }
  }, [loadWeather])

  const toggleUnits = () => {
    const next: WeatherUnits = units === 'imperial' ? 'metric' : 'imperial'
    setUnits(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    void loadWeather(next)
  }

  const unitLabel = units === 'imperial' ? 'F' : 'C'

  return (
    <div className="dash-card dash-weather">
      <div className="dash-weather-head">
        <h2 className="dash-aside-title dash-weather-title">Weather</h2>
        <button type="button" className="dash-weather-toggle" onClick={toggleUnits}>
          °{unitLabel}
        </button>
      </div>

      {status === 'loading' ? <p className="dash-muted">Getting your local weather…</p> : null}

      {status === 'denied' || status === 'error' ? (
        <p className="dash-muted">{errorMessage}</p>
      ) : null}

      {status === 'ready' && weather ? (
        <div className="dash-weather-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="dash-weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={64}
            height={64}
          />
          <div className="dash-weather-copy">
            <div className="dash-weather-temp">
              {weather.temp}°{unitLabel}
            </div>
            <div className="dash-weather-condition">{weather.condition}</div>
            {weather.location ? (
              <div className="dash-weather-location">{weather.location}</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
