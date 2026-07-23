'use client'

import { useEffect } from 'react'

/**
 * Payload admin login is Google-only. Redirect to the NextAuth sign-in page.
 */
export function AdminLoginRedirect() {
  useEffect(() => {
    const callbackUrl = encodeURIComponent('/admin')
    window.location.replace(`/signin?callbackUrl=${callbackUrl}`)
  }, [])

  return <p>Redirecting to Google sign-in…</p>
}
