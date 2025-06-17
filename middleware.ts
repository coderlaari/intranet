import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Remove favicon and other static files from exclusion
    // Apply middleware on all routes except _next internals and some static files
    '/((?!_next/static|_next/image).*)',
    '/(api|trpc)(.*)',
  ],
}
