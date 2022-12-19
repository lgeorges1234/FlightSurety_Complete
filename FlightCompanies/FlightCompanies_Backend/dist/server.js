"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var airlinesStore_1 = __importDefault(require("./handlers/airlinesStore"));
var usersStores_1 = __importDefault(require("./handlers/usersStores"));
var airportsStore_1 = __importDefault(require("./handlers/airportsStore"));
var authentication_middlewares_1 = require("./middlewares/authentication.middlewares");
var app = (0, express_1["default"])();
var port = 8080;
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])({ origin: true, credentials: true }));
app.use(authentication_middlewares_1.userAuthentication);
app.get('/', function (_req, res) {
    res.send("Welcome to Airlines's API");
});
(0, usersStores_1["default"])(app);
(0, airportsStore_1["default"])(app);
(0, airlinesStore_1["default"])(app);
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
exports["default"] = app;
