import { Customers } from "../entity/customers.entity.js";
import { Session } from "../entity/session.entity.js";

function createUser(addUser) {
  return Customers.create(addUser).go();
}

async function getUserByName(username) {
  return await Customers.get({ username }).go();
}
async function createSession(sessionData) {
  return await Session.create(sessionData).go();
}

export { createUser, getUserByName, createSession };
