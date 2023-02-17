require('dotenv').config();
import express, {Application} from 'express';
import config from 'config';
import cors from 'cors';
import {AppDataSource} from './utils/data-source';
import phonesRoute from "./routes/phones.route";
import {Server} from "socket.io";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json({limit: '10kb'}));
        app.use(
            cors({
                origin: config.get<string>('origin'),
                credentials: true,
            })
        );

        // ROUTES
        app.use(phonesRoute);

        const port = config.get<number>('port');
        const server = app.listen(port);
        console.log(`Server started with pid: ${process.pid} on port: ${port}`);
        const io = new Server(server);
        io.on("connection", (socket) => {
            console.log("User connected");

            socket.on("disconnect", () => {
                console.log("User disconnected");
            });
        });
    })
    .catch((error) => console.log(error));
