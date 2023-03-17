import { Context } from "https://deno.land/x/hono@v3.0.5/context.ts";
import { type Task } from "../models/tasks.d.ts";
import * as redis from "../services/redis.ts";

function applyToTaskDtoConversions(hash: Record<string, unknown>) {
  hash.done = hash.done === "1" || hash.done === 1 || hash.done === true;
  hash.createdAt = new Date(hash.createdAt as string);
  hash.updatedAt = new Date(hash.updatedAt as string);
}

export async function listTasks(ctx: Context) {
  const tasks = [] as Task[];

  const keys = await redis.keys("tasks:*");
  for (const key of keys) {
    const task = await redis.hGet(key);
    if (task === null) continue;

    // toDto extra conversions
    applyToTaskDtoConversions(task);

    tasks.push(task as unknown as Task);
  }

  // Response 200: OK
  return ctx.json(tasks, 200);
}

export async function createTask(ctx: Context) {
  const id = crypto.randomUUID();
  const now = new Date();
  const task = await ctx.req.json();
  task.id = id;
  task.done = 0;
  task.createdAt = now.toISOString();
  task.updatedAt = now.toISOString();

  const key = `tasks:${id}`;
  await redis.hSet(key, task);

  // toDto extra conversions
  applyToTaskDtoConversions(task);

  // Response 201: Created
  return ctx.json(task, 201);
}

export async function retrieveTask(ctx: Context) {
  const { id } = ctx.req.param();

  const key = `tasks:${id}`;
  const task = await redis.hGet(key);

  if (task === null) {
    // Response 404: Not Found
    return ctx.json({ message: `Task '${id}' not found` }, 404);
  }

  // toDto extra conversions
  applyToTaskDtoConversions(task);

  // Response 200: OK
  return ctx.json(task, 200);
}

export async function updateTask(ctx: Context) {
  const { id } = ctx.req.param();
  const now = new Date();
  const body = await ctx.req.json();

  const key = `tasks:${id}`;
  const task = await redis.hGet(key);

  if (task === null) {
    // Response 404: Not Found
    return ctx.json({ message: `Task '${id}' not found` }, 404);
  }

  // map patched body to retrieved task
  task.updatedAt = now.toISOString();
  "title" in body && (task.title = body.title ?? null);
  "description" in body && (task.description = body.description ?? null);
  "done" in body &&
    (task.done = body.done === "1" || body.done === 1 || body.done === true
      ? 1
      : 0);

  // update hash
  await redis.hSet(key, task);

  // toDto extra conversions
  applyToTaskDtoConversions(task);

  // Response 200: OK
  return ctx.json(task, 200);
}

export async function deleteTask(ctx: Context) {
  const { id } = ctx.req.param();

  const key = `tasks:${id}`;
  const task = await redis.hGet(key);

  if (task === null) {
    // Response 404: Not Found
    return ctx.json({ message: `Task '${id}' not found` }, 404);
  }

  // delete hash
  const deleted = await redis.del(key);

  console.log({ id, task, deleted });

  // toDto extra conversions
  applyToTaskDtoConversions(task);

  // Response 200: OK
  return ctx.json(task, 200);
}
