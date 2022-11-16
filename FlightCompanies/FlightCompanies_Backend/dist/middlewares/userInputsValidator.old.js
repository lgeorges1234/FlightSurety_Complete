"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateInputValidator = exports.adminInputValidator = exports.userInputValidator = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const userUtilityFunction_1 = require("../helpers/userUtilityFunction");
const uniqueEmail = async (email) => {
    // console.log(`userInputVerifier -- uniqueEmail -- email : ${JSON.stringify(email)}`)
    const user = await (0, userUtilityFunction_1.getUserFromEmail)(email);
    // console.log(`userInputVerifier -- uniqueEmail -- user : ${JSON.stringify(user)}`)
    return (!user);
};
// Check the strengh of a password
const passwordStrengthCheck = (pwd, status = "admin") => {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    const passwordIsStrongEnough = (status == 'admin') ? strongPassword.test(pwd) : mediumPassword.test(pwd);
    return passwordIsStrongEnough;
};
// rules to be applied
const validationCreationRules = {
    email: 'required|string|email|max:100|unique',
    firstname: 'required|string|max:100',
    lastname: 'required|string|max:100',
    status: 'required',
    password_digest: 'required|string|min:8|strongPassword',
};
const validationAuthenticationRules = {
    email: 'required|string|email|max:100',
    password_digest: 'required|string',
};
/// userInputValidator middleware
const userInputValidator = async (req, res, next) => {
    // add a custom validator's rult to check if the new user's mail is already registered
    validatorjs_1.default.registerAsync('unique', async (email) => {
        const user = await (0, userUtilityFunction_1.getUserFromEmail)(email);
        if (!user)
            return true;
        else
            return false;
    }, 'Email is already registered');
    // add a custom validator's rule to check the strenght of the password
    validatorjs_1.default.register('strongPassword', (password) => passwordStrengthCheck(password, 'activ'), 'Password is not strong enough');
    // validation function that contains the data to be validated, the rules, any custom error messages
    // and a callback method
    const validation = new validatorjs_1.default(req.body, validationCreationRules);
    // console.log(`userInputValidator -- validation.passes() : ${validation.passes()}`)
    // console.log(`userInputValidator -- validation.errors : ${JSON.stringify(validation.errors)}`)
    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors,
        });
    }
    else {
        next();
    }
};
exports.userInputValidator = userInputValidator;
/// adminInputValidator middleware
const adminInputValidator = async (req, res, next) => {
    // add a custom validator's rult to check if the new user's mail is already registered
    validatorjs_1.default.registerAsync('unique', (email) => uniqueEmail(req.body.email), 'Email is already registered');
    // add a custom validator's rule to check the strenght of the password
    validatorjs_1.default.register('strongPassword', (password) => passwordStrengthCheck(password), 'Password is not strong enough');
    // validation function that contains the data to be validated, the rules, any custom error messages
    // and a callback method
    const validation = new validatorjs_1.default(req.body, validationCreationRules);
    // console.log(`adminInputValidator -- validation.passes() : ${validation.passes()}`)
    // console.log(`adminInputValidator -- validation.errors : ${JSON.stringify(validation.errors)}`)
    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors,
        });
    }
    else {
        next();
    }
};
exports.adminInputValidator = adminInputValidator;
// authenticateInputsValidator middleware
const authenticateInputValidator = async (req, res, next) => {
    // validation function that contains the data to be validated, the rules, any custom error messages
    // and a callback method
    const validation = new validatorjs_1.default(req.body, validationAuthenticationRules);
    // console.log(`authenticateInputsValidator validation.passes : ${validation.passes()}`)
    // console.log(`authenticateInputsValidator validation.errors : ${JSON.stringify(validation.errors)}`)
    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors,
        });
    }
    else {
        next();
    }
};
exports.authenticateInputValidator = authenticateInputValidator;
