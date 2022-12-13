import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
  user$: Observable<UserAuth> | undefined;
  userId$: Observable<number> | undefined;
  userName$: Observable<string> | undefined;
  currentRoute$: Observable<string> | undefined;



  constructor(private authService:AuthService, private dialog: MatDialog,
              private routerExtService: RouterExtService, private userService: UserService) {
  }

  ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn$;
      this.isLoggedOut$ = this.authService.isLoggedOut$;
      this.user$ = this.authService.user$;
      this.isClient$ = this.authService.isClient$;
      this.isAirline$ = this.authService.isAirline$;
      this.isAirlineAdmin$ = this.authService.isAirlineAdmin$;
      this.isAdmin$ = this.authService.isAdmin$;
      this.currentRoute$ = this.routerExtService.currentURL$;
  }

  logout() {
      this.authService.logout();
  }

  login(){
    openLoginDialog(this.dialog)
    .subscribe(() => {
      console.log("User logged in succesfully");
      this.userService.getUserInfoById(2);
    });
  }

  getUserInfo() {
    return this.userService.getUserInfoById(2).subscribe();
  }


}
