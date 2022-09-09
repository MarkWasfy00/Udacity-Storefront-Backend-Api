import User from "../models/userModel";
import { ReceivedUserModel } from "../models/types/UserModel";

const userModel = new User();
const dummyUserModelData = {
  id: 0,
  email: "db@test.com",
  name: "dbtest",
  age: 44,
  password: "dbtest123",
};

describe("Testing user model database", () => {
  it("Test create user", async () => {
    const create = await userModel.create(dummyUserModelData);
    if ("data" in create) {
      dummyUserModelData.id = (create.data as ReceivedUserModel).id;
      expect(create.data).toEqual({
        id: dummyUserModelData.id,
        email: dummyUserModelData.email,
        name: dummyUserModelData.name,
        age: dummyUserModelData.age,
      });
    }
    expect(create.status).toBe(200);
  });

  it("Test auth user", async () => {
    const auth = await userModel.auth(dummyUserModelData.email, dummyUserModelData.password);
    if ("data" in auth) {
      expect(auth.data).toEqual({
        id: dummyUserModelData.id,
        email: dummyUserModelData.email,
        name: dummyUserModelData.name,
        age: dummyUserModelData.age,
      });
    }
    expect(auth.status).toBe(200);
  });

  it("Test get all user", async () => {
    const index = await userModel.index();
    if ("data" in index) {
      expect((index.data as ReceivedUserModel[]).length).toBeGreaterThanOrEqual(1);
    }
    expect(index.status).toBe(200);
  });

  it("Test show sepcific user", async () => {
    const show = await userModel.show(dummyUserModelData.id);
    if ("data" in show) {
      expect(show.data).toEqual({
        id: dummyUserModelData.id,
        email: dummyUserModelData.email,
        name: dummyUserModelData.name,
        age: dummyUserModelData.age,
      });
    }
    expect(show.status).toBe(200);
  });

  it("Test update user", async () => {
    const update = await userModel.update({
      id: dummyUserModelData.id,
      email: "db@test2.com",
      name: "dbtest2",
      age: 33,
      password: "dbtest456",
    });
    if ("data" in update) {
      expect(update.data).toEqual({
        id: dummyUserModelData.id,
        email: "db@test2.com",
        name: "dbtest2",
        age: 33,
      });
    }
    expect(update.status).toBe(200);
  });

  it("Test delete user", async () => {
    const destroy = await userModel.destroy(dummyUserModelData.id);
    if ("data" in destroy) {
      expect(destroy.data).toEqual({
        id: dummyUserModelData.id,
        email: "db@test2.com",
        name: "dbtest2",
        age: 33,
      });
    }
    expect(destroy.status).toBe(200);
  });
});
