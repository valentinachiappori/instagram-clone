import express from "express";
import getInstagramSystem from "@unq-ui/instagram-model-js";
import TokenController from "./controllers/TokenController.js";
import AuthController from "./controllers/authController.js";
import UserController from "./controllers/userController.js";
import PostController from "./controllers/postController.js";
import SearchController from "./controllers/searchController.js";

export const system = getInstagramSystem();

const app = express();
const port = 3000;

app.use(express.json());

const tokenController = new TokenController(system);
const authController = new AuthController(system, tokenController);
const userController = new UserController(system);
const postController = new PostController(system);
const searchController = new SearchController(system);

// Auth routes
app.post("/login", tokenController.checkRole("public"), authController.login);
app.post("/register", tokenController.checkRole("public"), authController.register);

// Post routes
app.post("/posts", tokenController.checkRole("user"), postController.createPost);

// User routes
app.get("/user", tokenController.checkRole("user"), userController.getUserTimeline);
app.get("/user/:userId", tokenController.checkRole("public"), userController.getUser);
app.put("/users/:userId/follow", tokenController.checkRole("user"), userController.putFollow);

// Search routes
app.get("/search", searchController.search);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});