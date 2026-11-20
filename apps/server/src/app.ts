import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g., 'https://vercel.app' (no trailing slash)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());
app.use(express.json());
app.use("/", routes);

export default app;
