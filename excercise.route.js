import express from "express";
import { auth } from "./middlewares/auth.middleware.js";
import {
  GetmovieCtr,
  GetMovieByIdCtr,
  DeleteMovieByIdCtr,
  createMovieByIdCtr,
  UpdateMovieByIdCtr,
} from "./controllers/movies.controller.js";

const router = express.Router();

router.route("/").get(GetmovieCtr).post(createMovieByIdCtr);

router
  .route("/:id")
  .get(GetMovieByIdCtr)
  .delete(DeleteMovieByIdCtr)
  .put(UpdateMovieByIdCtr);

export default router;
