import express, { Request, Response } from 'express';
import {
  callerIsAdmin,
  callerIsRootorAdmin,
  userAuthentication,
  uniqueEmail,
  existingUserId,
  callerIsRoot,
  existingEmail,
  callerIsUserOrAdmin,
} from '../middlewares/user.Middlewares';
import { authenticateInputValidator, userInputValidator } from '../middlewares/userInputsValidator';
import { getStatusIdFromStatusName } from '../helpers/userUtilityFunction';

import { User, UserStore } from '../models/users';
import { createSessionToken } from '../helpers/security.utils';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
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
      data: error.message,
    });
  }
};

const create = async (req: Request, res: Response) => {
  const userStatusFormated:  number = await getStatusIdFromStatusName('client') as unknown as number;
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    status: userStatusFormated,
    password_digest: req.body.password,
  };
    // console.log(`usersStores -- create -- user : ${JSON.stringify(user)}`)
  try {
    const newUser = await store.create(user);
    // console.log(`usersStores -- create -- newUser : ${JSON.stringify(newUser)}`)
    const token = await createSessionToken(newUser);
    // console.log(`usersStores -- create -- token : ${JSON.stringify(token)}`)
    res.json(token);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
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
      data: error.message,
    });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    // console.log(`userStores -- authenticate -- email ${JSON.stringify(email)}`)
    const authenticateUser = await store.authenticate(email, password);
    // console.log(`userStores -- authenticate -- authenticateUser ${JSON.stringify(authenticateUser)}`)
    const token = await createSessionToken(authenticateUser);
    // console.log(`userStores -- authenticate -- token ${JSON.stringify(token)}`)
    res.json(token);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
};

const indexStatus = async (req: Request, res: Response) => {
  try {
    const result = await store.indexStatus();
    res.json(result);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
};


const createAdmin = async (req: Request, res: Response) => {
  const adminStatusFormated: number = await getStatusIdFromStatusName('admin') as unknown as number;
  // console.log(`usersStores -- createAdmin -- adminStatusFormated : ${JSON.stringify(adminStatusFormated)}`)
  // console.log(`usersStores -- createAdmin -- req.body.roles : ${JSON.stringify(req.body.roles)}`)
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    status: adminStatusFormated,
    password_digest: req.body.password_digest,
  };
  try {
    const newUser = await store.create(user);
    const token = await createSessionToken(newUser);
    // console.log(`usersStores -- create -- token : ${token}`)
    res.json(token);
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
};

const usersRoutes = (app: express.Application) => {
  // auth path
  app.post('/signup', userInputValidator, uniqueEmail,  create);
  app.post('/login', authenticateInputValidator, existingEmail, authenticate);
  // user path
  app.get('/user/:id', existingUserId, userAuthentication, callerIsUserOrAdmin, show);
  app.delete('/user/:id', userAuthentication, callerIsUserOrAdmin,  existingUserId, destroy);
  // admin path
  // the first (and only the first administrator account) will be created thanks to the initial root account
  app.post('/user', userAuthentication, callerIsRootorAdmin, callerIsRoot, uniqueEmail, userInputValidator, createAdmin);
  app.get('/user', userAuthentication, callerIsAdmin, index); // retun all users
  app.get('/status', userAuthentication, callerIsAdmin, indexStatus); // return all status
};

/// middleware
// userAuthentication    Check if the user's token is valid
// callerIsXX         Check if the Json Web Token allowing the call is coming from a user of status XX
// existingUserId     Check if the requested id exists
// uniqueEmail        Check if the user's email does'nt already exist
// existingEmail      Check if the user's email is already registered
// userInputValidator Check if user's creation inputs respect applied rules
// authenticateInputValidator Check if user's authentication inputs respect applied rules

export default usersRoutes;
