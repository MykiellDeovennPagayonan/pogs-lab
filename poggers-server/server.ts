import express from "express";
import cors from "cors";
import { Pool } from 'pg';
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import pogs from "./routes/pogs";

const app = express();

const connectionString = process.env.DATABASE_URL

export const pool = new Pool({
  connectionString: connectionString,
});

async function startServer() {

  app
    .use(cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
    }))
    .use(express.json())
    .use("/pogs", pogs)
    .listen(8080, () => {
      console.log("Server has started at PORT 8080");
    });
}

startServer();
