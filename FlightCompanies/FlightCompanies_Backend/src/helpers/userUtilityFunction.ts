import _ from 'lodash';
import { User, UserStore } from '../models/users';

const store = new UserStore();

export const noAdminExists = async () => {
  const adminStatus = await getStatusIdFromStatusName('admin');
  const result = await store.index();
  console.log(`userFonctions -- noAdminExists -- results : ${JSON.stringify(result)}`)
  const admin = _.intersectionBy(result, function(user: User) { user.status == adminStatus});
  console.log(`userFonctions -- noAdminExists -- results : ${JSON.stringify(admin)}`)
  if(admin.length > 0) return false;
  else return true;
}

export const getUserFromEmail = async (email: string) => {
  // console.log(`userFonctions -- getUserFromEmail -- email : ${email}`)
  const results = await store.index();
  // console.log(`userFonctions -- getUserFromEmail -- results : ${JSON.stringify(results)}`)
  const user = results.filter(user => user.email == `${email}`);
  // console.log(`userFonctions -- getUserFromEmail -- user : ${JSON.stringify(user)}`)
  return user[0];
}

export const getUserFromId = async (id: string) => {
  const results = await store.show(id);
  // console.log(`userFonctions -- getUserFromId -- results : ${JSON.stringify(results)}`)
  return results;
}

export const getStatusNameFromStatusId = async(userStatusId: string) => {
    try {
      // console.log(`userFonctions -- getStatusIdFromStatusName -- userStatusId : ${JSON.stringify(userStatusId)}`)
      const statusAvailable: any = await store.indexStatus();
      for (let status of statusAvailable) {
        if (userStatusId == status.id) {
          // console.log(`userFonctions -- getStatusIdFromStatusName -- status : ${JSON.stringify(status)}`)
          return status.status_name;}
      }
      throw new Error("Status id is not valid")
    } catch (error: any) {
      return error;
    }
  }

export const getStatusIdFromStatusName = async(userStatusName: string) => {
  try {
    // console.log(`userFonctions -- getStatusIdFromStatusName -- userStatus : ${JSON.stringify(userStatus)}`)
    const statusAvailable: any = await store.indexStatus();
    for (let status of statusAvailable) {
      if (userStatusName.toLowerCase() == status.status_name) {
        // console.log(`userFonctions -- getStatusIdFromStatusName -- status : ${JSON.stringify(status)}`)
        return status.id;}
    }
    throw new Error("Status name is not valid")
  } catch (error: any) {
    return error;
  }
}
