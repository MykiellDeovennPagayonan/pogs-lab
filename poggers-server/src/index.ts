import express from "express";
import cors from "cors";
import { Pool } from 'pg';
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import pogs from "./routes/pogs";

export const app = express();

export const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
});

app
 .use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
 }))
 .use(express.json())
 .use("/api/pogs", pogs);

export default app;