import { Context, helpers } from "https://deno.land/x/oak/mod.ts";
import { Database } from "https://raw.githubusercontent.com/Kirlovon/AloeDB/master/mod.ts";
import { Todo } from "./db/todos/todo.ts";

export async function getAllTodos(ctx: Context) {
  const db = new Database<Todo>("./db/todos/todos.json");
  const results = await db.findMany();
  ctx.response.status = results ? 200 : 404;
  ctx.response.body = results || {};
}

export async function getTodoById(ctx: Context) {
  const params = helpers.getQuery(ctx, { mergeParams: true });
  if (params && params.id) {
    const db = new Database<Todo>("./db/todos/todos.json");
    const results = await db.findOne({ id: parseInt(params.id) });
    ctx.response.status = results ? 200 : 404;
    ctx.response.body = results || {};
  }
}
