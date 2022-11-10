import express from "express";

import {homeGetController, homePostController} from '../controller/home.js';
import correction from '../controller/correction.js';

const router = express.Router();

router.get("/", homeGetController);
router.post("/", homePostController);
router.get("/correction/:epreuve/:pseudo/:langage", correction);

export default router;