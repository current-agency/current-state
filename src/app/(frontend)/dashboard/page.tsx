import { getServerSession } from 'next-auth'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import { ActivitiesPanel } from '@/components/dashboard/ActivitiesPanel'
import { CompanyUpdates } from '@/components/dashboard/CompanyUpdates'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { getAuthOptions } from '@/lib/auth'
import {
  getAuthedPayloadUser,
  getLiveCompanyContent,
} from '@/lib/companyContent'
import { getDisplayName, getInitials } from '@/lib/userDisplay'

import './dashboard.css'

export default async function DashboardPage() {
  const headers = await getHeaders()
  const session = await getServerSession(getAuthOptions())
  const { user } = await getAuthedPayloadUser(headers)

  if (!session && !user) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  const displayName = getDisplayName({
    name: session?.user?.name,
    email: user?.email ?? session?.user?.email,
  })
  const companyContent = await getLiveCompanyContent(user)

  return (
    <div className="dash-page">
      <DashboardHeader displayName={displayName} initials={getInitials(displayName)} />
      <main className="dash-main">
        <div className="dash-primary">
          <div>
            <div className="dash-eyebrow">Onboarding</div>
            <h1 className="dash-h1">Welcome back, {displayName.split(' ')[0]}.</h1>
            <p className="dash-lead">
              Here&apos;s what&apos;s next in onboarding, plus live company updates for
              your team.
            </p>
          </div>
          <ActivitiesPanel />
        </div>
        <aside className="dash-aside">
          <CompanyUpdates items={companyContent} />
        </aside>
      </main>
    </div>
  )
}
