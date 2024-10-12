import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';

import './middlewares/auth.middleware';
import AppRouter from '@/routes';
import errorHandler from '@/middlewares/error.middleware';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());

router.init();

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});