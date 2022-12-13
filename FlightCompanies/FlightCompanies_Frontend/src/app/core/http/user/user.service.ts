import { Injectable } from "@angular/core";
import { filter, shareReplay, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject} from "rxjs";
import { UserInfo } from "src/app/shared/model/user";
import { HttpClient } from "@angular/common/http";

export const url = "http://localhost:8080";

const ANONYMOUS_INFO_USER: UserInfo = {
    firstname:'',
    lastname:'',
    email:''
  };


@Injectable()
export class UserService {
    private _userUrl = url;

    private subject = new BehaviorSubject<UserInfo>(ANONYMOUS_INFO_USER);

    userInfo$: Observable<UserInfo> = this.subject.asObservable().pipe(filter(user => !!user));

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    getUserInfoById(id: number) {
        console.log(`UserId : ${id}`)
        console.log(`Url : ${this._userUrl}`)
        // return this.http.get<any>('http://localhost/user/2')
        return this.http.get(`${this._userUrl}/user/${id}`)
            .pipe(
                shareReplay(),
                tap(() => console.log("user info request completed")),
                tap(user => {
                    console.log(user)
                    // this.subject.next(user);
                 }),
            )
    }

}