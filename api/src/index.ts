import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { signInController } from "./controllers/auth/signin.controller.js";
import { signUpController } from "./controllers/auth/signup.controller.js";
import { getMeController } from "./controllers/user/get-me.controller.js";

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", signUpController);
app.post("/signin", signInController);
app.get("/me", getMeController);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
