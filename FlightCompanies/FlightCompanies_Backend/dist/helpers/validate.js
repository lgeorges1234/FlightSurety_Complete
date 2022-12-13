"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validate = void 0;
var validatorjs_1 = __importDefault(require("validatorjs"));
var userUtilityFunction_1 = require("./userUtilityFunction");
var validate = function (body, rules, customMessages) { return __awaiter(void 0, void 0, void 0, function () {
    var validation;
    return __generator(this, function (_a) {
        validation = new validatorjs_1["default"](body, rules, customMessages);
        // validation.checkAsync(fail, passes)
        // console.log(`helpers/validate -- validator -- validation.passes() : ${JSON.stringify(validation.passes())}`)
        // console.log(`helpers/validate -- validator -- validation.errors : ${JSON.stringify(validator.errors)}`)
        return [2 /*return*/, validation];
    });
}); };
exports.validate = validate;
// Check the strengh of a password
var passwordStrengthCheck = function (pwd, status) {
    if (status === void 0) { status = "activ"; }
    // console.log(`helpers/validate -- passwordStrengthCheck -- status : ${JSON.stringify(status)}`)
    var strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    var mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    var passwordIsStrongEnough = (status == 'admin' || status == 'root') ? strongPassword.test(pwd) : mediumPassword.test(pwd);
    // console.log(`helpers/validate -- passwordStrengthCheck -- passwordIsStrongEnough : ${JSON.stringify(passwordIsStrongEnough)}`)
    return passwordIsStrongEnough;
};
// add a custom validator's rule to check the strenght of the password
validatorjs_1["default"].register('strongPassword', function (password, requirement) { return passwordStrengthCheck(password, requirement); }, 'Password is not strong enough');
// add a custom validator's rult to check if the new user's mail is already registered
validatorjs_1["default"].registerAsync('unique', function (email, _attribute, _req, passes) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, userUtilityFunction_1.getUserFromEmail)(email)
                        .then(function (result) {
                        console.log(result);
                        if (!result) {
                            passes(false); // return false if value exists
                            return;
                        }
                        passes();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}, 'email is already registered');
