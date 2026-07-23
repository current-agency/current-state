import Link from 'next/link'
import React from 'react'

import type { CompanyContent } from '@/payload-types'

const departmentLabel: Record<string, string> = {
  'all-company': 'All Company',
  operations: 'Operations',
  executive: 'Executive',
  design: 'Design',
  engineering: 'Engineering',
  strategy: 'Strategy',
  production: 'Production',
}

type CompanyUpdatesProps = {
  items: CompanyContent[]
}

export function CompanyUpdates({ items }: CompanyUpdatesProps) {
  return (
    <div className="dash-card">
      <h2 className="dash-aside-title">Company updates</h2>
      {items.length === 0 ? (
        <p className="dash-muted">No live company content yet.</p>
      ) : (
        <div className="dash-resource-list">
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={`/content/${item.id}`}
              className="dash-resource-link"
            >
              <span className="dash-resource-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="dash-resource-copy">
                <span className="dash-resource-title">{item.title}</span>
                {item.department ? (
                  <span className="dash-resource-meta">
                    {departmentLabel[item.department] ?? item.department}
                  </span>
                ) : null}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
