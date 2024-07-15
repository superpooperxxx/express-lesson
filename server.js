import express from "express";

import { router as postsRouter } from "./routers/posts.router.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
