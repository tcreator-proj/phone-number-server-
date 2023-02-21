import { Router } from "express";
import {getAllPhonesHandler} from "../controllers/phones.controller";

const router = Router();

router.
    route('/phones')
    .get(getAllPhonesHandler)

export default router;
