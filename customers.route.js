import express from "express";

import {
  createUserCtr,
  getUserCtr,
} from "./controllers/customers.controllers.js";

const router = express.Router();

router.post("/signup", express.json(), createUserCtr);

router.post("/login", express.json(), getUserCtr);

//put method
//router.put("/:id", UpdateMovieByIdCtr);

export default router;
