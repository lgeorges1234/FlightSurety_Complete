"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateInputValidator = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
// userInputValidator middleware
const authenticateInputValidator = async (req, res, next) => {
    console.log();
    // rules to be applied
    const validationRule = {
        email: 'required|string|email|max:100',
        password_digest: 'required|string',
    };
    // validation function that contains the data to be validated, the rules, any custom error messages
    // and a callback method
    const validation = new validatorjs_1.default(req.body, validationRule);
    console.log(`authenticateInputsValidator validation.passes : ${validation.passes()}`);
    console.log(`authenticateInputsValidator validation.errors : ${JSON.stringify(validation.errors)}`);
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
module.exports = {
    authenticateInputValidator: exports.authenticateInputValidator,
};
