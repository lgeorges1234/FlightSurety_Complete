import { Component, OnInit } from '@angular/core';
import { concatMap, map, Observable, tap } from 'rxjs';
import { UserAuth, UserInfo } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { RouterExtService } from '../services/router.service';
import { MatDialog } from '@angular/material/dialog';
import { openLoginDialog } from '../authentication/login-dialog/login-dialog.component';
import { UserService } from '../http/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined;
  isLoggedOut$: Observable<boolean> | undefined;
  isClient$: Observable<boolean> | undefined;
  isAirline$: Observable<boolean> | undefined;
  isAirlineAdmin$: Observable<boolean> | undefined;
  isAdmin$: Observable<boolean> | undefined;
  userAuth$: Observable<UserAuth> | undefined;
  userInfo$: Observable<UserInfo> | undefined;
  userName$: Observable<string> | undefined;
  currentRoute$: Observable<string> | undefined;



  constructor(private authService:AuthService, private dialog: MatDialog,
              private routerExtService: RouterExtService, private userService: UserService) {
  }

  ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn$;
      this.isLoggedOut$ = this.authService.isLoggedOut$;
      this.isClient$ = this.authService.isClient$;
      this.isAirline$ = this.authService.isAirline$;
      this.isAirlineAdmin$ = this.authService.isAirlineAdmin$;
      this.isAdmin$ = this.authService.isAdmin$;
      this.userInfo$ = this.userService.userInfo$;
      this.currentRoute$ = this.routerExtService.currentURL$;
  }


  logout() {
      this.authService.logout();
      console.log("User logged out succesfully");
  }

  login(){
    openLoginDialog(this.dialog)
    .subscribe(() => {
      console.log("User logged in succesfully");
    });
  }
}
