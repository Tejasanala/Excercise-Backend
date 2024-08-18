import express from "express";
import {
  GetexeCtr,
  GetexeByIdCtr,
  DeleteexeByIdCtr,
  createexeByIdCtr,
  UpdateexeByIdCtr,
} from "./controllers/excercise.controller.js";

const router = express.Router();

router.route("/").get(GetexeCtr).post(createexeByIdCtr);

router
  .route("/:id")
  .get(GetexeByIdCtr)
  .delete(DeleteexeByIdCtr)
  .put(UpdateexeByIdCtr);

export default router;
