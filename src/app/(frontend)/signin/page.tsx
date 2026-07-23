import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

import { getAuthOptions } from '@/lib/auth'

import { SignInButton } from './SignInButton'
import '../styles.css'

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerSession(getAuthOptions())
  const { callbackUrl = '/dashboard' } = await searchParams

  if (session) {
    redirect(callbackUrl.startsWith('/') ? callbackUrl : '/dashboard')
  }

  return (
    <div className="home">
      <div className="content">
        <h1>Sign in</h1>
        <p>Use your Google account to continue.</p>
        <div className="links">
          <SignInButton
            callbackUrl={callbackUrl.startsWith('/') ? callbackUrl : '/dashboard'}
          />
        </div>
      </div>
    </div>
  )
}
