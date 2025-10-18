import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const publicRoutes = [
  '/',
  '/events/:id',
  '/api/webhooks/clerk',
  '/api/webhooks/stripe',
  '/api/uploadthing',
  '/sign-in(.*)',
  '/sign-up(.*)'
]

const isPublicRoute = createRouteMatcher(publicRoutes)

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}