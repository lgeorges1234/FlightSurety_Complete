import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/users";
import { getStatusNameFromStatusId } from "./userUtilityFunction";

export async function createSessionToken(user: User): Promise<string> {
    // console.log(`securityUtils -- createSessionToken -- user : ${JSON.stringify(user)}`)
    const statusName = await getStatusNameFromStatusId(`${user.status}`);
    // console.log(`securityUtils -- createSessionToken -- statusName : ${JSON.stringify(statusName)}`)
    const token = jwt.sign({
        roles: statusName,
        },
        process.env.TOKEN_SECRET as Secret,{
        expiresIn: 7200,
        subject: user.id?.toString()
        }
    );
    // console.log(`securityUtils -- createSessionToken -- token : ${JSON.stringify(token)}`)
    return token;
};

export async function decodeJwt(token: string) {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    console.log("Decode JWT Payload", payload);
    return payload;
};

