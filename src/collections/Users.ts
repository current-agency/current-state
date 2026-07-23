import type { CollectionConfig } from 'payload'

import { nextAuthStrategy } from '@/auth/nextAuthStrategy'

const MM_DD = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'userType', 'department', 'role'],
  },
  auth: {
    // Google/NextAuth is the only login path; keep email on the collection.
    disableLocalStrategy: {
      enableFields: true,
      optionalPassword: true,
    },
    strategies: [nextAuthStrategy],
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user?.userType === 'admin'),
  },
  fields: [
    {
      name: 'userType',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Member', value: 'member' },
      ],
      saveToJWT: true,
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Production', value: 'production' },
        { label: 'Executive', value: 'executive' },
        { label: 'Operations', value: 'operations' },
      ],
    },
    {
      name: 'role',
      type: 'text',
      label: 'Job title',
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'birthday',
      type: 'text',
      label: 'Birthday (MM-DD)',
      admin: {
        description: 'Month and day only, e.g. 03-15',
      },
      validate: (value: string | null | undefined) => {
        if (value == null || value === '') return true
        if (!MM_DD.test(value)) return 'Use MM-DD format (e.g. 03-15)'
        return true
      },
    },
  ],
}
