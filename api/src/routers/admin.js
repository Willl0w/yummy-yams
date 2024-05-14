import { Router } from "express";
import { tokenVerifier } from "../middlewares/tokenVerifier.js";
import { getResults } from "../controllers/admin.js";

const AdminRouter = Router();

AdminRouter.use("/", tokenVerifier);

AdminRouter.get("/results", getResults);

export default AdminRouter;
