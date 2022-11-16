"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const airlinesStore_1 = __importDefault(require("./handlers/airlinesStore"));
const usersStores_1 = __importDefault(require("./handlers/usersStores"));
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.get('/', (_req, res) => {
    res.send("Welcome to Airlines's API");
});
app.listen(8080, () => {
    console.log(`server started at localhost:${port}`);
});
(0, airlinesStore_1.default)(app);
(0, usersStores_1.default)(app);
exports.default = app;
