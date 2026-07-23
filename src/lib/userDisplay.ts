export function getDisplayName(input: {
  name?: string | null
  email?: string | null
}): string {
  if (input.name?.trim()) return input.name.trim()
  if (input.email?.trim()) return input.email.split('@')[0] ?? 'there'
  return 'there'
}

export function getInitials(displayName: string): string {
  const parts = displayName.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase()
  }
  return displayName.slice(0, 2).toUpperCase() || '?'
}
