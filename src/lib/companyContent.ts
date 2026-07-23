import type { CompanyContent, User } from '@/payload-types'
import config from '@/payload.config'
import { getPayload } from 'payload'
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

export async function getPayloadClient() {
  return getPayload({ config: await config })
}

export async function getAuthedPayloadUser(headers: ReadonlyHeaders | Headers) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers })
  return { payload, user: user as User | null }
}

export async function getLiveCompanyContent(user: User | null): Promise<CompanyContent[]> {
  if (!user) return []

  const payload = await getPayloadClient()

  const departmentFilters = [
    { department: { equals: 'all-company' as const } },
    ...(user.department ? [{ department: { equals: user.department } }] : []),
  ]

  const result = await payload.find({
    collection: 'company-content',
    where: {
      and: [
        { status: { equals: 'live' } },
        { or: departmentFilters },
      ],
    },
    sort: 'order',
    depth: 0,
    limit: 50,
    overrideAccess: false,
    user,
  })

  return result.docs
}
