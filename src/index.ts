import express, { Request, Response } from "express";
import { apiRouter } from "./routes";
import server from "./config/env/server.config";
import * as controllers from "./controllers/userController";
import { auth } from "./middlewares/auth";

export const app = express();
app.use(express.json()); // used to decode the incoming requests

// this is the main endpoint for the application that holds api application 🔹
app.get("/", auth, (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/", auth, (req: Request, res: Response) => {
  res.send("hello world");
});

// All routers here 🔹
app.use("/api", apiRouter);

// All middlewares here 🔹

app.listen(server.PORT, function (): void {
  console.log(`express has started on port ${server.PORT}`);
});
