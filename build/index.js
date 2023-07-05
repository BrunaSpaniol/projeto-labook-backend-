"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserControler_1 = require("./controller/UserControler");
const PostControler_1 = require("./controller/PostControler");
const LikesControler_1 = require("./controller/LikesControler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
const userController = new UserControler_1.UserController();
const postController = new PostControler_1.PostController();
const likesController = new LikesControler_1.LikesController();
app.get("/users", userController.findUsers);
app.post("/users/signup", userController.createUser);
app.get("/users/login", userController.userLogin);
app.get("/posts", postController.findPosts);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.editPost);
app.delete("/posts/:id", postController.deletePost);
app.put("/posts/:id/like", likesController.createLikeOrDislike);
//# sourceMappingURL=index.js.map