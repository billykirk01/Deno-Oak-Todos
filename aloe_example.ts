import {
  and,
  Database,
  lessThan,
  moreThan,
} from "https://raw.githubusercontent.com/Kirlovon/AloeDB/master/mod.ts";
import { Todo } from "./db/todos/todo.ts";

const db = new Database<Todo>("./db/todos/todos.json");

const results = await db.findMany({ id: and(moreThan(1), lessThan(3)) });

console.log(results);
