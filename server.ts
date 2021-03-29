import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std/fmt/colors.ts";
import { getAllTodos, getTodoById } from "./controllers.ts";

const port = 8000;
const app = new Application();
const router = new Router();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${green(`${ctx.request.method} ${ctx.request.url} - ${rt}`)}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

router
  .get("/", getAllTodos)
  .get("/todo/:id", getTodoById);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {
  console.log(
    `${yellow(`Listening on http://localhost:${port}`)}`,
  );
});

await app.listen({
  hostname: "localhost",
  port: port,
});
