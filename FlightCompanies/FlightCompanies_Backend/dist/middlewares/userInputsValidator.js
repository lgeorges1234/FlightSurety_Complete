"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateInputValidator = exports.userInputValidator = void 0;
const validate_1 = require("../helpers/validate");
/// userInputValidator middleware
const userInputValidator = async (req, res, next) => {
    // console.log(`userInputValidators -- userInputValidator -- res.locals.userStatus : ${JSON.stringify(res.locals.user)}`)
    const userStatus = res.locals.user ? res.locals.user.status : 'activ';
    // console.log(`userInputValidators -- userInputValidator -- res.locals.user : ${JSON.stringify(userStatus)}`)
    // console.log(`userInputValidators -- userInputValidator -- req.body : ${JSON.stringify(req.body)}`)
    const validationCreationRules = {
        email: 'required|string|email|max:100',
        firstname: 'required|string|max:100',
        lastname: 'required|string|max:100',
        status: 'required',
        password_digest: `required|string|min:8|strongPassword:${userStatus}`,
    };
    const validator = await (0, validate_1.validate)(req.body, validationCreationRules, {});
    // console.log(`userInputValidators -- validator -- validation.passes() : ${JSON.stringify(validator.passes())}`)
    // console.log(`userInputValidators -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
    if (validator.passes())
        next();
    else {
        res.status(412)
            .send({
            success: false,
            message: 'Validation failed',
            data: validator.errors
        });
    }
};
exports.userInputValidator = userInputValidator;
const authenticateInputValidator = async (req, res, next) => {
    const validationAuthenticationRules = {
        email: 'required|string|email|max:100',
        password_digest: 'required|string',
    };
    const validator = await (0, validate_1.validate)(req.body, validationAuthenticationRules, {});
    // console.log(`userInputValidators -- validator -- validation.passes() : ${JSON.stringify(validator.passes())}`)
    // console.log(`userInputValidators -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
    if (validator.passes())
        next();
    else {
        res.status(412)
            .send({
            success: false,
            message: 'Validation failed',
            data: validator.errors
        });
    }
};
exports.authenticateInputValidator = authenticateInputValidator;
