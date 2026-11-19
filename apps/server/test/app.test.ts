import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/app";

describe("url shortener", () => {
  it("shortens a URL and redirects to it", async () => {
    const { body } = await request(app)
      .post("/shorten")
      .send({
        url: "https://www.example.com"
      })
      .expect(200);

    const id = new URL(body.shortUrl).pathname;
    await request(app)
      .get(id)
      .expect(302)
      .expect("location", "https://www.example.com");
  });

  it("prevents duplicate URLs from being created", async () => {
    const a = await request(app)
      .post("/shorten")
      .send({ url: "https://www.example.com" });

    const b = await request(app)
      .post("/shorten")
      .send({ url: "https://www.example.com" });

    const idA = new URL(a.body.shortUrl).pathname;
    const idB = new URL(b.body.shortUrl).pathname;

    expect(idA).toBe(idB);
  });

  it("rejects invalid URLs", async () => {
    await request(app).post("/shorten").send({ url: "nope" }).expect(400);
  });

  it("404s on unknown ids", async () => {
    await request(app).get("/unknown").expect(404);
  });
});
