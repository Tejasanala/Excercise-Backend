import express from "express";
import {
  createAdminctr,
  loginAdminctr,
  getUser,
  getexeByIdCtrl,
  deleteexeByIdCtrl,
  editexeByIdctrl,
  getexeCtrl,
  createexeByIdCtrl,
} from "./controllers/admin.controllers.js";
import { auth } from "./middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", createAdminctr);
router.post("/login", loginAdminctr);
router.post("/add", auth, createexeByIdCtrl);

router.get("/exe", getexeCtrl);
router.get("/exe/:id", getexeByIdCtrl);
router.delete("/exe/:id", deleteexeByIdCtrl);
router.put("/exe/:id", editexeByIdctrl);

export default router;
