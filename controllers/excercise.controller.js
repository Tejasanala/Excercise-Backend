import {
  UpdateexeById,
  createexeById,
  DeleteexeById,
  GetexeById,
  Getexe,
} from "../service/excercise.service.js";
import { v4 as uuidv4 } from "uuid";

async function GetexeCtr(request, response) {
  //we can also write html codes in send .. it can render the file
  const allMovies = await Getexe();
  response.send(allMovies.data);
}

async function GetexeByIdCtr(request, response) {
  //we can also write html codes in send .. it can render the file
  const { id } = request.params;
  //   console.log(id);

  // const res = movies.find((findd) => findd.id == id);
  const data = await GetexeById(id);
  response.send(data);
  // if (res) {
  //   response.send(res);
  // } else {
  //   response.status(404).send({ msg: "Movie not found" });
  // }
}

async function DeleteexeByIdCtr(request, response) {
  //we can also write html codes in send .. it can render the file
  const { id } = request.params;

  // const res = movies.filter((findd) => findd.id != id);
  // const data = await Movies.query.primary({ movieId: `${id}` }).go();
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

  // response.send({ msg: "Movie added Successfully." });
  // if (res) {
  //   response.send(res);
  // } else {
  //   response.status(404).send({ msg: "Movie not found" });
  // }
}

async function UpdateexeByIdCtr(request, response) {
  const { ValueId } = request.params;
  //   console.log(id);
  const updatedData = request.body;

  const existingData = await GetexeById(ValueId);
  if (existingData.data) {
    const res = await UpdateexeById(existingData, updatedData);
    console.log(res.data);
    response.send(res.data);
  } else {
    response.status(404).send({ msg: "Movie not found" });
  }
}

export {
  GetexeCtr,
  GetexeByIdCtr,
  DeleteexeByIdCtr,
  createexeByIdCtr,
  UpdateexeByIdCtr,
};
