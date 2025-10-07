import request from "supertest";
import app from "../src/server.js"; // your Express app
import { initDB } from '../src/config/initDB.js';

describe("Auth API", () => {
  let testEmail = "testuser@example1.com";
  let testPassword = "password123";

  let db;
  beforeAll(async () => {
    db =  await initDB();
    // Clear previous test users
    await db.run("DELETE FROM users WHERE email = ?", [testEmail]);
  });

  afterAll(async () => {
    await db.close();
  });
  

  // --- REGISTER TEST ---
  it("should register a new user successfully", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: testEmail,
        password: testPassword,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered");
  });

  // --- DUPLICATE EMAIL TEST ---
  it("should return 400 for duplicate email", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User 2",
        email: testEmail,
        password: testPassword,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Email exists/i);
  });

  // --- LOGIN TEST ---
  it("should login successfully and return a JWT token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toBe("Login successful");
  });

  // --- INVALID PASSWORD TEST ---
  it("should reject login with invalid password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: testEmail,
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid password/i);
  });

  // --- INVALID EMAIL TEST ---
  it("should reject login with non-existent email", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "notfound@example.com",
        password: testPassword,
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Email not exists/i);
  });
});
