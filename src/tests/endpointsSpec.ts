import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);
let token: string | null = null;
let currentId: number | null = null;

describe("Testing register/login endpoints", () => {
  it("Test register", async () => {
    await request
      .post("/api/auth/register")
      .send({ email: "test@jasmin.com", name: "Jasmin", age: 21, password: "jasmine123" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
  });

  it("Test login", async () => {
    const res = await request
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "test@jasmin.com", password: "jasmine123" });
    expect(res.status).toBe(200);
    token = `${res.body.userToken}`;
    currentId = await res.body.data.id;
  });
});

describe("Testing user routes with auth", () => {
  it("Test all users route with auth", async () => {
    await request.get("/api/user/all").set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test get specific user route with auth", async () => {
    await request.get(`/api/user/show/${currentId}`).set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test update user route with auth", async () => {
    await request
      .post("/api/user/update")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ id: 1, email: "test123@jasmin.com", name: "Jasmin1", age: 45, password: "jasmine324" })
      .expect(200);
  });

  it("Test delete user route with auth", async () => {
    await request.post("/api/user/delete").set("Authorization", `Bearer ${token}`).send({ id: currentId }).expect(200);
  });
});
