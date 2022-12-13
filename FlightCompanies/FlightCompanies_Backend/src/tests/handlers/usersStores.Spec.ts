import supertest from "supertest";
import bcrypt from "bcryptjs";
import app from "../../server";
import { User } from "../../models/users";


const request = supertest(app);

const {
  BCRYPT_PASSWORD,
  ROOT_EMAIL,
  ROOT_FIRSTNAME,
  ROOT_LASTNAME,
  ROOT_STATUS,
  ROOT_PASSWORD,
} = process.env;

interface userInterface {
  email: string;
  id?: number;
  firstname: string;
  lastname: string;
  status: string;
  password_digest: string;
}

let rootUser: userInterface;
let rootUserWithFalsyPwd: userInterface;
let rootUserWithMalformedEmail : userInterface;
let adminUser: userInterface;
let adminUser2: userInterface;
let adminUserRoles: userInterface;
let activUser: userInterface;
let weakPasswordAdmin: userInterface;
let weakPasswordUser: userInterface;

let adminUserCreated: User;
let activUserCreated: User;

// let indexResponse: supertest.Response;
let rootToken: string;
let adminToken: string;
let activToken: string;



describe('usersRoute', () => {
    beforeAll(() => {
      rootUser = {
        email: ROOT_EMAIL as string,
        firstname: ROOT_FIRSTNAME as string,
        lastname: ROOT_LASTNAME as string,
        status: ROOT_STATUS as string,
        password_digest: ROOT_PASSWORD as string,
      };
      rootUserWithFalsyPwd = {
        email: ROOT_EMAIL as string,
        firstname: ROOT_FIRSTNAME as string,
        lastname: ROOT_LASTNAME as string,
        status: ROOT_STATUS as string,
        password_digest: 'byngaJ-rarbov-sijsa6',
      };
      rootUserWithMalformedEmail = {
        email: "root@gmail",
        firstname: ROOT_FIRSTNAME as string,
        lastname: ROOT_LASTNAME as string,
        status: ROOT_STATUS as string,
        password_digest: ROOT_PASSWORD as string,
      };
      adminUser = {
          email: 'GC@gmail.com',
          firstname: 'Georges',
          lastname: 'Clooney',
          status: "admin",
          password_digest: 'byngaJ-rarbov-sijsa6',
      };
      adminUser2 = {
        email: 'DW@gmail.com',
        firstname: 'Denzel',
        lastname: 'Washington',
        status: "admin",
        password_digest: 'byngaJ-sijsa6-rarbov',
      };
      adminUserRoles = {
        email: 'DC@gmail.com',
        firstname: 'Daniel',
        lastname: 'Craig',
        status: "admin",
        password_digest: 'byngaJ-sijsa6-rarbov',
    };
      weakPasswordAdmin = {
        email: 'AD@gmail.com',
        firstname: 'Alain',
        lastname: 'Delon',
        status: "admin",
        password_digest: 'xoBpow-bacmos-dozje',
      };
      activUser = {
        email: 'BP@gmail.com',
        firstname: 'Brad',
        lastname: 'Pitt',
        status: "activ",
        password_digest: 'xoBpow-bacmos-dozje0',
      };
      weakPasswordUser = {
        email: 'AD@gmail.com',
        firstname: 'Alain',
        lastname: 'Delon',
        status: "activ",
        password_digest: 'Password',
      };
    });
    afterAll( async () => {
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
    describe('AUTHENTICATE /login', () => {
      it('should return an error for a non existing user', async () => {
        const authenticateResponse = await request
          .post('/login')
          .send(adminUser);
        expect(authenticateResponse.status).toBe(412);
        expect(authenticateResponse.body.data).toEqual("Email not registered - access denied");
      });
      it('should return an error for an existing user with wrong password', async () => {
        const authenticateResponse = await request
          .post('/login')
          .send(rootUserWithFalsyPwd);
        expect(authenticateResponse.status).toBe(412);
        expect(authenticateResponse.body.data).toEqual("Could not authenticate user. Error: Error: Password of root@root.com is not correct");
      });
      it('should return an error for an malformed input email', async () => {
        const authenticateResponse = await request
          .post('/login')
          .send(rootUserWithMalformedEmail);
        expect(authenticateResponse.status).toBe(412);
        expect(authenticateResponse.body.data.errors.email[0]).toEqual('The email format is invalid.');
      });
      it('should return a token', async () => {
        const authenticateResponse = await request
          .post('/login')
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
        adminUserCreated = indexResponse.body[indexResponse.body.length -1];
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
        expect(createResponse.body.data.errors.password_digest[0]).toEqual( 'Password is not strong enough');
      });
    });


    describe('CREATE POST /signup', () => {
      it('should return an active token', async () => {
        const createResponse = await request
          .post('/signup')
          .send(activUser)
          .set('Accept', 'application/json');
        activToken = createResponse.body;
        const indexResponse = await request.get('/users')
        .set({
          Authorization: `bearer ${adminToken}`,
          'Content-Type': 'application/json',
        });
        activUserCreated = indexResponse.body[indexResponse.body.length -1];
        expect(createResponse.status).toBe(200);
        expect(createResponse.body).toBeTruthy;
      });
      it('email already registered should return an error', async () => {
        const createResponse = await request
          .post('/signup')
          .send(activUser)
          .set('Accept', 'application/json');
        expect(createResponse.status).toBe(412);
        expect(createResponse.body.message).toEqual('Validation failed');
        expect(createResponse.body.data).toEqual("Email already registered");
      });
      it('user with weak password should return an error', async () => {
        const createResponse = await request
          .post('/signup')
          .send(weakPasswordUser)
          .set('Accept', 'application/json');
        expect(createResponse.status).toBe(412);
        expect(createResponse.body.message).toEqual('Validation failed');
        expect(createResponse.body.data.errors.password_digest[0]).toEqual( 'Password is not strong enough');
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
        expect(showResponse.body.message).toEqual(
          'Validation failed');
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
        expect(
          bcrypt.compareSync(
            adminUser.password_digest + BCRYPT_PASSWORD,
            showResponse.body.password_digest as string
          )
        ).toBeTruthy;
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
        expect(
          bcrypt.compareSync(
            adminUser.password_digest + BCRYPT_PASSWORD,
            showResponse.body.password_digest as string
          )
        ).toBeTruthy;
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
      })
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
      })
    });
    describe('STATUS route', () => {
      let userId: any;
      // let userStatus: any;
      let indexAdminToken: any;
      beforeAll( async() => {
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
      afterAll( async () => {
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
            interface usersStatusInterface {
              id: string;
              status_name: string;
            }
            const usersStatusArray: usersStatusInterface[] = [
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
      let indexAdminToken: any;
      beforeAll( async() => {
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
      afterAll( async () => {
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
          interface usersRolesInterface {
            id: string;
            roles_name: string;
          };
          const usersRolesArray: usersRolesInterface[] = [
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

