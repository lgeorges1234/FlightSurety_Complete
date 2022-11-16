"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolesIdFromRolesName = exports.getStatusIdFromStatusName = exports.getStatusNameFromStatusId = exports.getUserFromId = exports.getUserFromEmail = void 0;
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const getUserFromEmail = async (email) => {
    // console.log(`userFonctions -- getUserFromEmail -- email : ${email}`)
    const results = await store.index();
    // console.log(`userFonctions -- getUserFromEmail -- results : ${JSON.stringify(results)}`)
    const user = results.filter(user => user.email == `${email}`);
    // console.log(`userFonctions -- getUserFromEmail -- user : ${JSON.stringify(user)}`)
    return user[0];
};
exports.getUserFromEmail = getUserFromEmail;
const getUserFromId = async (id) => {
    const results = await store.show(id);
    // console.log(`userFonctions -- getUserFromId -- results : ${JSON.stringify(results)}`)
    return results;
};
exports.getUserFromId = getUserFromId;
const getStatusNameFromStatusId = async (userStatusId) => {
    try {
        // console.log(`userFonctions -- getStatusIdFromStatusName -- userStatusId : ${JSON.stringify(userStatusId)}`)
        const statusAvailable = await store.indexStatus();
        for (let status of statusAvailable) {
            if (userStatusId == status.id) {
                // console.log(`userFonctions -- getStatusIdFromStatusName -- status : ${JSON.stringify(status)}`)
                return status.status_name;
            }
        }
        throw new Error("Status id is not valid");
    }
    catch (error) {
        return error;
    }
};
exports.getStatusNameFromStatusId = getStatusNameFromStatusId;
const getStatusIdFromStatusName = async (userStatusName) => {
    try {
        // console.log(`userFonctions -- getStatusIdFromStatusName -- userStatus : ${JSON.stringify(userStatus)}`)
        const statusAvailable = await store.indexStatus();
        for (let status of statusAvailable) {
            if (userStatusName.toLowerCase() == status.status_name) {
                // console.log(`userFonctions -- getStatusIdFromStatusName -- status : ${JSON.stringify(status)}`)
                return status.id;
            }
        }
        throw new Error("Status name is not valid");
    }
    catch (error) {
        return error;
    }
};
exports.getStatusIdFromStatusName = getStatusIdFromStatusName;
const getRolesIdFromRolesName = async (userRoles) => {
    try {
        // console.log(`userFonctions -- getRolesIdFromRolesName -- userRoles : ${JSON.stringify(userRoles)}`)
        const rolesAvailable = await store.indexRoles();
        for (let roles of rolesAvailable) {
            if (userRoles.toLowerCase() == roles.roles_name) {
                // console.log(`userFonctions -- getRolesIdFromRolesName -- status : ${JSON.stringify(roles)}`)
                return roles.id;
            }
        }
        throw new Error("Status is not valid");
    }
    catch (error) {
        return error;
    }
};
exports.getRolesIdFromRolesName = getRolesIdFromRolesName;
