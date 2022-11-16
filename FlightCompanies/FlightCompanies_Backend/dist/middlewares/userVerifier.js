"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existingUserId = exports.verifyAuthToken = exports.existingEmail = exports.uniqueEmail = exports.callerIsRootorAdmin = exports.callerIsOwnerOrAdmin = exports.callerIsAdmin = exports.callerIsRoot = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userUtilityFunction_1 = require("../helpers/userUtilityFunction");
const callerIsRoot = async (req, res, next) => {
    try {
        // console.log(`userVerifier -- callerIsRoot  -- res.locals : ${JSON.stringify(res.locals)}`)
        // console.log(`userVerifier -- callerIsRoot  -- rootStatusId : ${JSON.stringify(rootStatusId)}`)
        const isRoot = 'root' == res.locals.user.status;
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
            data: error.message,
        });
    }
};
exports.callerIsRoot = callerIsRoot;
const callerIsAdmin = async (req, res, next) => {
    try {
        const isAdmin = 'admin' == await (0, userUtilityFunction_1.getStatusNameFromStatusId)(res.locals.user.status);
        if (isAdmin)
            next();
        else
            throw new Error('caller must be administrator');
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
exports.callerIsAdmin = callerIsAdmin;
const callerIsOwnerOrAdmin = async (req, res, next) => {
    try {
        // const adminStatus: Promise<number> = await getStatusIdFromStatusName("admin");
        // console.log(`userVerifier -- callerIsOwnerOrAdmin -- adminStatus: ${JSON.stringify(adminStatus)}`)
        const isAdmin = 'admin' == await (0, userUtilityFunction_1.getStatusNameFromStatusId)(res.locals.user.status);
        // console.log(`userVerifier -- callerIsOwnerOrAdmin -- isAdmin: ${JSON.stringify(isAdmin)}`)
        const isOwner = +req.params.id == res.locals.user.id;
        // console.log(`userVerifier -- callerIsOwnerOrAdmin -- +req.params.id: ${JSON.stringify(+req.params.id)}`)
        // console.log(`userVerifier -- callerIsOwnerOrAdmin -- res.locals.id: ${JSON.stringify(res.locals.id)}`)
        // console.log(`userVerifier -- callerIsOwnerOrAdmin -- isOwner: ${JSON.stringify(isOwner)}`)
        if (isAdmin || isOwner)
            next();
        else
            throw new Error('caller must be the user or administrator');
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
exports.callerIsOwnerOrAdmin = callerIsOwnerOrAdmin;
const callerIsRootorAdmin = async (req, res, next) => {
    try {
        const status = res.locals.user.status;
        // console.log(`userVerifier -- callerIsRootorAdmin -- status: ${JSON.stringify(status)}`)
        const isAdmin = 'admin' == status;
        // console.log(`userVerifier -- callerIsRootorAdmin -- isAdmin: ${JSON.stringify(isAdmin)}`)
        const isRoot = 'root' == status;
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
            data: error.message,
        });
    }
};
exports.callerIsRootorAdmin = callerIsRootorAdmin;
const uniqueEmail = async (req, res, next) => {
    try {
        // console.log(`userVerifier -- uniqueEmail -- req.body.email : ${JSON.stringify(req.body.email)}`)
        const user = await (0, userUtilityFunction_1.getUserFromEmail)(req.body.email);
        // console.log(`userVerifier -- uniqueEmail -- user : ${JSON.stringify(user)}`)
        if (!user)
            next();
        else
            throw new Error('Email already registered');
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
exports.uniqueEmail = uniqueEmail;
const existingEmail = async (req, res, next) => {
    try {
        // console.log(`userVerifier -- existingEmail -- req.body.email : ${JSON.stringify(req.body.email)}`)
        const user = await (0, userUtilityFunction_1.getUserFromEmail)(req.body.email);
        // console.log(`userVerifier -- existingEmail -- user : ${JSON.stringify(user)}`)
        if (user)
            next();
        else
            throw new Error('Email not registered - access denied');
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
exports.existingEmail = existingEmail;
/// check presence and validity of the token's request
const verifyAuthToken = (req, res, next) => {
    try {
        // get the token from the request
        // console.log(`userVerifier -- verifyAuthToken -- req.headers.authorization : ${JSON.stringify(req.headers.authorization)}`)
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // console.log(`userVerifier -- verifyAuthToken -- token : ${JSON.stringify(token)}`)
        // verify the token using jwt.verify
        const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        // console.log(`userVerifier -- verifyAuthToken -- user : ${JSON.stringify(user)}`)
        // store user's status and user's role from the decoded token into local variables
        // res.locals.userStatus = user.user.status;
        // console.log(`userVerifier -- verifyAuthToken -- user.user.status : ${JSON.stringify(user.user.status)}`)
        // res.locals.userRole = user.user.roles;
        // res.locals.id = user.user.id;
        res.locals.user = user.user;
        next();
        // in case of issues concerning the token presence in the request or validity
        // send back an error message
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: 'token is not valid, access Denied',
        });
    }
};
exports.verifyAuthToken = verifyAuthToken;
const existingUserId = async (req, res, next) => {
    try {
        // console.log(`userVerifier -- existingUserId -- req.params.id : ${req.params.id}`)
        const user = await (0, userUtilityFunction_1.getUserFromId)(req.params.id);
        // console.log(`userVerifier -- existingUserId -- user : ${JSON.stringify(user)}`)
        if (user) {
            next();
        }
        else {
            throw new Error('ID is not valid');
        }
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
exports.existingUserId = existingUserId;
