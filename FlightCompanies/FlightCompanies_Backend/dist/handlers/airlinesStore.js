"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index = async (_req, res) => {
    try {
        res.send('airlines list...');
    }
    catch (error) {
        res.status(401).json(`${error}`);
    }
};
const airlinesRoutes = (app) => {
    app.get('/airlines', index);
};
exports.default = airlinesRoutes;
