import { Hono } from "hono";
import { cors } from "hono/cors";
import { PodmanApi } from "./podman";

let app = new Hono();
let podman = new PodmanApi();

app.use(cors());
app.get("/", (c) => c.json({ message: "Hello from bun!" }));
app.post("/containers/create", async (c) => {
  const container = await c.req.json();
  await podman.pull(container.image);
  const res = await podman.createContainer({
    ...container,
  });

  return c.json(res);
});

console.info("Listening on :8080");
export default {
  port: 8080,
  fetch: app.fetch,
};
