import { Request, Response, NextFunction } from 'express';
import _ = require("lodash");
import { getUserFromEmail, noAdminExists } from '../helpers/userUtilityFunction';
import { User } from '../models/users';


export const callerIsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(req.app.locals.user) {
    // console.log(`user.Middlewares -- callerIsAuthenticated -- req.app.locals.user : ${JSON.stringify(req.app.locals.user)}`)
    next();
  } else res.status(403);
}

export const callerIsAuthorized = async (
  allowedRoles: string[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.app.locals.user;
  // console.log(`userVerifier -- callerIsAuthorized  -- allowedRoles: ${JSON.stringify(allowedRoles)}`)
  // console.log(`user.Middlewares -- callerIsAuthorized -- user.roles : ${JSON.stringify(user.roles)}`)
  const roles = _.intersection([user.roles], allowedRoles);
  // console.log(`user.Middlewares -- callerIsAuthorized -- roles : ${roles}`)
 
/// if the user is authenticated, we check complementary conditions according to its status
  if(roles.length > 0) {
    // a user can only access this path if his token id correspond to the id furnished as url parameter 
    if(_.intersection(user.roles, 'client') && req.body.id != user.id) {
      console.log("User Id does not correspond to its token permission");
      res.sendStatus(403);    
    }
    // root user cannot access this path if admin users have already been created
    else if(_.intersection(user.roles, 'root') && await noAdminExists()) {
      console.log("User Id does not correspond to user's token id");
      res.sendStatus(403);    
    }
    else next();
  }
  else {
    console.log("Token's role doesn't grant access to this path");
    res.sendStatus(403);
  }
}

export const emailIsRegistered = async (
  emailExists: boolean,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(`userVerifier -- uniqueEmail -- emailExists : ${JSON.stringify(emailExists)}`)
  // console.log(`userVerifier -- uniqueEmail -- req.body.email : ${JSON.stringify(req.body.email)}`)
  const user: User = await getUserFromEmail(req.body.email) as unknown as User;
  // console.log(`userVerifier -- uniqueEmail  -- uniqueEmail -- user : ${JSON.stringify(user)}`)
  if (user &&  emailExists || !user && !emailExists) next();
  else if(!user &&  emailExists) {
    console.log('uniqueEmail middleware - Email is not registered');
    res.sendStatus(403);    
  }
  else {
    console.log('uniqueEmail middleware - Email is already registered');
    res.sendStatus(403);    
  }
}

