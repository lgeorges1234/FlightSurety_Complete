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
exports.__esModule = true;
exports.emailIsRegistered = exports.callerIsAuthorized = exports.callerIsAuthenticated = void 0;
var _ = require("lodash");
var userUtilityFunction_1 = require("../helpers/userUtilityFunction");
var callerIsAuthenticated = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.app.locals.user) {
            // console.log(`user.Middlewares -- callerIsAuthenticated -- req.app.locals.user : ${JSON.stringify(req.app.locals.user)}`)
            next();
        }
        else
            res.status(403);
        return [2 /*return*/];
    });
}); };
exports.callerIsAuthenticated = callerIsAuthenticated;
var callerIsAuthorized = function (allowedRoles, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, roles, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.app.locals.user;
                roles = _.intersection([user.roles], allowedRoles);
                if (!(roles.length > 0)) return [3 /*break*/, 5];
                if (!(_.intersection(user.roles, 'client') && req.body.id != user.id)) return [3 /*break*/, 1];
                console.log("User Id does not correspond to its token permission");
                res.sendStatus(403);
                return [3 /*break*/, 4];
            case 1:
                _a = _.intersection(user.roles, 'root');
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, userUtilityFunction_1.noAdminExists)()];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                if (_a) {
                    console.log("User Id does not correspond to user's token id");
                    res.sendStatus(403);
                }
                else
                    next();
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                console.log("Token's role doesn't grant access to this path");
                res.sendStatus(403);
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.callerIsAuthorized = callerIsAuthorized;
var emailIsRegistered = function (emailExists, req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, userUtilityFunction_1.getUserFromEmail)(req.body.email)];
            case 1:
                user = _a.sent();
                // console.log(`userVerifier -- uniqueEmail  -- uniqueEmail -- user : ${JSON.stringify(user)}`)
                if (user && emailExists || !user && !emailExists)
                    next();
                else if (!user && emailExists) {
                    console.log('uniqueEmail middleware - Email is not registered');
                    res.sendStatus(403);
                }
                else {
                    console.log('uniqueEmail middleware - Email is already registered');
                    res.sendStatus(403);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.emailIsRegistered = emailIsRegistered;
