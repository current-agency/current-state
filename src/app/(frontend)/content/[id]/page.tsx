import { RichText } from '@payloadcms/richtext-lexical/react'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import { getAuthedPayloadUser, getPayloadClient } from '@/lib/companyContent'
import { getDisplayName, getInitials } from '@/lib/userDisplay'
import type { CompanyContent } from '@/payload-types'

import '../../dashboard/dashboard.css'

type ContentPageProps = {
  params: Promise<{ id: string }>
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { id } = await params
  const headers = await getHeaders()
  const session = await getServerSession(getAuthOptions())
  const { user } = await getAuthedPayloadUser(headers)

  if (!session && !user) {
    redirect(`/signin?callbackUrl=/content/${id}`)
  }

  if (!user) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  const payload = await getPayloadClient()
  let doc: CompanyContent | null = null
  try {
    doc = (await payload.findByID({
      collection: 'company-content',
      id: Number(id),
      depth: 0,
      user,
      overrideAccess: false,
    })) as CompanyContent
  } catch {
    notFound()
  }

  if (!doc || doc.status !== 'live') {
    notFound()
  }

  const displayName = getDisplayName({
    name: session?.user?.name,
    email: user.email,
  })

  return (
    <div className="dash-page">
      <DashboardHeader displayName={displayName} initials={getInitials(displayName)} />
      <article className="dash-content">
        <Link href="/dashboard" className="dash-back">
          ← Back to dashboard
        </Link>
        <div className="dash-eyebrow">{doc.department ?? 'Company'}</div>
        <h1 className="dash-h1">{doc.title}</h1>
        {doc.body ? (
          <div className="dash-prose">
            <RichText data={doc.body} />
          </div>
        ) : null}
      </article>
    </div>
  )
}
