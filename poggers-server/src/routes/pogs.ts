import express from "express";
import { Response, Request } from "express";
import { pool } from "../server";
import { Pogs } from "../../../poggers-frontend/src/lib/types"

const router = express.Router();

router
  .get("/all", async (req: Request, res: Response) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query<Pogs>(`
      SELECT * FROM pogs
    `);
      client.release();
      console.log('hoy')

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(404).json({ error });
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query<Pogs>(`
        SELECT * FROM pogs
        WHERE id = $1
      `, [req.params.id]);
      client.release();

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(404).json({ error });
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const {
        name,
        ticker_symbol,
        color,
        price
      }: Pogs = await req.body;
      const client = await pool.connect();
      const { rows } = await client.query<Pogs>(`
        INSERT INTO pogs (
          name,
          ticker_symbol,
          color,
          price
        )
        VALUES (
          $1, $2, $3, $4
        )
        RETURNING id
      `, [name, ticker_symbol, color, price]);

      client.release();

      return res.status(201).json(rows[0].id);
    } catch (error) {
      return res.status(422).json({ error });
    }
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