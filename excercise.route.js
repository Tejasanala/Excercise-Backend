import express from "express";
import {
  GetexeCtr,
  GetexeByIdCtr,
  DeleteexeByIdCtr,
  createexeByIdCtr,
  UpdateexeByIdCtr,
} from "./controllers/excercise.controller.js";
import { authIsAdmin } from "./middleware/isadmin.middleware.js";
import { auth } from "./middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(GetexeCtr).post(createexeByIdCtr);

router
  .route("/:id")
  .get(GetexeByIdCtr)
  .delete(DeleteexeByIdCtr)
  .put(UpdateexeByIdCtr);

//Both User and admin can perform
// router.get("/", GetexeCtr);
// router.get("/:id", GetexeByIdCtr);

// //Only admin can perform
// router.delete("/:id", auth, authIsAdmin, DeleteexeByIdCtr);
// router.post("/", auth, authIsAdmin, createexeByIdCtr);
// router.put("/:id", auth, authIsAdmin, UpdateexeByIdCtr);

// //UserPerforming Tasks on his data .
// // router.get("/customers", auth, getPhotosByUsernameCtr);
// router.post("/customers", auth, createexeByIdCtr);
// router.put("/customers/:id", auth, UpdateexeByIdCtr);
// router.delete("/customers/:id", auth, DeleteexeByIdCtr);

export default router;
