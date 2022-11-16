"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const userVerifier_1 = require("../middlewares/userVerifier");
const validator = async (body, rules, customMessages, callback) => {
    console.log(`helpers/validate -- validator -- body : ${JSON.stringify(body)}`);
    const validation = new validatorjs_1.default(body, rules, customMessages);
    console.log(`helpers/validate -- validator -- validation.passes() : ${JSON.stringify(validation.passes())}`);
    console.log(`helpers/validate -- validator -- validation.passes : ${validation.passes()}`);
    console.log(`helpers/validate -- validator -- validation.errors : ${JSON.stringify(validation.errors)}`);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
exports.validator = validator;
// Check the strengh of a password
const passwordStrengthCheck = (pwd, status = "admin") => {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    const passwordIsStrongEnough = (status == 'admin') ? strongPassword.test(pwd) : mediumPassword.test(pwd);
    return passwordIsStrongEnough;
};
// add a custom validator's rult to check if the new user's mail is already registered
validatorjs_1.default.registerAsync('unique', function (email, attribute, req, passes) {
    console.log(email);
    const user = (0, userVerifier_1.getUserFromEmail)(email);
    console.log(user);
    // .then((result) => {
    //     console.log(result)
    //     if(result){
    //         passes(false); // return false if value exists
    //         return;
    //     }
    //     passes();
    // })
}, 'Email is already registered');
// add a custom validator's rule to check the strenght of the password
validatorjs_1.default.register('strongPassword', (password) => passwordStrengthCheck(password, 'activ'), 'Password is not strong enough');
