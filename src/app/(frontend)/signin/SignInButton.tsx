'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

export function SignInButton() {
  return (
    <button
      className="signin"
      onClick={() => signIn('google', { callbackUrl: '/' })}
      type="button"
    >
      Sign in with Google
    </button>
  )
}
