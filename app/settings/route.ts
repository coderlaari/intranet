// app/announcements/route.ts
export function GET() {
  return new Response(null, { // no body at all
    status: 503,
    headers: {
      "Content-Type": "text/html",
      "Retry-After": "3600",
    },
  })
}
