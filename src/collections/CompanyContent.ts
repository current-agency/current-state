import type { CollectionConfig } from 'payload'

export const CompanyContent: CollectionConfig = {
  slug: 'company-content',
  labels: {
    singular: 'Company Content',
    plural: 'Company Content',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'order', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.userType === 'admin',
    update: ({ req: { user } }) => user?.userType === 'admin',
    delete: ({ req: { user } }) => user?.userType === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'All Company', value: 'all-company' },
        { label: 'Operations', value: 'operations' },
        { label: 'Executive', value: 'executive' },
        { label: 'Design', value: 'design' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Strategy', value: 'strategy' },
        { label: 'Production', value: 'production' },
      ],
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'order',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Published status',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Live', value: 'live' },
        { label: 'Archive', value: 'archive' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
