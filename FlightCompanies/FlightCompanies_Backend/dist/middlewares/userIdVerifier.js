"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserId = void 0;
const users_1 = require("../models/users");
const verifyUserId = async (req, res, next) => {
    const store = new users_1.UserStore();
    try {
        const results = await store.index();
        const existingId = results.filter((result) => result.id ===
            parseInt(req.params.id, 10));
        if (existingId.length) {
            next();
        }
        else {
            throw new Error();
        }
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
exports.verifyUserId = verifyUserId;
