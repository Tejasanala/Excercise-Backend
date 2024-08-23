import {
  createUser,
  getUserByName,
  createSession,
} from "../service/customers.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genHashpassword = async (password) => {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

async function createUserCtr(request, response) {
  const data = request.body;
  const password = data.password;
  const roleId = 0;
  if (data.password.length < 8) {
    response.status(400).send({ msg: "Password is too short" });
    return;
  }
  const getUserByUname = await getUserByName(data.username);
  console.log(getUserByUname);

  if (getUserByUname.data) {
    response.status(404).send({ msg: "user already exist" });
    return;
  }

  const hashpassword = await genHashpassword(password);
  const hasheddata = {
    username: data.username,
    password: hashpassword,
    roleId: roleId,
  };
  try {
    await createUser(hasheddata);
    response.status(201).send(hasheddata);
    console.log(hasheddata);
  } catch (err) {
    console.log(err.message);
    response.send({ msg: "unable to create" });
  }
}

// ..........................................................

async function getUserCtr(request, response) {
  const data = request.body;
  const username = data.username;
  const storedDBUser = await getUserByName(data.username);

  if (!storedDBUser.data) {
    response.status(404).send({ msg: "Invalid credentials" });
    return;
  } else {
    const storedPassword = storedDBUser.data.password;
    const providedPassword = data.password;
    console.log(providedPassword, storedPassword);

    //here the order is important the stored password is given as a second parameter
    const isPasswordCheck = await bcrypt.compare(
      providedPassword,
      storedPassword
    );
    if (isPasswordCheck) {
      var token = jwt.sign(
        { teja: storedDBUser.data.username },
        process.env.SECRET_KEY
      );

      const roleId = storedDBUser.data.roleId;
      const username = storedDBUser.data.username;
      const sessionData = { username, token };
      await createSession(sessionData);

      response
        .status(200)
        .send({ msg: "Login Successful", token, roleId, username });
      return;
    } else {
      response.status(400).send({ msg: "Invalid credentials" });
      return;
    }
  }
}

export { createUserCtr, getUserCtr };
