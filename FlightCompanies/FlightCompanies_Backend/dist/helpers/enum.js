"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoles = exports.userStatus = void 0;
var userStatus;
(function (userStatus) {
    userStatus[userStatus["ROOT"] = 1] = "ROOT";
    userStatus[userStatus["ADMIN"] = 2] = "ADMIN";
    userStatus[userStatus["DISACTIV"] = 3] = "DISACTIV";
    userStatus[userStatus["ACTIV"] = 4] = "ACTIV";
})(userStatus = exports.userStatus || (exports.userStatus = {}));
var userRoles;
(function (userRoles) {
    userRoles[userRoles["OPERATOR"] = 1] = "OPERATOR";
    userRoles[userRoles["AIRLINE"] = 2] = "AIRLINE";
    userRoles[userRoles["CLIENT"] = 3] = "CLIENT";
    userRoles[userRoles["GUEST"] = 4] = "GUEST";
})(userRoles = exports.userRoles || (exports.userRoles = {}));
