"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const airlines_1 = require("../models/airlines");
const store = new airlines_1.AirlineStore();
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.json(result);
    }
    catch (error) {
        res.status(401).json(`${error}`);
    }
};
const show = async (req, res) => {
    try {
        const result = await store.show(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(401).json(`${error}`);
    }
};
const create = async (req, res) => {
    const airline = {
        name: req.body.name,
        country_id: req.body.countryId,
    };
    try {
        const result = await store.create(airline);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}${airline}`);
    }
};
const destroy = async (req, res) => {
    try {
        const result = await store.delete(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
};
const airlinesRoutes = (app) => {
    app.get('/airlines', userMiddlewares_1.verifyAuthToken, index);
    app.get('/airlines/:id', userMiddlewares_1.verifyAuthToken, show);
    app.post('/airlines', create);
    app.delete('/airlines/:id', userMiddlewares_1.verifyAuthToken, destroy);
};
exports.default = airlinesRoutes;
