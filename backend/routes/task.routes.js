import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.get("/Tasks", authRequired, (req, res) => res.send("Tasks"))

export default router;
