import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const userAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let token = '';
    // get the token from the request
    //   console.log(`userVerifier -- userAuthentication -- req.headers.authorization : ${JSON.stringify(req.headers.authorization)}`)
      const authorizationHeader = req.headers.authorization as string;
      if(authorizationHeader) token = authorizationHeader.split(' ')[1];
      //  console.log(`userVerifier -- verifyAuthToken -- token : ${JSON.stringify(token)}`)
      if (token) {
        handleSessionCookie(token, req)
          .then(() => next())
          .catch((err: any) => {
            console.error(err);
            next();
          })
      } else next();
};
  
async function handleSessionCookie(token: string, req: Request) {
    try {
        const user: any = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
        req.app.locals.user = user;
    } catch(error: any) {
        console.log("Error: Could not extract user from request:", error.message);
    }
};