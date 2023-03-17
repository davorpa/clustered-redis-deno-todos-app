import { Hono } from "https://deno.land/x/hono@v3.0.5/mod.ts";
import { sayHello } from "../controllers/hello.controller.ts";

const router = new Hono();

router.get("/", sayHello);

export default router;
