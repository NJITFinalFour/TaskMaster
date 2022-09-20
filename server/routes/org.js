import express from "express";
const router = express.router();
import { orgSignup } from "../controller/orgController";

router.post("/signup", orgSignup);

export default router;