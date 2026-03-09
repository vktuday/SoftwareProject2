require("./setup");

const request = require("supertest");
const { createApp } = require("../app");

const app = createApp();

describe("Quiz API", () => {
  test("Save quiz result success", async () => {
    // Register user first
    const registerRes = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Henry",
        email: "henry@test.com",
        password: "Password123",
      });

    const token = registerRes.body.token;

    const res = await request(app)
      .put("/api/users/me/quiz-result")
      .set("Authorization", `Bearer ${token}`)
      .send({
        skinType: "Oily",
        concerns: ["Acne"],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.quizResult.skinType).toBe("Oily");
  });
});