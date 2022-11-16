import { Request, Response, NextFunction } from 'express';
import { validate } from '../helpers/validate';


/// userInputValidator middleware
export const userInputValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(`userInputValidators -- userInputValidator -- res.locals.userStatus : ${JSON.stringify(res.locals.user)}`)
  const userStatus = res.locals.user? res.locals.user.status :  'activ';
  // console.log(`userInputValidators -- userInputValidator -- res.locals.user : ${JSON.stringify(userStatus)}`)
  // console.log(`userInputValidators -- userInputValidator -- req.body : ${JSON.stringify(req.body)}`)
  const validationCreationRules =     {
    email: 'required|string|email|max:100',
    firstname: 'required|string|max:100',
    lastname: 'required|string|max:100',
    status: 'required',
    password_digest: `required|string|min:8|strongPassword:${userStatus}`,
  };

  const validator = await validate(req.body, validationCreationRules, {});
  // console.log(`userInputValidators -- validator -- validation.passes() : ${JSON.stringify(validator.passes())}`)
  // console.log(`userInputValidators -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
  if(validator.passes()) next();
  else {
        res.status(412)
        .send({
            success: false,
            message: 'Validation failed',
            data: validator.errors
        });
  }
}


export const authenticateInputValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationAuthenticationRules = {
    email: 'required|string|email|max:100',
    password_digest: 'required|string',
  };
    const validator = await validate(req.body, validationAuthenticationRules, {});
    // console.log(`userInputValidators -- validator -- validation.passes() : ${JSON.stringify(validator.passes())}`)
    // console.log(`userInputValidators -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
    if(validator.passes()) next();
    else {
          res.status(412)
          .send({
              success: false,
              message: 'Validation failed',
              data: validator.errors
          });
    }
}

