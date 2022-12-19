import express, { Request, Response } from 'express';
import { AirportStore } from '../models/airports';

const store = new AirportStore();

const show = async(req: Request, res: Response) => {
    try {
        const result = await store.index();
        res.json(result);
    } catch (error: any) {
        res.sendStatus(204);
    }
}

const airportsRoutes = (app: express.Application) => {
    app.get('/airports', show)
}

export default airportsRoutes;