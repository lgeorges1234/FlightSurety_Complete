"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const index = async (_req, res) => {
    const result = await store.index();
    res.json(result);
};
const show = async (req, res) => {
    const result = await store.show(req.params.id);
    res.json(result);
};
const users_rolesRoutes = (app) => {
    app.get('/users/roles', index);
    app.get('/users/:id/roles', show);
};
exports.default = users_rolesRoutes;
