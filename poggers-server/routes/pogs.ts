import express from "express";
const router = express.Router();
import { Response, Request } from "express";
import { pool } from "../server";

router
  .get("/test", async (req: Request, res: Response) => {
    const client = await pool.connect();
    res.json({ message: "success" })
    client.release()
  })

module.exports = router;