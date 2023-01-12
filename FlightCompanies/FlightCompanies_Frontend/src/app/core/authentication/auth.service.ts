import {shareReplay, filter, tap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import { UserAuth } from "../../shared/model/user";
import { JwtHelperService } from '@auth0/angular-jwt';
import { url } from '../http/user/user.service';

const helper = new JwtHelperService();

export const ANONYMOUS_USER: UserAuth = {
    id: NaN,
    roles: ''
}

@Injectable()
export class AuthService {

    private _authtUrl = url;

    private subject = new BehaviorSubject<UserAuth>(ANONYMOUS_USER);

    user$: Observable<UserAuth> = this.subject.asObservable().pipe(filter(user => !!user));

    userId$: Observable<number> = this.subject.asObservable().pipe(map(user => user.id));

    isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

    isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

    isClient$: Observable<boolean> = this.user$.pipe(map(user => user.roles == "client"));

    isAirline$: Observable<boolean> = this.user$.pipe(map(user => user.roles == "airline"));

    isAirlineAdmin$: Observable<boolean> = this.user$.pipe(map(user => user.roles == "airlineAdmin"));

    isAdmin$: Observable<boolean> = this.user$.pipe(map(user => user.roles == "admin"  || user.roles == "root"));

    constructor(private http: HttpClient) {
    }

    signUp(firstname: string, lastname: string, email:string, password:string) {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          });
        return this.http.post<string>(
            `${this._authtUrl}/signup`, 
            {firstname, lastname, email, password},
            { headers: httpHeaders})
            .pipe(
                shareReplay(),
                tap(console.log),
                tap(token => {
                    this.storeToken(token);
                    const user = this.getUserAuthInfofromToken();
                    this.subject.next(user);
                }),
        )
    }

    login(email:string, password:string ) {
        return this.http.post<UserAuth>(`${this._authtUrl}/login`, {email, password}).pipe(
            shareReplay(),
            tap(console.log),
            tap(token => {
                // console.log(`angular -- signup -- token : ${JSON.stringify(token)}`)
                this.storeToken(token);
                const user = this.getUserAuthInfofromToken();
                this.subject.next(user);
            }),
        );
    }

    // loginAsUser(email:string) {
    //     return this.http.post<User>('/api/admin', {email}).pipe(
    //         shareReplay(),
    //         tap(user => this.subject.next(user)),);
    // }

    // logout() : Observable<any> {
    //     return this.http.post(`${url}/logout`, null).pipe(
    //         shareReplay(),
    //         tap(console.log),
    //         tap(user => {
    //             this.subject.next(ANONYMOUS_USER);
    //             localStorage.clear();
    //         })
    //     );
    // }
    logout(): void {
        this.subject.next(ANONYMOUS_USER);
        localStorage.clear();
    }

/// Utility functions

    storeToken(token: string) {
        localStorage.setItem("access_token", token);
    }

    decode(token: string) {
        return helper.decodeToken(token);
    }

    isTokenExpires(token: string): boolean {
        return !helper.isTokenExpired(token);
    }

    getUserAuthInfofromToken(): UserAuth {
        const token = localStorage.getItem("access_token") as unknown as string;
        const decodeToken = this.decode(token);
        console.log(JSON.stringify(decodeToken))
        const userAuthInfo: UserAuth = {
            id: decodeToken.sub,
            roles: decodeToken.roles,
        }
        console.log(userAuthInfo);
        return userAuthInfo;
    }

}