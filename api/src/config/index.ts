import "https://deno.land/std@0.179.0/dotenv/load.ts";

export default {
  // The port to listen on
  servePort: Number(Deno.env.get("PORT") || 8000),

  // The Redis URLs to connect to
  // should be passed in with the following format:
  // REDIS_URL=redis://10.0.0.1:6379,redis://10.0.0.2:6379,redis://10.0.0.3:6379
  redisUrls: (Deno.env.get("REDIS_URL")?.split(",") || []),
};
