import {
  createAdmin,
  getAdminbyAdminname,
  getexeById,
  editexeById,
  getexe,
  deleteexeById,
  createexeById,
} from "../service/admin.service.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genHashPassword = async (password) => {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export async function createAdminctr(request, response) {
  const data = request.body;
  if (data.password.length < 8) {
    response.status(400).send({ msg: "pass is too short" });
    return;
  }
  const AdminFromDb = await getAdminbyAdminname(data.Adminname);

  if (AdminFromDb.data) {
    response.status(400).send({ msg: "Adminname already taken" });
    return;
  }
  const hashedPassword = await genHashPassword(data.password);
  try {
    await createAdmin({ Adminname: data.Adminname, password: hashedPassword });
    const token = jwt.sign({ id: data.Adminname }, process.env.SECRET_KEY);
    response.status(200).send({ msg: "sign up sucessful", data, token });
  } catch (error) {
    response.status(500).send("fail to add Admin"); //something bad happend on serve is 500
  }
}
export async function loginAdminctr(request, response) {
  const data = request.body;
  const AdminFromDb = await getAdminbyAdminname(data.Adminname);
  if (!AdminFromDb.data) {
    response.status(400).send({ msg: "invalid crendentials" });
    return;
  } else {
    const storedDbPassword = AdminFromDb.data.password;
    const providedPassword = data.password;

    const ispasswordcheck = await bcrypt.compare(
      providedPassword,
      storedDbPassword
    );
    console.log(ispasswordcheck);
    if (ispasswordcheck) {
      const token = jwt.sign(
        { id: AdminFromDb.data.Adminname },
        process.env.SECRET_KEY
      );
      response.status(200).send({ msg: "Login sucessful", token });
    } else {
      response.status(400).send({ msg: "Invalid credentials" });
    }
  }
}
export async function getUser(request, response) {
  response.send({ token: request.rawHeaders[1] });
}
export async function getexeByIdCtrl(request, response) {
  const { id } = request.params;
  try {
    const res = await getexeById(id);
    res.data
      ? response.send(res.data)
      : response.status(404).send("course not found");
  } catch (error) {
    console.log(error);
    response.status(500).send("fail to retrireve course");
  }
}

export async function getexeCtrl(request, response) {
  try {
    response.send(await getexe());
  } catch (error) {
    //call back funtion we have req and res
    response.send("courses not loaded");
  }
}

export async function deleteexeByIdCtrl(request, response) {
  const { id } = request.params;
  // console.log(id)
  try {
    const res = await getexeById(id);
    if (res.data) {
      await deleteexeById(id);
      response.send({ msg: "deleted successfully", data: res.data });
    } else {
      response.status(404).send({ msg: "Course not found" });
    }
  } catch (error) {
    response.status(500).send("deleted failed");
  }
}

export async function editexeByIdctrl(request, response) {
  const { id } = request.params;
  const updatedata = request.body; //updated data
  try {
    const existingData = await getexeById(id);
    if (existingData.data) {
      const result = await editexeById(existingData, updatedata);
      response.send(result);
    } else {
      response.status(404).send({ msg: "Course not found" });
    }
  } catch (error) {
    response.status(500).send("failed to edit the movie");
  }
}

export async function createexeByIdCtrl(request, response) {
  const data = request.body;

  const datas = {
    ...data,
    ValueId: uuidv4(),
  };

  await createexeById(datas);

  response.send(datas);
}
