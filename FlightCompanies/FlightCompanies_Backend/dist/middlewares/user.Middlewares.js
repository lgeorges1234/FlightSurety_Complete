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
exports.existingUserId = exports.userAuthentication = exports.existingEmail = exports.uniqueEmail = exports.callerIsRootorAdmin = exports.callerIsUserOrAdmin = exports.callerIsAdmin = exports.callerIsRoot = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userUtilityFunction_1 = require("../helpers/userUtilityFunction");
var callerIsRoot = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isRoot;
    return __generator(this, function (_a) {
        try {
            isRoot = 'root' == res.locals.user.status;
            // console.log(`userVerifier -- callerIsRoot  -- res.locals.userStatus : ${JSON.stringify(res.locals.userStatus)}`)
            // console.log(`userVerifier -- callerIsRoot -- isRoot: ${JSON.stringify(isRoot)}`)
            if (isRoot)
                next();
            else
                throw new Error('caller must be root user');
        }
        catch (error) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: error.message
            });
        }
        return [2 /*return*/];
    });
}); };
exports.callerIsRoot = callerIsRoot;
var callerIsAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isAdmin, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = 'admin';
                return [4 /*yield*/, (0, userUtilityFunction_1.getStatusNameFromStatusId)(res.locals.user.status)];
            case 1:
                isAdmin = _a == (_b.sent());
                if (isAdmin)
                    next();
                else
                    throw new Error('caller must be administrator');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: error_1.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.callerIsAdmin = callerIsAdmin;
var callerIsUserOrAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isAdmin, _a, isUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = 'admin';
                return [4 /*yield*/, (0, userUtilityFunction_1.getStatusNameFromStatusId)(res.locals.user.status)];
            case 1:
                isAdmin = _a == (_b.sent());
                isUser = +req.params.id == res.locals.user.id;
                // console.log(`userVerifier -- callerIsUserOrAdmin -- +req.params.id: ${JSON.stringify(+req.params.id)}`)
                // console.log(`userVerifier -- callerIsUserOrAdmin -- res.locals.id: ${JSON.stringify(res.locals.id)}`)
                // console.log(`userVerifier -- callerIsUserOrAdmin -- isUser: ${JSON.stringify(isUser)}`)
                if (isAdmin || isUser)
                    next();
                else
                    throw new Error('caller must be the user or administrator');
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: error_2.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.callerIsUserOrAdmin = callerIsUserOrAdmin;
var callerIsRootorAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status_1, isAdmin, isRoot;
    return __generator(this, function (_a) {
        try {
            status_1 = res.locals.user.status;
            isAdmin = 'admin' == status_1;
            isRoot = 'root' == status_1;
            // console.log(`userVerifier -- callerIsRootorAdmin -- isRoot: ${JSON.stringify(isRoot)}`)
            if (isAdmin || isRoot)
                next();
            else
                throw new Error('caller must be root or administrator');
        }
        catch (error) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: error.message
            });
        }
        return [2 /*return*/];
    });
}); };
exports.callerIsRootorAdmin = callerIsRootorAdmin;
var uniqueEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userUtilityFunction_1.getUserFromEmail)(req.body.email)];
            case 1:
                user = _a.sent();
                // console.log(`userVerifier -- uniqueEmail -- user : ${JSON.stringify(user)}`)
                if (!user)
                    next();
                else
                    throw new Error('Email already registered');
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: error_3.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.uniqueEmail = uniqueEmail;
var existingEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userUtilityFunction_1.getUserFromEmail)(req.body.email)];
            case 1:
                user = _a.sent();
                // console.log(`userVerifier -- existingEmail -- user : ${JSON.stringify(user)}`)
                if (user)
                    next();
                else
                    throw new Error('Email not registered - access denied');
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: error_4.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.existingEmail = existingEmail;
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
var userAuthentication = function (req, res, next) {
    // get the token from the request
    // console.log(`userVerifier -- userAuthentication -- req.headers.authorization : ${JSON.stringify(req.headers.authorization)}`)
    var authorizationHeader = req.headers.authorization;
    var token = authorizationHeader.split(' ')[1];
    // console.log(`userVerifier -- verifyAuthToken -- token : ${JSON.stringify(token)}`)
    if (token) {
        handleSessionCookie(token, req)
            .then(function () { return next(); })["catch"](function (err) {
            console.error(err);
            next();
        });
    }
};
exports.userAuthentication = userAuthentication;
function handleSessionCookie(token, req) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            try {
                user = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                req.app.locals.user = user;
            }
            catch (error) {
                console.log("Error: Could not extract user from request:", error.message);
            }
            return [2 /*return*/];
        });
    });
}
var existingUserId = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, userUtilityFunction_1.getUserFromId)(req.params.id)];
            case 1:
                user = _a.sent();
                // console.log(`userVerifier -- existingUserId -- user : ${JSON.stringify(user)}`)
                if (user) {
                    next();
                }
                else {
                    throw new Error('ID is not valid');
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(412).send({
                    success: false,
                    message: 'Validation failed',
                    data: error_5.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.existingUserId = existingUserId;
