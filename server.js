const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const postsRouter = require("./routers/posts.router");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
