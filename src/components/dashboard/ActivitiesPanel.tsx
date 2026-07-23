import React from 'react'

const MOCK_ACTIVITIES = [
  {
    id: '1',
    title: 'Complete security & compliance training',
    meta: 'Compliance · ~20 min',
    status: 'due' as const,
    badge: 'Due Jul 25',
  },
  {
    id: '2',
    title: 'Sign the code of conduct policy',
    meta: 'Compliance · ~5 min',
    status: 'done' as const,
    badge: 'Completed',
  },
  {
    id: '3',
    title: 'Finish data privacy certification',
    meta: 'Compliance · ~15 min',
    status: 'due' as const,
    badge: 'Due Jul 28',
  },
  {
    id: '4',
    title: 'Take the "Current 101" culture course',
    meta: 'Culture · ~30 min',
    status: 'done' as const,
    badge: 'Completed',
  },
  {
    id: '5',
    title: 'Join #general and #new-hires on Slack',
    meta: 'Culture · ~5 min',
    status: 'done' as const,
    badge: 'Completed',
  },
  {
    id: '6',
    title: 'Schedule intro chats with your pod',
    meta: 'Culture · ~10 min',
    status: 'due' as const,
    badge: 'Due Jul 29',
  },
  {
    id: '7',
    title: 'Take the building walkthrough & office tour',
    meta: 'Culture · ~15 min',
    status: 'due' as const,
    badge: 'Due Jul 31',
  },
  {
    id: '8',
    title: 'Complete harassment prevention training',
    meta: 'Compliance · ~20 min',
    status: 'due' as const,
    badge: 'Due Aug 2',
  },
]

export function ActivitiesPanel() {
  const dueCount = MOCK_ACTIVITIES.filter((a) => a.status === 'due').length
  const doneCount = MOCK_ACTIVITIES.filter((a) => a.status === 'done').length
  const total = MOCK_ACTIVITIES.length
  const pct = Math.round((doneCount / total) * 100)
  const circumference = 2 * Math.PI * 38
  const offset = circumference * (1 - pct / 100)

  return (
    <>
      <div className="dash-card dash-progress">
        <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
          <circle
            cx="44"
            cy="44"
            r="38"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="10"
          />
          <circle
            cx="44"
            cy="44"
            r="38"
            fill="none"
            stroke="var(--cur-signal)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 44 44)"
          />
          <text
            x="44"
            y="50"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="20"
            fontWeight="700"
            fill="#fff"
          >
            {pct}%
          </text>
        </svg>
        <div>
          <div className="dash-progress-eyebrow">Onboarding progress</div>
          <div className="dash-progress-title">
            {doneCount} of {total} complete
          </div>
        </div>
      </div>

      <div>
        <div className="dash-section-head">
          <h2 className="dash-h2">Your activities</h2>
          <span className="dash-muted mono">{dueCount} due</span>
        </div>
        <div className="dash-activity-list">
          {MOCK_ACTIVITIES.map((activity) => (
            <div key={activity.id} className="dash-activity">
              <div
                className={
                  activity.status === 'done'
                    ? 'dash-check is-done'
                    : 'dash-check'
                }
                aria-hidden="true"
              >
                {activity.status === 'done' ? '✓' : null}
              </div>
              <div className="dash-activity-copy">
                <div
                  className={
                    activity.status === 'done'
                      ? 'dash-activity-title is-done'
                      : 'dash-activity-title'
                  }
                >
                  {activity.title}
                </div>
                <div className="dash-activity-meta">{activity.meta}</div>
              </div>
              <span
                className={
                  activity.status === 'done'
                    ? 'dash-badge is-done'
                    : 'dash-badge'
                }
              >
                {activity.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
