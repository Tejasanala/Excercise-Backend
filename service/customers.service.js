import { Customers } from "../entity/customers.entity.js";

function createUser(addUser) {
  return Customers.create(addUser).go();
}

async function getUserByName(username) {
  return await Customers.get({ username }).go();
}

export { createUser, getUserByName };
