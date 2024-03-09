import express from "express";
import { Response, Request } from "express";
import { pool } from "../server";
import { Pogs } from "../../../poggers-frontend/src/lib/types"

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query<Pogs>(`
        SELECT * FROM pogs
        ORDER BY id
      `);
      client.release();

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
  .put("/:id", async (req: Request, res: Response) => {
    try {
      const {
        name,
        ticker_symbol,
        color,
        price
      }: Pogs = await req.body;
      const client = await pool.connect();
      const { rows } = await client.query<Pogs>(`
        UPDATE pogs
        SET
          name = $1,
          ticker_symbol = $2,
          color = $3,
          price = $4
        WHERE id = $5
      `, [name, ticker_symbol, color, price, req.params.id]);

      client.release();

      return res.status(200).json({ message: "Successfully updated!" });
    } catch (error) {
      return res.status(422).json({ error });
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const client = await pool.connect();
      const { rows } = await client.query<Pogs>(`
        DELETE FROM pogs
        WHERE id = $1
      `, [req.params.id]);

      client.release();

      return res.status(200).json({ message: "Successfully deleted!" });
    } catch (error) {
      return res.status(404).json({ error });
    }
  })

export default router;