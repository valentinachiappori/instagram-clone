import express from "express";
import getInstagramSystem from "@unq-ui/instagram-model-js";
import TokenController from "./controllers/TokenController.js";
import AuthController from "./controllers/authController.js";
import UserController from "./controllers/userController.js";
import PostController from "./controllers/postController.js";
import SearchController from "./controllers/searchController.js";
import { validate } from "./middleware/auth_middleware.js";

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
app.post("/login", validate("LOGIN"), tokenController.checkRole("public"), authController.login);
app.post("/register", validate("REGISTER"), tokenController.checkRole("public"), authController.register);

// Post routes
app.post("/posts", tokenController.checkRole("user"), validate("CREATE_POST"), postController.createPost);
app.put("/posts/:postId/like", tokenController.checkRole("user"), postController.updateLike);
app.post("/posts/:postId/comment", tokenController.checkRole("user"), validate("COMMENT"), postController.addComment);
app.get("/posts/:postId", tokenController.checkRole("public"), postController.getPost);
app.put("/posts/:postId", tokenController.checkRole("user"), validate("UPDATE_POST"), postController.updatePost);
app.delete("/posts/:postId", tokenController.checkRole("user"), postController.deletePost);

// User routes
app.get("/user", tokenController.checkRole("user"), userController.getUserTimeline);
app.get("/user/:userId", tokenController.checkRole("public"), userController.getUser);
app.put("/users/:userId/follow", tokenController.checkRole("user"), userController.putFollow);

// Search routes
app.get("/search", tokenController.checkRole("public"), searchController.search);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});