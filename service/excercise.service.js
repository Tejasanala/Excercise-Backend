import { Excercises } from "../entity/excercise.entity.js";

function UpdateexeById(existingData, updatedData) {
  return Excercises.put({ ...existingData.data, ...updatedData }).go();
}

function createexeById(addMovie) {
  return Excercises.create(addMovie).go();
}

function DeleteexeById(id) {
  return Excercises.delete({
    ValueId: id,
  }).go();
}

function GetexeById(id) {
  return Excercises.get({ ValueId: id }).go();
}

function Getexe() {
  return Excercises.scan.go();
}

export { UpdateexeById, createexeById, DeleteexeById, GetexeById, Getexe };
