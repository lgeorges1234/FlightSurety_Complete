"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = exports.createSessionToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createSessionToken(user) {
    return jsonwebtoken_1.default.sign({
        roles: user.status
    }, process.env.TOKEN_SECRET, {
        expiresIn: 7200,
        subject: user.id?.toString()
    });
}
exports.createSessionToken = createSessionToken;
;
async function decodeJwt(token) {
    const payload = await jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    console.log("Decode JWT Payload", payload);
    return payload;
}
exports.decodeJwt = decodeJwt;
