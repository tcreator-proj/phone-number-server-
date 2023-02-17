import { Router } from "express";
import {createPhone, getAllPhones} from "../services/phone.service";
import * as trace_events from "trace_events";
import {Phone} from "../entities/phone.entity";
import {getAllPhonesHandler} from "../controllers/phones.controller";

const router = Router();

router.
    route('/phones')
    .get(getAllPhonesHandler)
    .post()

router.post("/phones", async (req, res) => {

    await createPhone(req.body);
    res.status(201);
    res.json({
        created: true
    });
});

export default router;
