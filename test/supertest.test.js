import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import { expect } from "chai";

before(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://marianamohr:c9zKW4F8Vadmdn5d@cluster0.zm7bida.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

after(async () => {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
});

describe("Users", () => {
  let userDao;
  before(async () => {
    userDao = new User();
  });
  beforeEach(function () {
    this.timeout(5000);
  });
  describe("get", () => {
    it("dao deve retornar os usuarios em um array", async () => {
      const expetedUser = [
        {
          _id: "66523cdf22a8c6fa0c3a1328",
          name: 'Gui Salzer',
          email: 'guisalzer@gmail.com',
          role: 'admin',
          pets: []
        }
      ];
      const resultado = await userDao.get();
      expect(resultado.email).to.be.deep.equal(expetedUser.email);
      expect(resultado).to.be.an("array");
    });
  });
  describe("delete", () => {
    it("Deve deletar um usuario", async () => {
      const usersBefore = await userDao.get();
      const id = usersBefore[0]._id;
      await userDao.delete(id)
      const usersAfter = await userDao.getBy(id)
      console.log(usersAfter)
     expect(usersAfter).to.be.equal(null)
    });
  });
});