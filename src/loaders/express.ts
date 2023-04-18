import express from 'express';
import bodyParser from 'body-parser';
import { Express } from 'express'
import cors from 'cors';
import routes from '../routes';

export default ({ app }: { app: Express }) => {

    // viewLoader({ app });

    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    app.use(cors());
    app.enable('trust proxy');
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // errors(app)
    app.use('/', routes);

    // return io;
};
