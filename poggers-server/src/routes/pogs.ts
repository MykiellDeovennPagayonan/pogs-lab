import express from "express";
import { Response, Request } from "express";
import { pool } from "../server";
import { Pogs } from "../../../poggers-frontend/src/lib/types"

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    const client = await pool.connect();
    const { rows } = await client.query<Pogs>(`
      SELECT * FROM pogs
    `);
    client.release();

    if (rows.length === 0) {
      return res.status(404).json(rows);
    }

    return res.status(200).json(rows);
  })
  .get("/:id", async (req: Request, res: Response) => {
    const client = await pool.connect();
    const { rows } = await client.query<Pogs>(`
      SELECT * FROM pogs
      WHERE id = $1
    `, [req.params.id]);
    client.release();

    if (rows.length === 0) {
      return res.status(404).json(rows);
    }

    return res.status(200).json(rows);
  })
  .post("/", async (req: Request, res: Response) => {
    // const client = await pool.connect();
    // res.json({ message: "success" })
    // client.release()
    res.status(200).json({ message: 'hello world' });
  })
  .patch("/:id", async (req: Request, res: Response) => {
    // const client = await pool.connect();
    // res.json({ message: "success" })
    // client.release()
    res.status(200).json({ message: 'hello world' });
  })
  .delete("/:id", async (req: Request, res: Response) => {
    // const client = await pool.connect();
    // res.json({ message: "success" })
    // client.release()
    res.status(200).json({ message: 'hello world' });
  })

export default router;