import express, { Request, Response } from 'express';
import {
  callerIsAdmin,
  callerIsRootorAdmin,
  verifyAuthToken,
  uniqueEmail,
  existingUserId,
  callerIsRoot,
  existingEmail,
  callerIsUserOrAdmin,
} from '../middlewares/userMiddlewares';
import { authenticateInputValidator, userInputValidator } from '../middlewares/userInputsValidator';
import { getRolesIdFromRolesName, getStatusIdFromStatusName } from '../helpers/userUtilityFunction';

import { User, UserStore } from '../models/users';
import { createCsrfToken, createSessionToken } from '../helpers/security.utils';

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
  const userStatusFormated:  number = await getStatusIdFromStatusName('activ') as unknown as number;
  const userRolesFormated: number = await getRolesIdFromRolesName(req.body.roles) as unknown as number;

  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    status: userStatusFormated,
    roles: userRolesFormated,
    password_digest: req.body.password_digest,
  };
  try {
    const newUser = await store.create(user);
    // console.log(`usersStores -- create -- newUser : ${JSON.stringify(newUser)}`)
    // const token = jwt.sign(
    //   { user: newUser },
    //   process.env.TOKEN_SECRET as Secret,
    //   { expiresIn: '3600' }
    // );
    const token = createSessionToken(newUser);
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
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    status: req.body.status,
    roles: req.body.roles,
    password_digest: req.body.password_digest,
  };
  try {
    // console.log(`userStores -- authenticate -- user ${JSON.stringify(user)}`)
    const authenticateUser = await store.authenticate(user);
    // const token = jwt.sign(
    //   { user: authenticateUser },
    //   process.env.TOKEN_SECRET as Secret
    // );
    const token = await createSessionToken(authenticateUser);
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

const indexRoles = async (req: Request, res: Response) => {
  try {
    const result = await store.indexRoles();
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
  const userRolesFormated: number = await getRolesIdFromRolesName(req.body.roles) as unknown as number;
  // console.log(`usersStores -- createAdmin -- userRolesFormated : ${JSON.stringify(userRolesFormated)}`)
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    status: adminStatusFormated,
    roles: userRolesFormated,
    password_digest: req.body.password_digest,
  };
  try {
    const newUser = await store.create(user);
    // console.log(`usersStores -- create -- newUser : ${JSON.stringify(newUser)}`)
    // const token = jwt.sign(
    //   { user: newUser },
    //   process.env.TOKEN_SECRET as Secret,
    //   { expiresIn: '3600' }
    // );
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
  // user path
  app.get('/users/:id', existingUserId, verifyAuthToken, callerIsUserOrAdmin, show);
  app.post('/users/register', userInputValidator, uniqueEmail,  create);
  app.delete('/users/:id', verifyAuthToken, callerIsUserOrAdmin,  existingUserId, destroy);
  app.post('/users/authenticate', authenticateInputValidator, existingEmail, authenticate);
  // admin path
  // the first (and only the first administrator account) will be created thanks to the initial root account
  app.post('/users', verifyAuthToken, callerIsRootorAdmin, callerIsRoot, uniqueEmail, userInputValidator, createAdmin);
  app.get('/users', verifyAuthToken, callerIsAdmin, index); // retun all users
  app.get('/status', verifyAuthToken, callerIsAdmin, indexStatus); // return all status
  app.get('/roles', verifyAuthToken, callerIsAdmin, indexRoles); // return all roles
};

/// middleware
// verifyAuthToken    Check if the user's token is valid
// callerIsXX         Check if the Json Web Token allowing the call is coming from a user of status XX
// existingUserId     Check if the requested id exists
// uniqueEmail        Check if the user's email does'nt already exist
// existingEmail      Check if the user's email is already registered
// userInputValidator Check if user's creation inputs respect applied rules
// authenticateInputValidator Check if user's authentication inputs respect applied rules

export default usersRoutes;
