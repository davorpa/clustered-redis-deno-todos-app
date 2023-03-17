import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import config from "./config/index.ts";
import "./services/redis.ts";
import app from "./app.ts";

serve(app.fetch, { port: config.servePort });
