"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const userUtilityFunction_1 = require("./userUtilityFunction");
const validate = async (body, rules, customMessages) => {
    // console.log(`helpers/validate -- validator -- body : ${JSON.stringify(body)}`)
    const validation = new validatorjs_1.default(body, rules, customMessages);
    // validation.checkAsync(fail, passes)
    // console.log(`helpers/validate -- validator -- validation.passes() : ${JSON.stringify(validation.passes())}`)
    // console.log(`helpers/validate -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
    return validation;
};
exports.validate = validate;
// Check the strengh of a password
const passwordStrengthCheck = (pwd, status = "activ") => {
    // console.log(`helpers/validate -- passwordStrengthCheck -- status : ${JSON.stringify(status)}`)
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    const passwordIsStrongEnough = (status == 'admin' || status == 'root') ? strongPassword.test(pwd) : mediumPassword.test(pwd);
    // console.log(`helpers/validate -- passwordStrengthCheck -- passwordIsStrongEnough : ${JSON.stringify(passwordIsStrongEnough)}`)
    return passwordIsStrongEnough;
};
// add a custom validator's rule to check the strenght of the password
validatorjs_1.default.register('strongPassword', (password, requirement) => passwordStrengthCheck(password, requirement), 'Password is not strong enough');
// add a custom validator's rult to check if the new user's mail is already registered
validatorjs_1.default.registerAsync('unique', async function (email, _attribute, _req, passes) {
    await (0, userUtilityFunction_1.getUserFromEmail)(email)
        .then((result) => {
        console.log(result);
        if (!result) {
            passes(false); // return false if value exists
            return;
        }
        passes();
    });
}, 'email is already registered');
