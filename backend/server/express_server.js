const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts");
const todosRouter = require("./routes/todos");
const user_passwordsRouter = require("./routes/user_passwords");
const adminsRouter = require("./routes/admins");

app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/todos", todosRouter);
app.use("/api/user_passwords", user_passwordsRouter);
app.use("/api/admins", adminsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SERVER: Listening on port ${port}...`));
