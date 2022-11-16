"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_status_1 = require("../../models/users_status");
const store = new users_status_1.usersStatusStore();
let usersStatusArray = [
    { id: '1', status_name: 'root' },
    { id: '2', status_name: 'admin' },
    { id: '3', status_name: 'disactiv' },
    { id: '4', status_name: 'activ' }
];
let adminStatus = 0;
let indexResult;
let showResult;
let catchedError = '';
describe('User status Model', () => {
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
        expect(indexResult).toEqual(usersStatusArray);
    });
    it('show method should return the correct status', async () => {
        adminStatus = 2;
        try {
            showResult = await store.show(adminStatus);
        }
        catch (error) {
            catchedError = error.message;
            console.log(catchedError);
        }
        expect(showResult).toEqual(usersStatusArray[1]);
    });
});
