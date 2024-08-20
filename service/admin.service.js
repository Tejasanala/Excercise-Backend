import { admin } from "../entity/admin.entity.js";
import { Excercises } from "../entity/excercise.entity.js";
async function createAdmin(addAdmin) {
  return await admin.create(addAdmin).go();
}
async function getAdminbyAdminname(Adminname) {
  return await admin.get({ Adminname: Adminname }).go();
}
// all courses
async function getexe() {
  return (await Excercises.scan.go()).data;
}
async function editexeById(existingData, updatedata) {
  return await Excercises.put({
    ...existingData.data,
    ...updatedata,
  }).go();
}

async function deleteexeById(id) {
  await Excercises.delete({ ValueId: id }).go();
}

async function getexeById(id) {
  return await Excercises.get({ ValueId: id }).go();
}

async function createexeById(addMovie) {
  return Excercises.create(addMovie).go();
}

export {
  createAdmin,
  getAdminbyAdminname,
  getexeById,
  deleteexeById,
  editexeById,
  getexe,
  createexeById,
};
