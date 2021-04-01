import { Context, helpers } from "https://deno.land/x/oak/mod.ts";
import { Database } from "https://raw.githubusercontent.com/Kirlovon/AloeDB/master/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Todo } from "./db/todos/todo.ts";

export async function getAllTodos(ctx: Context) {
  const db = new Database<Todo>("./db/todos/todos.json");
  const results = await db.findMany();
  ctx.response.status = results ? 200 : 404;
  ctx.response.body = results || {};
}

export async function getTodoById(ctx: Context) {
  const { id } = helpers.getQuery(ctx);
  if (id) {
    const db = new Database<Todo>("./db/todos/todos.json");
    const results = await db.findOne({ id: parseInt(id) });
    ctx.response.status = results ? 200 : 404;
    ctx.response.body = results || {};
  }
}

export async function createTodo(ctx: Context) {
  const body = ctx.request.body({ type: "json" });
  const { title } = await body.value;
  if (title as string) {
    const db = new Database<Todo>("./db/todos/todos.json");
    const results = await db.insertOne({
      id: v4.generate(),
      title: title,
      completed: false,
    });
    if (results) {
      ctx.response.status = 200;
      ctx.response.body = results;
    }
  }
}
