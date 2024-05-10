import { Router } from "express";
import { tokenVerifier } from "../middlewares/tokenVerifier.js";
import { playGame } from "../controllers/yams.js";

const YamsRouter = Router();

YamsRouter.use("/", tokenVerifier);
YamsRouter.get("/play", playGame);

export default YamsRouter;
