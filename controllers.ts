import { Context, helpers } from "https://deno.land/x/oak/mod.ts";
import { Database } from "https://deno.land/x/aloedb/mod.ts";
import { Todo } from "./db/todos/todo.ts";

const noResultsFoundObject = {
  error: "no results found",
};

export async function getAllTodos(context: Context) {
  const db = new Database<Todo>("./db/todos/todos.json");
  const results = await db.findMany();
  context.response.body = results || {};
}

export async function getTodoById(context: Context) {
  const params = helpers.getQuery(context, { mergeParams: true });
  if (params && params.id) {
    const db = new Database<Todo>("./db/todos/todos.json");
    const results = await db.findOne({ id: parseInt(params.id) });
    if (results) {
      context.response.body = results;
    } else {
      context.response.status = 404;
      context.response.body = noResultsFoundObject;
    }
  }
}
