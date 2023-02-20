require('dotenv').config();
import express from 'express';
import config from 'config';
import cors from 'cors';
import {AppDataSource} from './utils/data-source';
import phonesRoute from "./routes/phones.route";
import {Server} from "socket.io";
import {createPhone} from "./services/phone.service"
import {Events} from './Events'

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json({limit: '10kb'}));
    // ROUTES
    app.use(phonesRoute);

    const port = config.get<number>('port');
    const server = app.listen(port);

    console.log(`Server started with pid: ${process.pid} on port: ${port}`);

    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    io.on("connection", (socket) => {

      socket.on("disconnect", () => {
          console.log("User disconnected");
      });

      socket.on(Events.APPEND_NUMBER, (data: {phoneNumber: string, countryCode: string}) => {
          const {phoneNumber, countryCode} = data;
          createPhone({phoneNumber, countryCode}).then((data) => {
            io.sockets.emit(Events.RECEIVE_NEW_PHONE, data);
          }).catch(e => {
            socket.emit(Events.ERROR, {
              status: 'error',
              message: e.message
            })
          })
      })
    });
  })
  .catch((error) => console.log(error));
