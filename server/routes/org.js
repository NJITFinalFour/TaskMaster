import express from "express";
const router = express.Router();

import { orgSignup } from "../controller/orgController.js";

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

router.post("/signup", jsonParser, orgSignup);

export default router;