import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';
import route from './routes';
import cors from 'cors';
dotenv.config();

const url = "mongodb+srv://nitikaarya3998:XujoNlc0rw7EfKw5@cluster0.nrnxkgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.enableCors();
        this.app.use(express.json());
        this.connectToRoute();
        this.connectToMongo();
        this.staticAssets();       
    }

    private connectToMongo() {
        connect(`${url}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions).then(() => {
            console.log("info->", "Connected to MongoDB....");
        }).catch((e) => {
            console.log("info", "There was an error connecting to MongoDB");
            console.log(e);
        });
    }

    private connectToRoute() {
        this.app.use(express.json());
        this.app.use(route);
    }

    private staticAssets() {
        this.app.use(express.static('public'));
    }

    private enableCors() {
        const corsOptions = {
            origin: 'http://localhost:3000', 
            methods: 'GET,POST',
            allowedHeaders: 'Content-Type',
          }
        this.app.use(cors(corsOptions));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running...');
        });
    }
}
