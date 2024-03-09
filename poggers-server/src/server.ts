import express from "express";
import cors from "cors";
import { Pool } from 'pg';
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import pogs from "./routes/pogs";

export const app = express();

const connectionString = process.env.DATABASE_URL

export const pool = new Pool({
  connectionString: connectionString,
});


app
  .use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  }))
  .use(express.json())
  .use("/api/pogs", pogs)
  .listen(8080, () => {
    console.log("Server has started at PORT 8080");
  });

