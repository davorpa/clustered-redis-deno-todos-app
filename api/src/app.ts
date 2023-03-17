import { Hono } from "https://deno.land/x/hono@v3.0.5/mod.ts";
import { logger } from "https://deno.land/x/hono@v3.0.5/middleware.ts";
import helloRoutes from "./routes/hello.routes.ts";
import tasksRoutes from "./routes/tasks.routes.ts";

const app = new Hono();

// Register middlewares
app.use("*", logger());

// Register routes
app.route("/hello", helloRoutes);
app.route("/tasks", tasksRoutes);

export default app;
