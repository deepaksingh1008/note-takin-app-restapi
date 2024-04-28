import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";

import { dbConnection } from "./src/shared/db/connection.js";
import userRoutes from "./src/modules/user/routes/user-routes.js";
import noteRouter from "./src/modules/notes/routes/note-routes.js";
const app = express();
dotenv.config();
//middleware
app.use(
  cors({
    origin: ["https://note-taking-app-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/", noteRouter);
//app listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // console.log(`Server is running on Port number ${process.env.PORT}`.bgMagenta);
  dbConnection();
});