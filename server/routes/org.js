import express from "express";
const router = express.Router();

import { orgSignup, findAllOrgs, findOrgName } from "../controller/orgController.js";

import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

router.get("/", findAllOrgs);

router.post("/signup", jsonParser, orgSignup);

router.get("/find", jsonParser, findOrgName)

export default router;