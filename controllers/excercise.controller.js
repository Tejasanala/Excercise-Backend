import { Excercises } from "../entity/excercise.entity.js";
import {
  UpdateexeById,
  createexeById,
  DeleteexeById,
  GetexeById,
  Getexe,
} from "../service/excercise.service.js";
import { v4 as uuidv4 } from "uuid";
import { Session } from "../entity/session.entity.js";

async function GetexeCtr(request, response) {
  //we can also write html codes in send .. it can render the file
  const { search } = request.query;

  if (!search) {
    const allMovies = await Getexe();
    response.send(allMovies.data);
    return;
  }

  const filterData = await Excercises.scan
    .where(
      (
        { name, type, preferredTime, cautionAge, bodyPartAffected },
        { contains }
      ) => `
      ${contains(name, search)} OR ${contains(type, search)}  OR ${contains(
        preferredTime,
        search
      )} OR ${contains(cautionAge, search)} OR ${contains(
        bodyPartAffected,
        search
      )}
      `
    )
    .go();

  console.log(filterData);

  //   const allMovies = await Getexe();
  response.send(filterData.data);
}

async function GetexeByIdCtr(request, response) {
  //we can also write html codes in send .. it can render the file
  const { id } = request.params;
  //   console.log(id);

  // const res = movies.find((findd) => findd.id == id);
  const data = await GetexeById(id);
  response.send(data.data);
  // if (res) {
  //   response.send(res);
  // } else {
  //   response.status(404).send({ msg: "Movie not found" });
  // }
}

async function DeleteexeByIdCtr(request, response) {
  //we can also write html codes in send .. it can render the file
  const { id } = request.params;

  const data = await DeleteexeById(id);
  console.log(data.data);
  if (data) {
    response.send({
      msg: "Workout deleted successfully",
      data: `${data.data}`,
    });
  } else {
    response.send({ msg: "Workout not found" });
  }
}

async function createexeByIdCtr(request, response) {
  const data = request.body;

  const datas = {
    ...data,
    ValueId: uuidv4(),
  };

  await createexeById(datas);

  response.send(datas);
}

async function UpdateexeByIdCtr(request, response) {
  const { id } = request.params;

  const updatedData = request.body;

  try {
    const existingData = await GetexeById(id);

    if (existingData.data) {
      const res = await UpdateexeById(existingData, updatedData);
      console.log(res.data);
      response.send(res.data);
    } else {
      response.status(404).send({ msg: "Exercise not found" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).send({ msg: "Failed to display" });
  }
}

export {
  GetexeCtr,
  GetexeByIdCtr,
  DeleteexeByIdCtr,
  createexeByIdCtr,
  UpdateexeByIdCtr,
};
