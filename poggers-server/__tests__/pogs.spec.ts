import supertest from "supertest";
import { app, pool } from "../src/index";
import { Pogs } from "../../poggers-frontend/src/lib/types";

let rows: Pogs[];

describe("Pogs", () => {
  beforeAll(async () => {
    // setup
    const client = await pool.connect();
    const res = await client.query<Pogs>(`
      INSERT INTO pogs (
        name,
        ticker_symbol,
        color,
        price
      )
      VALUES
      ('testing', 'hmmhi', 'blue', 30),
      ('testing2', 'hmmhi2', 'green', 302)
      RETURNING id
    `);
    rows = res.rows;
    client.release();
  });

  describe("get all pogs", () => {
    it("should show all of them", async () => {
      // invocation
      const res = await supertest(app).get("/api/pogs");

      // assessment
      expect(res.statusCode).toBe(200);
      expect(rows.length).toBe(2);
    });
  });

  describe("get a specific pog", () => {
    it("should show the pog", async () => {
      // invocation
      const res = await supertest(app).get(`/api/pogs/${rows[0].id}`);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body[0].name).toBe('testing');
    });
  });

  describe("post/create a pog", () => {
    it("should create a new pog and return it", async () => {
      const payload: Pogs = {
        name: "testinggg3",
        ticker_symbol: "tstng3",
        color: "green",
        price: 100,
      };

      // invocation
      const res = await supertest(app)
        .post("/api/pogs")
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

      // assessment
      expect(res.statusCode).toBe(201);
      expect(res.body[0].ticker_symbol).toBe("tstng3");

      //teardown
      const client3 = await pool.connect();
      await client3.query(`
        DELETE FROM pogs
        WHERE name = 'testinggg3'
      `);
      client3.release();
    });
  });

  describe("update a pog using PUT method", () => {
    it("should update the pog", async () => {
      const payload: Pogs = {
        name: "testing",
        ticker_symbol: "hmmhi",
        color: "blue",
        price: 999999,
      };

      // invocation
      const res = await supertest(app)
        .put(`/api/pogs/${rows[0].id}`)
        .send(payload)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe('999999');
    });
  });

  describe("delete a pog", () => {
    it("should delete the pog details", async () => {
      // invocation
      const res = await supertest(app).delete(`/api/pogs/${rows[1].id}`);

      // assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Successfully deleted!");
    });
  });

  afterAll(async () => {
    // teardown
    const client2 = await pool.connect();
    await client2.query<Pogs>(`
      DELETE FROM pogs
      WHERE
        name = 'testing' OR
        name = 'testing2'
    `);
    client2.release();

    await pool.end();
  });
});
