import { Router } from "express";
import { tokenVerifier } from "../middlewares/tokenVerifier";
import { playGame } from "../controllers/yams";

const YamsRouter = Router();

YamsRouter.use("/", tokenVerifier);
YamsRouter.get("/play", playGame);

export default YamsRouter;
