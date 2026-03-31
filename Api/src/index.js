import express from "express";
import getInstagramSystem from "@unq-ui/instagram-model-js";
import TokenController from "./controllers/TokenController.js";
import AuthController from "./controllers/authController.js";

export const system = getInstagramSystem();

const app = express();
const port = 3000;

app.use(express.json());

const tokenController = new TokenController(system);
const authController = new AuthController(system, tokenController);

app.post("/login", authController.login);
app.post("/register", authController.register);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});