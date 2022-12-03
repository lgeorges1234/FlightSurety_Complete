"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../../helpers/enum");
const airlines_1 = require("../../models/airlines");
const users_1 = require("../../models/users");
const store = new airlines_1.AirlineStore();
const userStore = new users_1.UserStore();
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
    let adminUserResult;
    let firstAirline;
    let firstAirlineResult;
    let catchedError;
    let createFirstAirlineResult;
    let indexResult = [];
    let showResult;
    let airlineCreated;
    let createOwnerResult;
    beforeAll(async () => {
        const adminUser = {
            email: 'CE@gmail.com',
            firstname: 'Clint',
            lastname: 'Eastwood',
            status: enum_1.userStatus.ADMIN,
            roles: enum_1.userRoles.AIRLINE,
            password_digest: 'Dirty-Harry',
        };
        adminUserResult = await userStore.create(adminUser);
        // console.log(`airlines.Spec -- beforeAll -- adminUserResult : ${JSON.stringify(adminUserResult)}`)
        firstAirline = {
            name: 'Easyjet',
            country_id: 'GB',
        };
        firstAirlineResult = {
            id: 1,
            name: 'Easyjet',
            country_id: 'GB',
        };
    });
    afterAll(async () => {
        const listofCreatedUser = await userStore.index();
        for (const user of listofCreatedUser) {
            if (user.id != 1) {
                await userStore.delete(user.id);
            }
        }
    });
    it('create method should add an airline', async () => {
        try {
            createFirstAirlineResult = await store.create(firstAirline);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        const indexResult = await store.index();
        airlineCreated = indexResult[indexResult.length - 1];
        expect(createFirstAirlineResult).toEqual(firstAirlineResult);
    });
    it('index method should return a list', async () => {
        try {
            indexResult = await store.index();
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(indexResult.length).toEqual(1);
        expect(indexResult[indexResult.length - 1]).toEqual(airlineCreated);
    });
    it('show method should return the correct airline', async () => {
        try {
            showResult = await store.show(airlineCreated.id);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(showResult).toEqual(airlineCreated);
    });
    it('delete method should remove an airline', async () => {
        try {
            await store.delete(`${airlineCreated.id}`);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        const indexResult = await store.index();
        expect(indexResult.length).toEqual(0);
    });
    describe('airlineOwners Model', () => {
        let secondAirline;
        let secondAirlineResult;
        let createSecondAirlineResult;
        let ownerSecondAirline;
        let ownerSecondAirlineResult;
        let deleteOwnerResult;
        beforeAll(async () => {
            secondAirline = {
                name: 'Easyjet',
                country_id: 'GB',
            };
            createSecondAirlineResult = await store.create(secondAirline);
            ownerSecondAirline = {
                airline_id: createSecondAirlineResult.id,
                user_id: adminUserResult.id
            };
            ownerSecondAirlineResult = {
                id: 1,
                airline_id: `${createSecondAirlineResult.id}`,
                user_id: `${adminUserResult.id}`
            };
        });
        it('createOwner method should add a User to an airline', async () => {
            try {
                createOwnerResult = await store.createOwner(createSecondAirlineResult.id, adminUserResult.id);
            }
            catch (error) {
                catchedError = error.message;
                console.log(catchedError);
            }
            expect(createOwnerResult).toEqual(ownerSecondAirlineResult);
        });
        it('indexOwnersFromAirline method should returns owners from an airline', async () => {
            let indexOwnersFromAirlineResult;
            try {
                indexOwnersFromAirlineResult = await store.indexOwnersFromAirline(`${createSecondAirlineResult.id}`);
            }
            catch (error) {
                catchedError = error.message;
                console.log(catchedError);
            }
            expect(indexOwnersFromAirlineResult[0]).toEqual(adminUserResult);
        });
        it("showAirlineOwership method should returns airlines from user's ownership", async () => {
            let showAirlineOwnershipResult;
            try {
                showAirlineOwnershipResult = await store.showAirlineOwnership(`${adminUserResult.id}`);
            }
            catch (error) {
                catchedError = error.message;
                console.log(catchedError);
            }
            expect(showAirlineOwnershipResult[0].name).toEqual(secondAirline.name);
        });
        it("removeOwner method should remove a user from the airline's owners", async () => {
            try {
                deleteOwnerResult = await store.removeOwner(createOwnerResult.airline_id, createOwnerResult.user_id);
            }
            catch (error) {
                catchedError = error.message;
                console.log(catchedError);
            }
        });
    });
});
