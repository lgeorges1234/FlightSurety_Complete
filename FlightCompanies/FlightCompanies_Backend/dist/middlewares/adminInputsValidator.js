"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminInputValidator = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
// const store = new UserStore();
// adminInputValidator middleware
const adminInputValidator = async (req, res, next) => {
    // Check the strengh of a password
    const passwordStrengthCheck = (pwd) => {
        const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        return strongPassword.test(pwd);
    };
    // add a custom validator's rule to check the strenght of the password
    validatorjs_1.default.register('strongPassword', (password) => passwordStrengthCheck(password), 'Password is not strong enough');
    // rules to be applied
    const validationRule = {
        email: 'required|string|email|max:100',
        firstname: 'required|string|max:100',
        lastname: 'required|string|max:100',
        password_digest: 'required|string|min:8|strongPassword',
    };
    // validation function that contains the data to be validated, the rules, any custom error messages
    // and a callback method
    const validation = new validatorjs_1.default(req.body, validationRule);
    console.log(`userInputValidator -- validation.passes() : ${validation.passes()}`);
    console.log(`userInputValidator -- validation.errors : ${JSON.stringify(validation.errors)}`);
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
module.exports = {
    adminInputValidator: exports.adminInputValidator,
};
