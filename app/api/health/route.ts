/**
 * Example Next.js / serverless style API route handler.
 * Returns health status and backend sync metadata.
 */
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'app-workspace-api',
    supabaseConfigured: Boolean(
      typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL
    ),
  });
}
