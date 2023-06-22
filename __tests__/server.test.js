"use strict";

const { app } = require("../src/server");
const { db } = require("../src/auth/models/index");
const supertest = require("supertest");
const request = supertest(app);
const base64 = require("base-64");

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe("Testing if server handles requests properly", () => {
  test("Should send a 201 on successful POST to /register", async () => {
    let req = {
      username: "mohannad",
      password: "qare123",
    };
    const response = await request.post("/register").send(req);
    expect(response.status).toEqual(201);
  });

  test("Should send a 200 on a successful POST to /sign-in", async () => {
    const response = await request
      .post("/sign-in")
      .set("Authorization", `Basic ${base64.encode(`mohannad:qare123`)}`);
    expect(response.status).toEqual(200);
  });

  test("Should FAIL on POST to /register with no password", async () => {
    let req = {
      username: "mohannad",
    };
    const response = await request.post("/register").send(req);
    expect(response.status).toEqual(403);
  });

  test("Should FAIL on POST to /register with no username", async () => {
    let req = {
      password: "qare123",
    };
    const response = await request.post("/register").send(req);
    expect(response.status).toEqual(403);
  });

  test("Should FAIL on POST to /register with no body", async () => {
    let req = {};
    const response = await request.post("/register").send(req);
    expect(response.status).toEqual(403);
  });

  test("Should FAIL on POST to /sign-in with invalid credentials", async () => {
    const response = await request
      .post("/sign-in")
      .set("Authorization", `Basic ${base64.encode(`mohannad:elduderino456`)}`);
    expect(response.status).toEqual(500);
  });
});
