import { Context } from "https://deno.land/x/hono@v3.0.5/context.ts";

export function sayHello(ctx: Context) {
  return ctx.text("Hello Hono!", 200);
}
