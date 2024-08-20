import express from "express";
import cors from "cors";
import ExcerciseRouter from "./excercise.route.js";
import CustomersRouter from "./customers.route.js";
import adminRouter from "./admin.route.js";
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/excercise", ExcerciseRouter);

app.use("/customers", CustomersRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
