import { Hono } from "https://deno.land/x/hono@v3.0.5/mod.ts";
import {
  createTask,
  deleteTask,
  listTasks,
  retrieveTask,
  updateTask,
} from "../controllers/tasks.controller.ts";

const router = new Hono();

router.get("/", listTasks);
router.post("/", createTask);
router.get("/:id", retrieveTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
