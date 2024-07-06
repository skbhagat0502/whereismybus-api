import express from "express";
import { addBus, deleteBus, updateBus } from "../controllers/bus.js";
import { jwtVerify } from "../middlewares/jwtVerify.js";
import { validateBus } from "../validators/bus.js";
const router = express.Router();
router.use(express.json());
router.post("/add/bus", [jwtVerify, validateBus], addBus);
router.post("/delete/bus/:id", jwtVerify, deleteBus);
router.post("/update/bus/:id", jwtVerify, updateBus);

export default router;
