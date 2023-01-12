import express, { Request, Response, NextFunction } from 'express';
import { Flight, FlightPassenger, FlightStore } from '../models/flights';

const store = new FlightStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      // data: error.message,
    });
    console.log(`flightStore -- index -- ${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      // data: error.message,
    });
    console.log(`flightStore -- show -- ${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  const flight: Flight = {
    name: req.body.name,
    date: req.body.date as unknown as Date,
    departure: req.body.departure,
    arrival: req.body.arrival,
    status: 0,
    airline_id: req.body.airline_id,
  };
  // console.log(`flightStore -- create -- flight : ${JSON.stringify(flight)}`)
  try {
    const result = await store.create(flight);
    // console.log(`flightStore -- create -- result : ${JSON.stringify(result)}`)
    res.json(result);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      // data: error.message,
    });
    console.log(`flightStore -- create -- ${error}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      // data: error.message,
    });
  }
};

const addPassenger = async (req: Request, res: Response) => {
    const flightPassenger: FlightPassenger = {
        flight_id: req.params.id as unknown as number,
        user_id: req.body.id
    };
    try {
      const addPassengerResult = await store.addPassenger(flightPassenger);
      res.json(addPassengerResult);
    } catch (error: any) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        // data: error.message,
      });
      console.log(`flightStore -- addPassenger -- ${error}`);
    }
  };
  
  const indexPassengersFromFlight = async (req: Request, res: Response) => {
    const flight_id = req.params.id as unknown as number;
    try {
      const editPassengerResult = await store.indexPassengersFromFlight(flight_id);
      res.json(editPassengerResult);
    } catch (error: any) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          // data: error.message,
        });
      console.log(`flightStore -- indexPassengerFromFlight -- ${error}`);
    }
  };
  
  const removePassenger = async (req: Request, res: Response) => {
    const flightPassengers: FlightPassenger = {
        flight_id: req.params.id as unknown as number,
        user_id: req.body.id
    };
    try {
      const removedPassengerResult = await store.removePassenger(flightPassengers);
      res.json(removedPassengerResult);
    } catch (error: any) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          // data: error.message,
        });
      console.log(`flightStore -- removePassenger -- ${error}`);
    }
  };


const flightsRoutes = (app: express.Application) => {
  app.get('/flights', index);
  app.get('/flights/:id', show);
  app.post('/flights', create);
  app.delete('/flights/:id', destroy);
  // add, remove, edit passengers from flight
  app.post('/flights/:id', addPassenger);
  app.get('flight/:id', indexPassengersFromFlight);
  app.delete('/flights/:id', removePassenger);
};

export default flightsRoutes;

