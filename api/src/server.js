import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AuthRouter from "./routers/auth.js";
import YamsRouter from "./routers/yams.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const port = 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", AuthRouter);
app.use("/yams", YamsRouter);

mongoose
  .connect("mongodb://mongo/yams", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: "root",
    pass: "foobar",
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
