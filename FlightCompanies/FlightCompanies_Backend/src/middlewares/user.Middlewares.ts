import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { getStatusNameFromStatusId, getUserFromEmail, getUserFromId } from '../helpers/userUtilityFunction';
import { User } from '../models/users';


export const callerIsRoot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(`userVerifier -- callerIsRoot  -- res.locals : ${JSON.stringify(res.locals)}`)
    // console.log(`userVerifier -- callerIsRoot  -- rootStatusId : ${JSON.stringify(rootStatusId)}`)
    const isRoot = 'root' == res.locals.user.status;
    // console.log(`userVerifier -- callerIsRoot  -- res.locals.userStatus : ${JSON.stringify(res.locals.userStatus)}`)
    // console.log(`userVerifier -- callerIsRoot -- isRoot: ${JSON.stringify(isRoot)}`)
    if (isRoot) next();
    else throw new Error('caller must be root user')
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
}

export const callerIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = 'admin' == await getStatusNameFromStatusId(res.locals.user.status);
    if (isAdmin) next();
    else throw new Error('caller must be administrator')
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
}

export const callerIsUserOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const adminStatus: Promise<number> = await getStatusIdFromStatusName("admin");
    // console.log(`userVerifier -- callerIsUserOrAdmin -- adminStatus: ${JSON.stringify(adminStatus)}`)
    const isAdmin = 'admin' == await getStatusNameFromStatusId(res.locals.user.status);
    // console.log(`userVerifier -- callerIsUserOrAdmin -- isAdmin: ${JSON.stringify(isAdmin)}`)
    const isUser = +req.params.id == res.locals.user.id;
    // console.log(`userVerifier -- callerIsUserOrAdmin -- +req.params.id: ${JSON.stringify(+req.params.id)}`)
    // console.log(`userVerifier -- callerIsUserOrAdmin -- res.locals.id: ${JSON.stringify(res.locals.id)}`)
    // console.log(`userVerifier -- callerIsUserOrAdmin -- isUser: ${JSON.stringify(isUser)}`)
    if (isAdmin || isUser) next();
    else throw new Error('caller must be the user or administrator')
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
}

export const callerIsRootorAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = res.locals.user.status
    // console.log(`userVerifier -- callerIsRootorAdmin -- status: ${JSON.stringify(status)}`)
    const isAdmin = 'admin' == status;
    // console.log(`userVerifier -- callerIsRootorAdmin -- isAdmin: ${JSON.stringify(isAdmin)}`)
    const isRoot = 'root' == status;
    // console.log(`userVerifier -- callerIsRootorAdmin -- isRoot: ${JSON.stringify(isRoot)}`)
    if (isAdmin || isRoot) next();
    else throw new Error('caller must be root or administrator')
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
}


export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(`userVerifier -- uniqueEmail -- req.body.email : ${JSON.stringify(req.body.email)}`)
    const user: User = await getUserFromEmail(req.body.email) as unknown as User;
    // console.log(`userVerifier -- uniqueEmail -- user : ${JSON.stringify(user)}`)
    if (!user) next();
    else throw new Error('Email already registered');
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
};

export const existingEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(`userVerifier -- existingEmail -- req.body.email : ${JSON.stringify(req.body.email)}`)
    const user: User = await getUserFromEmail(req.body.email) as unknown as User;
    // console.log(`userVerifier -- existingEmail -- user : ${JSON.stringify(user)}`)
    if (user) next();
    else throw new Error('Email not registered - access denied');
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
};

// /// check presence and validity of the token's request
// export const verifyAuthToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // get the token from the request
//     // console.log(`userVerifier -- verifyAuthToken -- req.headers.authorization : ${JSON.stringify(req.headers.authorization)}`)
//     const authorizationHeader = req.headers.authorization as string;
//     const token = authorizationHeader.split(' ')[1];
//     // console.log(`userVerifier -- verifyAuthToken -- token : ${JSON.stringify(token)}`)
//     // verify the token using jwt.verify
//     const user: any = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
//     console.log(`userVerifier -- verifyAuthToken -- user : ${JSON.stringify(user)}`)
//     // res.locals.user = user.subject;
//     req.app.locals.user = user.subject;
//     next();
//     // in case of issues concerning the token presence in the request or validity
//     // send back an error message
//   } catch (error: any) {
//     res.status(412).send({
//       success: false,
//       message: 'Validation failed',
//       data: 'token is not valid, access Denied',
//     });
//   }
// };

export const userAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
      // get the token from the request
    // console.log(`userVerifier -- userAuthentication -- req.headers.authorization : ${JSON.stringify(req.headers.authorization)}`)
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    // console.log(`userVerifier -- verifyAuthToken -- token : ${JSON.stringify(token)}`)
    if (token) {
      handleSessionCookie(token, req)
        .then(() => next())
        .catch((err: any) => {
          console.error(err);
          next();
        })
    }
};

async function handleSessionCookie(token: string, req: Request) {
  try {
    const user: any = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    req.app.locals.user = user;
  } catch(error: any) {
    console.log("Error: Could not extract user from request:", error.message);
  }
}

export const existingUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(`userVerifier -- existingUserId -- req.params.id : ${req.params.id}`)
    const user: User = await getUserFromId(req.params.id) as unknown as User;
    // console.log(`userVerifier -- existingUserId -- user : ${JSON.stringify(user)}`)
    if (user) {
      next();
    } else {
      throw new Error('ID is not valid');
    }
  } catch (error: any) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: error.message,
    });
  }
};
