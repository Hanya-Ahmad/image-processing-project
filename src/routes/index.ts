import path from 'path';
import express, { Request, Response } from 'express';
import imageProcessor from './api/imageProcessor';

const routes = express.Router();


//display index.html when the server starts running
routes.get('/', (request: Request, response: Response): void => {
    response.sendFile(path.join(__dirname, '../', 'index.html'));
});

routes.use('/imageProcessor', imageProcessor);

export default routes;
