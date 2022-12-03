import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/users";
import * as argon2 from 'argon2';

export async function createSessionToken(user: User) {
    return jwt.sign({
        roles: user.status
        },
        process.env.TOKEN_SECRET as Secret,{
        expiresIn: 7200,
        subject: user.id?.toString()
        }
    )
};

export async function decodeJwt(token: string) {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    console.log("Decode JWT Payload", payload);
    return payload;
};

export async function createCsrfToken(sessionToken: string) {
    return argon2.hash(sessionToken);
}