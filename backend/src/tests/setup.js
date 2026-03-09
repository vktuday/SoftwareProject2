// Ensure JWT env vars exist during tests (tests do NOT rely on server.js)
process.env.JWT_SECRET = process.env.JWT_SECRET || "test_jwt_secret_please_change";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Runs before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Clear DB between tests
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Close DB after tests
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});