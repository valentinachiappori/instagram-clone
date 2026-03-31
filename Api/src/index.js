import express from "express";
import getInstagramSystem from "@unq-ui/instagram-model-js";
import TokenController from "./controllers/TokenController.js";
import AuthController from "./controllers/authController.js";
import UserController from "./controllers/userController.js";

export const system = getInstagramSystem();

const app = express();
const port = 3000;

app.use(express.json());

const tokenController = new TokenController(system);
const authController = new AuthController(system, tokenController);
const userController = new UserController(system);

// Auth routes
app.post("/login", tokenController.checkRole("public"), authController.login);
app.post("/register", tokenController.checkRole("public"), authController.register);

// User routes
app.get("/user/:userId", tokenController.checkRole("public"), userController.getUser);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});