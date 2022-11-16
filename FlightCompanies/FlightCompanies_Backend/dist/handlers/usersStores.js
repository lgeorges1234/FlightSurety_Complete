"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userVerifier_1 = require("../middlewares/userVerifier");
const userInputsValidator_1 = require("../middlewares/userInputsValidator");
const userUtilityFunction_1 = require("../helpers/userUtilityFunction");
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.json(result);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const show = async (req, res) => {
    try {
        const result = await store.show(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const create = async (req, res) => {
    const userStatusFormated = await (0, userUtilityFunction_1.getStatusIdFromStatusName)('activ');
    const userRolesFormated = await (0, userUtilityFunction_1.getRolesIdFromRolesName)(req.body.roles);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        status: userStatusFormated,
        roles: userRolesFormated,
        password_digest: req.body.password_digest,
    };
    try {
        const newUser = await store.create(user);
        // console.log(`usersStores -- create -- newUser : ${JSON.stringify(newUser)}`)
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET, { expiresIn: '3600' });
        // console.log(`usersStores -- create -- token : ${token}`)
        res.json(token);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const destroy = async (req, res) => {
    try {
        const result = await store.delete(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const authenticate = async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        status: req.body.status,
        roles: req.body.roles,
        password_digest: req.body.password_digest,
    };
    try {
        // console.log(`userStores -- authenticate -- user ${JSON.stringify(user)}`)
        const authenticateUser = await store.authenticate(user);
        const token = jsonwebtoken_1.default.sign({ user: authenticateUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const indexStatus = async (req, res) => {
    try {
        const result = await store.indexStatus();
        res.json(result);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const indexRoles = async (req, res) => {
    try {
        const result = await store.indexRoles();
        res.json(result);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const createAdmin = async (req, res) => {
    const adminStatusFormated = await (0, userUtilityFunction_1.getStatusIdFromStatusName)('admin');
    // console.log(`usersStores -- createAdmin -- adminStatusFormated : ${JSON.stringify(adminStatusFormated)}`)
    // console.log(`usersStores -- createAdmin -- req.body.roles : ${JSON.stringify(req.body.roles)}`)
    const userRolesFormated = await (0, userUtilityFunction_1.getRolesIdFromRolesName)(req.body.roles);
    // console.log(`usersStores -- createAdmin -- userRolesFormated : ${JSON.stringify(userRolesFormated)}`)
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        status: adminStatusFormated,
        roles: userRolesFormated,
        password_digest: req.body.password_digest,
    };
    try {
        const newUser = await store.create(user);
        // console.log(`usersStores -- create -- newUser : ${JSON.stringify(newUser)}`)
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET, { expiresIn: '3600' });
        // console.log(`usersStores -- create -- token : ${token}`)
        res.json(token);
    }
    catch (error) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: error.message,
        });
    }
};
const usersRoutes = (app) => {
    // user path
    app.get('/users/:id', userVerifier_1.existingUserId, userVerifier_1.verifyAuthToken, userVerifier_1.callerIsOwnerOrAdmin, show);
    app.post('/users/register', userInputsValidator_1.userInputValidator, userVerifier_1.uniqueEmail, create);
    app.delete('/users/:id', userVerifier_1.verifyAuthToken, userVerifier_1.callerIsOwnerOrAdmin, userVerifier_1.existingUserId, destroy);
    app.post('/users/authenticate', userInputsValidator_1.authenticateInputValidator, userVerifier_1.existingEmail, authenticate);
    // admin path
    // the first (and only the first administrator account) will be created thanks to the initial root account
    app.post('/users', userVerifier_1.verifyAuthToken, userVerifier_1.callerIsRootorAdmin, userVerifier_1.callerIsRoot, userVerifier_1.uniqueEmail, userInputsValidator_1.userInputValidator, createAdmin);
    app.get('/users', userVerifier_1.verifyAuthToken, userVerifier_1.callerIsAdmin, index); // retun all users
    app.get('/status', userVerifier_1.verifyAuthToken, userVerifier_1.callerIsAdmin, indexStatus); // return all status
    app.get('/roles', userVerifier_1.verifyAuthToken, userVerifier_1.callerIsAdmin, indexRoles); // return all roles
};
/// middleware
// verifyAuthToken    Check if the user's token is valid
// callerIsXX         Check if the Json Web Token allowing the call is coming from a user of status XX
// existingUserId     Check if the requested id exists
// uniqueEmail        Check if the user's email does'nt already exist
// existingEmail      Check if the user's email is already registered
// userInputValidator Check if user's creation inputs respect applied rules
// authenticateInputValidator Check if user's authentication inputs respect applied rules
exports.default = usersRoutes;