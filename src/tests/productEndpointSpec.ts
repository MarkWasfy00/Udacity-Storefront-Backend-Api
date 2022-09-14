import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);
let token: string | null = null;
const product = {
  id: 0,
  name: "mobile",
  price: 22.99,
};

describe("Testing product routes endpoints", () => {
  beforeAll(async () => {
    await request
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "testProduct@jasmin.com", firstname: "Jasmin", lastname: "test", password: "jasmine123" });
    const res = await request
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: "testProduct@jasmin.com", password: "jasmine123" });
    token = `${res.body.userToken}`;
  });

  it("Test create product route  with auth", async () => {
    const res = await request
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(product);
    expect(res.body.data.name).toEqual(product.name);
    product.id = res.body.data.id;
  });

  it("Test all products route  with auth", async () => {
    await request.get("/api/products").set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test get specific product  with auth", async () => {
    await request.get(`/api/products/${product.id}`).set("Authorization", `Bearer ${token}`).expect(200);
  });

  it("Test update product route with auth", async () => {
    await request
      .put(`/api/products/${product.id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ id: product.id, name: "iphone 11", price: 999.99 })
      .expect(200);
  });

  it("Test delete product route with auth", async () => {
    await request.delete(`/api/products/${product.id}`).set("Authorization", `Bearer ${token}`).expect(200);
  });
});
