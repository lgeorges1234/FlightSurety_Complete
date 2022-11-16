import bcrypt from 'bcryptjs';
import { User, UserStore } from '../../models/users';
import { userRoles, userStatus } from '../../helpers/enum';

const pepper = process.env.BCRYPT_PASSWORD as string;

const store = new UserStore();

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

  let adminUser: User;

  let catchedError: string;

  let createResult: User;
  let indexResult: User[] = [];
  let showResult: any;
  let authenticateResult: User;

  let userCreated: User;

  beforeAll(() => {
    adminUser = {
      email: 'JD@gmail.com',
      firstname: 'Johny',
      lastname: 'Depp',
      status: userStatus.ADMIN,
      roles: userRoles.OPERATOR,
      password_digest: 'Las-Vegas-Parano',
    };
  });
  afterAll( async () => {
    const listofCreatedUser = await store.index();
    for (const user of listofCreatedUser) {
      if (user.id != 1) {
        await store.delete(user.id as unknown as string)
      }
    }
  });
  it('create method should add a user', async () => {
    try {
      createResult = await store.create(adminUser);
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    const indexResult = await store.index();
    userCreated = indexResult[indexResult.length -1];

    expect(createResult.id).toEqual(userCreated.id);
    expect(createResult.firstname).toEqual(userCreated.firstname);
    expect(
      bcrypt.compareSync(
        adminUser.password_digest + pepper,
        createResult.password_digest as string
      )
    ).toBeTruthy;
  });

  it('index method should return a list', async () => {
    try {
      indexResult = await store.index();
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    expect(indexResult.length).toEqual(2);
    expect(indexResult[indexResult.length - 1]).toEqual(userCreated);
  });

  it('show method should return the correct user', async () => {
    try {
      showResult = await store.show(userCreated.id as unknown as string);
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    expect(showResult.email).toEqual(userCreated.email);
    expect(showResult.status).toEqual('admin');
    expect(
      bcrypt.compareSync(
        adminUser.password_digest + pepper,
        showResult.password_digest as string
      )
    ).toBeTruthy;
  });

  it('authenticate method should return an authenticated user', async () => {
    try {
      authenticateResult = await store.authenticate(adminUser);
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    expect(authenticateResult.email).toEqual(userCreated.email);
    expect(
      bcrypt.compareSync(
        adminUser.password_digest + pepper,
        authenticateResult.password_digest as string
      )
    ).toBeTruthy;
  });

  it('delete method should remove a user', async () => {
    try {
      await store.delete(`${userCreated.id}`);
    } catch (error: any) {
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

    interface usersStatusInterface {
      id: string;
      status_name: string;
    }

    const usersStatusArray: usersStatusInterface[] = [
      { id: '1', status_name: 'root' },
      { id: '2', status_name: 'admin' },
      { id: '3', status_name: 'disactiv' },
      { id: '4', status_name: 'activ' },
    ];
    let indexStatusResult: any;
    let catchedStatusError: string = '';

    it('index method should return a list', async () => {
      try {
        indexStatusResult = await store.indexStatus();
      } catch (error: any) {
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

    interface usersRolesInterface {
      id: string;
      roles_name: string;
    }

    const usersRolesArray: usersRolesInterface[] = [
      { id: '1', roles_name: 'operator' },
      { id: '2', roles_name: 'airline' },
      { id: '3', roles_name: 'client' },
      { id: '4', roles_name: 'guest' },
    ];
    let indexRolesResult: any;
    let catchedRolesError: string = '';

    it('index method should return a list', async () => {
      try {
        indexRolesResult = await store.indexRoles();
      } catch (error: any) {
        catchedRolesError = error.message;
        console.log(catchedRolesError);
      }
      expect(indexRolesResult.length).toEqual(4);
      expect(indexRolesResult).toEqual(usersRolesArray);
    });
  });
});
