import supertest from "supertest";
import { app, pool } from "../src/server";
import { Pogs } from "../../poggers-frontend/src/lib/types";

describe("Pogs", () => {
  describe("show all pogs", () => {
    describe("that exist in the db", () => {
      it("should show all of them", async () => {
        // setup
        const client = await pool.connect();
        await client.query<Pogs>(`
          INSERT INTO pogs (
            name,
            ticker_symbol,
            color,
            price
          )
          VALUES
          ('testing', 'hmmhi', 'blue', 30),
          ('testing2', 'hmmhi2', 'green', 302)
        `);
        client.release();

        // invocation
        const res = await supertest(app).get("/api/pogs");

        // assessment
        expect(res.statusCode).toBe(200);

        // teardown
        const client2 = await pool.connect();
        await client2.query(`
          DELETE FROM pogs
          WHERE
            name = 'testing' OR
            name = 'testing2'
        `);
        client2.release();
      })
    })
  })
});