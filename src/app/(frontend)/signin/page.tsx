import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

import { getAuthOptions } from '@/lib/auth'

import { SignInButton } from './SignInButton'

export default async function SignInPage() {
  const session = await getServerSession(getAuthOptions())
  if (session) {
    redirect('/')
  }

  return (
    <div className="home">
      <div className="content">
        <h1>Sign in</h1>
        <p>Use your Google account to continue.</p>
        <div className="links">
          <SignInButton />
        </div>
      </div>
    </div>
  )
}
