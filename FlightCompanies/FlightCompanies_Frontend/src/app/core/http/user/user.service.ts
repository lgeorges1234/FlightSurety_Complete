import { Injectable } from "@angular/core";
import { filter, shareReplay, tap, map, concatMap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from "rxjs";
import { UserInfo } from "src/app/shared/model/user";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../authentication/auth.service";

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

    userInfo$: Observable<UserInfo> = this.subject.asObservable().pipe(filter(userInfo => !!userInfo));

    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.user$.subscribe(
            user => {
              if(user.id) this.getUserInfoById(user.id).subscribe();
            }
          )
    }

    getUserInfoById(id: number) {
        console.log(`UserId : ${id}`)
        console.log(`Url : ${this._userUrl}`)
        return this.http.get(`${this._userUrl}/user/${id}`).pipe(
                shareReplay(),
                tap(() => console.log("user info request completed")),
                tap(user => this.subject.next(user as unknown as UserInfo)),
                tap(console.log)
            )
    }

}


