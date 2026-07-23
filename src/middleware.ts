import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/signin',
  },
})

export const config = {
  // Protect frontend and Payload admin. Leave API routes (including NextAuth)
  // and the sign-in page public.
  matcher: ['/((?!api|signin|_next/static|_next/image|favicon.ico).*)'],
}
