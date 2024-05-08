import { Router } from "express";
import { login, register } from "../controllers/user.js";

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

export default AuthRouter;
