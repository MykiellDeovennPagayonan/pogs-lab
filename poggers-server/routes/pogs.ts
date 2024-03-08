import express from "express";
import { Response, Request } from "express";
import { pool } from "../server";

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    // const client = await pool.connect();
    // res.json({ message: "success" })
    // client.release()
    res.status(200).json({message: 'hello world'});
  })

export default router;