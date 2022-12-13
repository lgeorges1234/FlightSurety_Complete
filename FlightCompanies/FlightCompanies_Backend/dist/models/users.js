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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserStore = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var database_1 = __importDefault(require("../database"));
// import { userStatus, userRoles } from '../utils/enum';
var saltRounds = process.env.SALT_ROUNDS;
var pepper = process.env.BCRYPT_PASSWORD;
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, password_digest' +
                            ' FROM users' +
                            ' INNER JOIN status ON users.status = status.id' +
                            ' ORDER BY users.id';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        throw new Error("Could not retrieve users. Error: ".concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, password_digest FROM users' +
                            ' INNER JOIN status ON users.status = status.id' +
                            ' WHERE users.id=($1)' +
                            ' ORDER BY users.id';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Could not get user ".concat(id, ". Error: ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, hash, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'INSERT INTO users (firstname, lastname, email, status, password_digest) VALUES($1, $2, $3, $4, $5) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        hash = bcryptjs_1["default"].hashSync(user.password_digest + pepper, parseInt(saltRounds, 10));
                        return [4 /*yield*/, conn.query(sql, [
                                user.firstname,
                                user.lastname,
                                user.email,
                                user.status,
                                hash,
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Could not add new user. Error: ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, compareBcrypt, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT email, id, firstname, lastname, status, password_digest FROM users' +
                            ' WHERE email=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            compareBcrypt = bcryptjs_1["default"].compareSync(password + pepper, result.rows[0].password_digest);
                            if (compareBcrypt)
                                return [2 /*return*/, result.rows[0]];
                            throw new Error("Password of ".concat(email, " is not correct"));
                        }
                        throw new Error("No user for ".concat(email));
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not authenticate user. Error: ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ". Error: ").concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.indexStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM status';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Could not retrieve users status. Error: ".concat(error_6.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
