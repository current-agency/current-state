import React from 'react'

import '@/current-design-system/colors_and_type.css'

export const metadata = {
  description: 'Current — internal onboarding and company hub',
  title: 'Current',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body style={{ margin: 0, background: 'var(--bg-canvas)' }}>{children}</body>
    </html>
  )
}
