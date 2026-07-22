import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/signin',
  },
})

export const config = {
  // Protect frontend pages only. Leave Payload admin, all API routes
  // (including NextAuth), and the sign-in page public.
  matcher: ['/((?!api|admin|signin|_next/static|_next/image|favicon.ico).*)'],
}
