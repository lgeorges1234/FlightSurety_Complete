"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = require("../../models/users");
const enum_1 = require("../../helpers/enum");
const pepper = process.env.BCRYPT_PASSWORD;
const store = new users_1.UserStore();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    let adminUser;
    let catchedError;
    let createResult;
    let indexResult = [];
    let showResult;
    let authenticateResult;
    let userCreated;
    beforeAll(() => {
        adminUser = {
            email: 'JD@gmail.com',
            firstname: 'Johny',
            lastname: 'Depp',
            status: enum_1.userStatus.ADMIN,
            roles: enum_1.userRoles.OPERATOR,
            password_digest: 'Las-Vegas-Parano',
        };
    });
    afterAll(async () => {
        const listofCreatedUser = await store.index();
        for (const user of listofCreatedUser) {
            if (user.id != 1) {
                await store.delete(user.id);
            }
        }
    });
    it('create method should add a user', async () => {
        try {
            createResult = await store.create(adminUser);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        const indexResult = await store.index();
        userCreated = indexResult[indexResult.length - 1];
        expect(createResult.id).toEqual(userCreated.id);
        expect(createResult.firstname).toEqual(userCreated.firstname);
        expect(bcryptjs_1.default.compareSync(adminUser.password_digest + pepper, createResult.password_digest)).toBeTruthy;
    });
    it('index method should return a list', async () => {
        try {
            indexResult = await store.index();
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(indexResult.length).toEqual(2);
        expect(indexResult[indexResult.length - 1]).toEqual(userCreated);
    });
    it('show method should return the correct user', async () => {
        try {
            showResult = await store.show(userCreated.id);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(showResult.email).toEqual(userCreated.email);
        expect(showResult.status).toEqual('admin');
        expect(bcryptjs_1.default.compareSync(adminUser.password_digest + pepper, showResult.password_digest)).toBeTruthy;
    });
    it('authenticate method should return an authenticated user', async () => {
        try {
            authenticateResult = await store.authenticate(adminUser);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(authenticateResult.email).toEqual(userCreated.email);
        expect(bcryptjs_1.default.compareSync(adminUser.password_digest + pepper, authenticateResult.password_digest)).toBeTruthy;
    });
    it('delete method should remove a user', async () => {
        try {
            await store.delete(`${userCreated.id}`);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        const indexResult = await store.index();
        expect(indexResult.length).toEqual(1);
    });
    /// user status tests
    describe('User status Model', () => {
        it('should have an index method', () => {
            expect(store.indexStatus).toBeDefined();
        });
        const usersStatusArray = [
            { id: '1', status_name: 'root' },
            { id: '2', status_name: 'admin' },
            { id: '3', status_name: 'disactiv' },
            { id: '4', status_name: 'activ' },
        ];
        let indexStatusResult;
        let catchedStatusError = '';
        it('index method should return a list', async () => {
            try {
                indexStatusResult = await store.indexStatus();
            }
            catch (error) {
                catchedStatusError = error.message;
                console.log(catchedStatusError);
            }
            expect(indexStatusResult.length).toEqual(4);
            expect(indexStatusResult).toEqual(usersStatusArray);
        });
    });
    /// user roles tests
    describe('User roles Model', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        const usersRolesArray = [
            { id: '1', roles_name: 'operator' },
            { id: '2', roles_name: 'airline' },
            { id: '3', roles_name: 'client' },
            { id: '4', roles_name: 'guest' },
        ];
        let indexRolesResult;
        let catchedRolesError = '';
        it('index method should return a list', async () => {
            try {
                indexRolesResult = await store.indexRoles();
            }
            catch (error) {
                catchedRolesError = error.message;
                console.log(catchedRolesError);
            }
            expect(indexRolesResult.length).toEqual(4);
            expect(indexRolesResult).toEqual(usersRolesArray);
        });
    });
});
