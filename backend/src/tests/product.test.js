require("./setup");

const request = require("supertest");
const { createApp } = require("../app");
const Product = require("../models/Product");

const app = createApp();

describe("Products API", () => {
  test("GET /api/products returns list", async () => {
    // Seed in-memory DB with 2 products
    await Product.insertMany([
      {
        name: "Hydrating Cleanser",
        brand: "CeraCare",
        skinType: "Dry",
        description: "Gentle cleanser for dry skin types.",
      },
      {
        name: "Oil Control Serum",
        brand: "GlowLab",
        skinType: "Oily",
        description: "Reduces shine and minimizes pores.",
      },
    ]);

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBe(2);
  });

  test("GET /api/products/:id returns one product", async () => {
    const created = await Product.create({
      name: "Soothing Cream",
      brand: "PureSkin",
      skinType: "Sensitive",
      description: "Calms redness and irritation.",
    });

    const res = await request(app).get(`/api/products/${created._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.product.name).toBe("Soothing Cream");
  });

  test("GET /api/products/:id returns 404 for non-existing id", async () => {
    // Valid MongoDB ObjectId format but not in DB
    const fakeId = "507f1f77bcf86cd799439011";
    const res = await request(app).get(`/api/products/${fakeId}`);

    expect(res.statusCode).toBe(404);
  });
});