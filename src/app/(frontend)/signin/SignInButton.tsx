'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

type SignInButtonProps = {
  callbackUrl?: string
}

export function SignInButton({ callbackUrl = '/dashboard' }: SignInButtonProps) {
  return (
    <button
      className="signin"
      onClick={() => signIn('google', { callbackUrl })}
      type="button"
    >
      Sign in with Google
    </button>
  )
}
