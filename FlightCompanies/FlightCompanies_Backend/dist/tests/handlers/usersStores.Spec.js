"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const { BCRYPT_PASSWORD, ROOT_EMAIL, ROOT_FIRSTNAME, ROOT_LASTNAME, ROOT_STATUS, ROOT_ROLES, ROOT_PASSWORD, } = process.env;
let rootUser;
let rootUserWithFalsyPwd;
let rootUserWithMalformedEmail;
let adminUser;
let adminUser2;
let adminUserRoles;
let activUser;
let weakPasswordAdmin;
let weakPasswordUser;
let adminUserCreated;
let activUserCreated;
// let indexResponse: supertest.Response;
let rootToken;
let adminToken;
let activToken;
describe('usersRoute', () => {
    beforeAll(() => {
        rootUser = {
            email: ROOT_EMAIL,
            firstname: ROOT_FIRSTNAME,
            lastname: ROOT_LASTNAME,
            status: ROOT_STATUS,
            roles: ROOT_ROLES,
            password_digest: ROOT_PASSWORD,
        };
        rootUserWithFalsyPwd = {
            email: ROOT_EMAIL,
            firstname: ROOT_FIRSTNAME,
            lastname: ROOT_LASTNAME,
            status: ROOT_STATUS,
            roles: ROOT_ROLES,
            password_digest: 'byngaJ-rarbov-sijsa6',
        };
        rootUserWithMalformedEmail = {
            email: "root@gmail",
            firstname: ROOT_FIRSTNAME,
            lastname: ROOT_LASTNAME,
            status: ROOT_STATUS,
            roles: ROOT_ROLES,
            password_digest: ROOT_PASSWORD,
        };
        adminUser = {
            email: 'GC@gmail.com',
            firstname: 'Georges',
            lastname: 'Clooney',
            status: "admin",
            roles: "operator",
            password_digest: 'byngaJ-rarbov-sijsa6',
        };
        adminUser2 = {
            email: 'DW@gmail.com',
            firstname: 'Denzel',
            lastname: 'Washington',
            status: "admin",
            roles: "operator",
            password_digest: 'byngaJ-sijsa6-rarbov',
        };
        adminUserRoles = {
            email: 'DC@gmail.com',
            firstname: 'Daniel',
            lastname: 'Craig',
            status: "admin",
            roles: "operator",
            password_digest: 'byngaJ-sijsa6-rarbov',
        };
        weakPasswordAdmin = {
            email: 'AD@gmail.com',
            firstname: 'Alain',
            lastname: 'Delon',
            status: "admin",
            roles: "operator",
            password_digest: 'xoBpow-bacmos-dozje',
        };
        activUser = {
            email: 'BP@gmail.com',
            firstname: 'Brad',
            lastname: 'Pitt',
            status: "activ",
            roles: "client",
            password_digest: 'xoBpow-bacmos-dozje0',
        };
        weakPasswordUser = {
            email: 'AD@gmail.com',
            firstname: 'Alain',
            lastname: 'Delon',
            status: "activ",
            roles: "operator",
            password_digest: 'Password',
        };
    });
    afterAll(async () => {
        const listofCreatedUser = await request.get('/users')
            .set({
            Authorization: `bearer ${adminToken}`,
            'Content-Type': 'application/json',
        });
        for (const user of listofCreatedUser.body) {
            if (user.id != 1) {
                await request
                    .delete(`/users/${user.id}`)
                    .set({
                    Authorization: `bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                });
            }
        }
    });
    describe('AUTHENTICATE /users/authenticate', () => {
        it('should return an error for a non existing user', async () => {
            const authenticateResponse = await request
                .post('/users/authenticate')
                .send(adminUser);
            expect(authenticateResponse.status).toBe(412);
            expect(authenticateResponse.body.data).toEqual("Email not registered - access denied");
        });
        it('should return an error for an existing user with wrong password', async () => {
            const authenticateResponse = await request
                .post('/users/authenticate')
                .send(rootUserWithFalsyPwd);
            expect(authenticateResponse.status).toBe(412);
            expect(authenticateResponse.body.data).toEqual("Could not authenticate user. Error: Error: Password of root@root.com is not correct");
        });
        it('should return an error for an malformed input email', async () => {
            const authenticateResponse = await request
                .post('/users/authenticate')
                .send(rootUserWithMalformedEmail);
            expect(authenticateResponse.status).toBe(412);
            expect(authenticateResponse.body.data.errors.email[0]).toEqual('The email format is invalid.');
        });
        it('should return a token', async () => {
            const authenticateResponse = await request
                .post('/users/authenticate')
                .send(rootUser);
            rootToken = authenticateResponse.body;
            expect(authenticateResponse.status).toBe(200);
            expect(authenticateResponse.body).toBeTruthy;
        });
    });
    describe('CREATE POST /users', () => {
        it('should return an admin token', async () => {
            const createResponse = await request
                .post('/users')
                .send(adminUser)
                .set('Accept', 'application/json')
                .set({
                Authorization: `bearer ${rootToken}`,
                'Content-Type': 'application/json',
            });
            adminToken = createResponse.body;
            const indexResponse = await request.get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            adminUserCreated = indexResponse.body[indexResponse.body.length - 1];
            expect(createResponse.status).toBe(200);
            expect(createResponse.body).toBeTruthy;
        });
        it('email already registered should return an error', async () => {
            const createResponse = await request
                .post('/users')
                .send(adminUser)
                .set('Accept', 'application/json')
                .set({
                Authorization: `bearer ${rootToken}`,
                'Content-Type': 'application/json',
            });
            expect(createResponse.status).toBe(412);
            expect(createResponse.body.message).toEqual('Validation failed');
            expect(createResponse.body.data).toEqual("Email already registered");
        });
        it('user with weak password should return an error', async () => {
            const createResponse = await request
                .post('/users')
                .send(weakPasswordAdmin)
                .set('Accept', 'application/json')
                .set({
                Authorization: `bearer ${rootToken}`,
                'Content-Type': 'application/json',
            });
            expect(createResponse.status).toBe(412);
            expect(createResponse.body.message).toEqual('Validation failed');
            expect(createResponse.body.data.errors.password_digest[0]).toEqual('Password is not strong enough');
        });
    });
    describe('CREATE POST /users/register', () => {
        it('should return an active token', async () => {
            const createResponse = await request
                .post('/users/register')
                .send(activUser)
                .set('Accept', 'application/json');
            activToken = createResponse.body;
            const indexResponse = await request.get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            activUserCreated = indexResponse.body[indexResponse.body.length - 1];
            expect(createResponse.status).toBe(200);
            expect(createResponse.body).toBeTruthy;
        });
        it('email already registered should return an error', async () => {
            const createResponse = await request
                .post('/users/register')
                .send(activUser)
                .set('Accept', 'application/json');
            expect(createResponse.status).toBe(412);
            expect(createResponse.body.message).toEqual('Validation failed');
            expect(createResponse.body.data).toEqual("Email already registered");
        });
        it('user with weak password should return an error', async () => {
            const createResponse = await request
                .post('/users/register')
                .send(weakPasswordUser)
                .set('Accept', 'application/json');
            expect(createResponse.status).toBe(412);
            expect(createResponse.body.message).toEqual('Validation failed');
            expect(createResponse.body.data.errors.password_digest[0]).toEqual('Password is not strong enough');
        });
    });
    describe('EDIT GET /users', () => {
        it('no token should return an error', async () => {
            const indexResponse = await request.get('/users');
            expect(indexResponse.status).toBe(412);
            expect(indexResponse.body.message).toEqual('Validation failed');
            expect(indexResponse.body.data).toEqual("token is not valid, access Denied");
        });
        it('no admin status should return an error', async () => {
            const indexResponse = await request.get('/users')
                .set({
                Authorization: `bearer ${activToken}`,
                'Content-Type': 'application/json',
            });
            expect(indexResponse.status).toBe(412);
            expect(indexResponse.body.message).toEqual('Validation failed');
            expect(indexResponse.body.data).toEqual("caller must be administrator");
        });
        it('admin token should return all created users', async () => {
            const indexResponse = await request.get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            expect(indexResponse.status).toBe(200);
            expect(indexResponse.body.length).toEqual(3);
        });
    });
    describe('SHOW GET /users/{id}', () => {
        it('wrong id should return an error', async () => {
            const showResponse = await request
                .get(`/users/56`)
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            expect(showResponse.status).toBe(412);
            expect(showResponse.body.message).toEqual('Validation failed');
            expect(showResponse.body.data).toEqual("ID is not valid");
        });
        it('no token should return an error', async () => {
            const showResponse = await request
                .get(`/users/${activUserCreated.id}`);
            expect(showResponse.status).toBe(412);
            expect(showResponse.body.message).toEqual('Validation failed');
            expect(showResponse.body.data).toEqual("token is not valid, access Denied");
        });
        it('admin token should return the user', async () => {
            const showResponse = await request
                .get(`/users/${activUserCreated.id}`)
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            expect(showResponse.status).toBe(200);
            expect(showResponse.body).toEqual(activUserCreated);
            expect(bcryptjs_1.default.compareSync(adminUser.password_digest + BCRYPT_PASSWORD, showResponse.body.password_digest)).toBeTruthy;
        });
        it('owner token should return the user', async () => {
            const showResponse = await request
                .get(`/users/${activUserCreated.id}`)
                .set({
                Authorization: `bearer ${activToken}`,
                'Content-Type': 'application/json',
            });
            expect(showResponse.status).toBe(200);
            expect(showResponse.body).toEqual(activUserCreated);
            expect(bcryptjs_1.default.compareSync(adminUser.password_digest + BCRYPT_PASSWORD, showResponse.body.password_digest)).toBeTruthy;
        });
    });
    describe('DESTROY DELETE /users/{id}', () => {
        it('wrong id should return an error', async () => {
            const deleteResponse = await request
                .delete(`/users/56`)
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            const indexDeletedResponse = await request
                .get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            expect(deleteResponse.status).toBe(412);
            expect(deleteResponse.body.message).toEqual('Validation failed');
            expect(deleteResponse.body.data).toEqual("ID is not valid");
            expect(indexDeletedResponse.body.length).toEqual(3);
        });
        it('no token should return an error', async () => {
            const deleteResponse = await request
                .delete(`/users/56`);
            const indexDeletedResponse = await request
                .get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            expect(deleteResponse.status).toBe(412);
            expect(deleteResponse.body.message).toEqual('Validation failed');
            expect(deleteResponse.body.data).toEqual("token is not valid, access Denied");
            expect(indexDeletedResponse.body.length).toEqual(3);
        });
        it('correct id should delete the user', async () => {
            const deleteResponse = await request
                .delete(`/users/${activUserCreated.id}`)
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            const indexDeletedResponse = await request
                .get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            expect(deleteResponse.status).toBe(200);
            expect(indexDeletedResponse.body.length).toEqual(2);
        });
    });
    describe('STATUS route', () => {
        let userId;
        // let userStatus: any;
        let indexAdminToken;
        beforeAll(async () => {
            const createAdminStatusResponse = await request
                .post('/users')
                .send(adminUser2)
                .set('Accept', 'application/json')
                .set({
                Authorization: `bearer ${rootToken}`,
                'Content-Type': 'application/json',
            });
            indexAdminToken = createAdminStatusResponse.body;
        });
        afterAll(async () => {
            const listofCreatedUser = await request.get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            for (const user of listofCreatedUser.body) {
                if (user.id != 1) {
                    await request
                        .delete(`/users/${user.id}`)
                        .set({
                        Authorization: `bearer ${adminToken}`,
                        'Content-Type': 'application/json',
                    });
                }
            }
        });
        describe('INDEXSTATUS GET /users/status', () => {
            it('should return a list of all available status', async () => {
                const usersStatusArray = [
                    { id: '1', status_name: 'root' },
                    { id: '2', status_name: 'admin' },
                    { id: '3', status_name: 'disactiv' },
                    { id: '4', status_name: 'activ' }
                ];
                const indexStatusResponse = await request
                    .get(`/status`)
                    .set({
                    Authorization: `bearer ${indexAdminToken}`,
                    'Content-Type': 'application/json',
                });
                expect(indexStatusResponse.body).toEqual(usersStatusArray);
            });
        });
    });
    describe('ROLES route', () => {
        let indexAdminToken;
        beforeAll(async () => {
            const createAdminRolesResponse = await request
                .post('/users')
                .send(adminUserRoles)
                .set('Accept', 'application/json')
                .set({
                Authorization: `bearer ${rootToken}`,
                'Content-Type': 'application/json',
            });
            indexAdminToken = createAdminRolesResponse.body;
        });
        afterAll(async () => {
            const listofCreatedUser = await request.get('/users')
                .set({
                Authorization: `bearer ${adminToken}`,
                'Content-Type': 'application/json',
            });
            for (const user of listofCreatedUser.body) {
                if (user.id != 1) {
                    await request
                        .delete(`/users/${user.id}`)
                        .set({
                        Authorization: `bearer ${adminToken}`,
                        'Content-Type': 'application/json',
                    });
                }
            }
        });
        describe('INDEXROLES GET /roles', () => {
            it('should return a list of all available roles', async () => {
                ;
                const usersRolesArray = [
                    { id: '1', roles_name: 'operator' },
                    { id: '2', roles_name: 'airline' },
                    { id: '3', roles_name: 'client' },
                    { id: '4', roles_name: 'guest' },
                ];
                const indexRolesResponse = await request
                    .get(`/roles`)
                    .set({
                    Authorization: `bearer ${indexAdminToken}`,
                    'Content-Type': 'application/json',
                });
                expect(indexRolesResponse.body).toEqual(usersRolesArray);
            });
        });
    });
});
