import express, { Request, Response, NextFunction } from 'express';
import { verifyAuthToken } from '../middlewares/userMiddlewares';
import { Airline, AirlineStore } from '../models/airlines';

const store = new AirlineStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(401).json(`${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(401).json(`${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  const airline: Airline = {
    name: req.body.name,
    country_id: req.body.countryId,
    user_id: req.body.userId,
  };
  try {
    const result = await store.create(airline);
    res.json(result);
  } catch (error) {
    res.status(400).json(`${error}${airline}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const airlinesRoutes = (app: express.Application) => {
  app.get('/airlines', verifyAuthToken, callerIsOwnerAdminOrAdmin, index);
  app.get('/airlines/:id', verifyAuthToken, callerIsOwnerOrOwnerAdminOrAdmin, show);
  app.post('/airlines', callerIsOwnerAdminOrAdmin, create);
  app.delete('/airlines/:id', verifyAuthToken, callerIsOwnerAdminOrAdmin, destroy);
};

export default airlinesRoutes;
