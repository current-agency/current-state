import Link from 'next/link'
import React from 'react'

import logotype from '@/current-design-system/assets/logo/logotype-black.svg'

type DashboardHeaderProps = {
  displayName: string
  initials: string
}

export function DashboardHeader({ displayName, initials }: DashboardHeaderProps) {
  const logoSrc = typeof logotype === 'string' ? logotype : logotype.src

  return (
    <header className="dash-header">
      <Link href="/dashboard" className="dash-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Current" height={22} />
      </Link>
      <nav className="dash-nav" aria-label="Primary">
        <Link href="/dashboard" className="dash-nav-link is-active">
          Dashboard
        </Link>
        <span className="dash-nav-link is-disabled" aria-disabled="true">
          Handbook
        </span>
      </nav>
      <div className="dash-user">
        <div className="dash-avatar" aria-hidden="true">
          {initials}
        </div>
        <div className="dash-user-name">{displayName}</div>
      </div>
    </header>
  )
}
