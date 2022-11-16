"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_roles_1 = require("../../models/users_roles");
const store = new users_roles_1.usersRolesStore();
let usersRolesArray = [
    { id: '1', roles_name: 'operator' },
    { id: '2', roles_name: 'airline' },
    { id: '3', roles_name: 'client' },
    { id: '4', roles_name: 'guest' }
];
let airlineRoles = 0;
let indexResult;
let showResult;
let catchedError = '';
describe('User roles Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('index method should return a list', async () => {
        try {
            indexResult = await store.index();
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(indexResult.length).toEqual(4);
        expect(indexResult).toEqual(usersRolesArray);
    });
    it('show method should return the correct roles', async () => {
        airlineRoles = 2;
        try {
            showResult = await store.show(airlineRoles);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(showResult).toEqual(usersRolesArray[1]);
    });
});
