import { userRoles, userStatus } from '../../helpers/enum';
import { Airline, Owner, AirlineStore } from '../../models/airlines';
import { User, UserStore } from '../../models/users';


const store = new AirlineStore();
const userStore = new UserStore();


describe('Airline Model', () => {
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

  let adminUserResult: User;
  let firstAirline: Airline;
  let firstAirlineResult: Airline;


  let catchedError: string;

  let createFirstAirlineResult: Airline;
  let indexResult: Airline[] = [];
  let showResult: any;

  let airlineCreated: Airline;

  let createOwnerResult: Owner;

  beforeAll(async () => {
    const adminUser = {
      email: 'CE@gmail.com',
      firstname: 'Clint',
      lastname: 'Eastwood',
      status: userStatus.ADMIN,
      roles: userRoles.AIRLINE,
      password_digest: 'Dirty-Harry',
    };
    adminUserResult = await userStore.create(adminUser)
    // console.log(`airlines.Spec -- beforeAll -- adminUserResult : ${JSON.stringify(adminUserResult)}`)
    firstAirline = {
      name: 'Easyjet',
      country_id: 'GB',
    }
    firstAirlineResult = {
      id: 1,
      name: 'Easyjet',
      country_id: 'GB',
    }
  });
  afterAll( async () => {
    const listofCreatedUser = await userStore.index();
    for (const user of listofCreatedUser) {
      if (user.id != 1) {
        await userStore.delete(user.id as unknown as string)
      }
    }
  });
  it('create method should add an airline', async () => {
    try {
      createFirstAirlineResult = await store.create(firstAirline);
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    const indexResult = await store.index();
    airlineCreated = indexResult[indexResult.length -1];
    expect(createFirstAirlineResult).toEqual(firstAirlineResult);
  });

  it('index method should return a list', async () => {
    try {
      indexResult = await store.index();
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    expect(indexResult.length).toEqual(1);
    expect(indexResult[indexResult.length - 1]).toEqual(airlineCreated);
  });

  it('show method should return the correct airline', async () => {
    try {
      showResult = await store.show(airlineCreated.id as unknown as string);
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    expect(showResult).toEqual(airlineCreated);
  });

  it('delete method should remove an airline', async () => {
    try {
      await store.delete(`${airlineCreated.id}`);
    } catch (error: any) {
      catchedError = error.message;
      console.log(catchedError);
    }
    const indexResult = await store.index();
    expect(indexResult.length).toEqual(0);
  });

  describe('airlineOwners Model', () => {
    let secondAirline: Airline;
    let secondAirlineResult: Airline;
    let createSecondAirlineResult: Airline;
    let ownerSecondAirline: Owner;
    let ownerSecondAirlineResult: any;
    let deleteOwnerResult: any;
    beforeAll(async () => {
      secondAirline = {
        name: 'Easyjet',
        country_id: 'GB',
      };
      createSecondAirlineResult = await store.create(secondAirline);
      ownerSecondAirline = {
        airline_id: createSecondAirlineResult.id as unknown as number,
        user_id: adminUserResult.id as unknown as number
      };
      ownerSecondAirlineResult = {
        id:1,
        airline_id: `${createSecondAirlineResult.id}`,
        user_id: `${adminUserResult.id}`
      }
    });
    it('createOwner method should add a User to an airline', async () => {
      try {
        createOwnerResult = await store.createOwner(createSecondAirlineResult.id as unknown as string, adminUserResult.id as unknown as string);
      } catch (error: any) {
        catchedError = error.message;
        console.log(catchedError);
      }
      expect(createOwnerResult).toEqual(ownerSecondAirlineResult);
    });
    it('indexOwnersFromAirline method should returns owners from an airline', async() => {
      let indexOwnersFromAirlineResult: any;
      try {
        indexOwnersFromAirlineResult = await store.indexOwnersFromAirline(`${createSecondAirlineResult.id}`)
      } catch (error: any) {
        catchedError = error.message;
        console.log(catchedError);
      }
      expect(indexOwnersFromAirlineResult[0]).toEqual(adminUserResult);
    });
    it("showAirlineOwership method should returns airlines from user's ownership", async() => {
      let showAirlineOwnershipResult: any;
      try {
        showAirlineOwnershipResult = await store.showAirlineOwnership(`${adminUserResult.id}`)
      } catch (error: any) {
        catchedError = error.message;
        console.log(catchedError);
      }
      expect(showAirlineOwnershipResult[0].name).toEqual(secondAirline.name);
    });
    it("removeOwner method should remove a user from the airline's owners", async () => {
      try {
        deleteOwnerResult = await store.removeOwner(createOwnerResult.airline_id as unknown as string, createOwnerResult.user_id as unknown as string);
      } catch (error: any) {
        catchedError = error.message;
        console.log(catchedError);
      }
    })
  })

});
