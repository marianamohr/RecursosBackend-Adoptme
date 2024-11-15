import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
import { dirname } from 'path';
const __dirname = dirname(__filename);
console.log("__dirname",`${__dirname}/docs/Users.yaml`)

const swaggerOptions = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"API da AdoptMe",
            description:"API for my application"
        },
        
    },
    apis:[`${__dirname}/docs/Users.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions);

dotenv.config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
