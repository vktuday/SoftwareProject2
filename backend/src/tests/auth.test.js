require("./setup");

const request = require("supertest");
const { createApp } = require("../app");

const app = createApp();

describe("Auth API", () => {
  test("Register success", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Henry",
        email: "henry@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("Register duplicate email fails", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Henry",
        email: "henry@test.com",
        password: "Password123",
      });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Henry2",
        email: "henry@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(409);
  });

  test("Login success", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Henry",
        email: "henry@test.com",
        password: "Password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "henry@test.com",
        password: "Password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Login wrong password fails", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Henry",
        email: "henry@test.com",
        password: "Password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "henry@test.com",
        password: "WrongPass",
      });

    expect(res.statusCode).toBe(401);
  });
});