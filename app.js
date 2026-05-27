import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Analytics Service running on port ${PORT}`);
});