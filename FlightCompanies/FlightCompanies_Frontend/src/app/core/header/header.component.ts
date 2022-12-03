import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/core/authentication/auth.service';

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
  user$: Observable<User> | undefined;
  

  constructor(private authService:AuthService) {

  }

  ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn$;
      this.isLoggedOut$ = this.authService.isLoggedOut$;
      this.user$ = this.authService.user$;
      this.isClient$ = this.authService.isClient$;
      this.isAirline$ = this.authService.isAirline$;
      this.isAirlineAdmin$ = this.authService.isAirlineAdmin$;
      this.isAdmin$ = this.authService.isAdmin$;
  }

  logout() {
      this.authService.logout().subscribe();
  }

  signup() {
    // this.authService.signUp().subscribe();
  }

  signin() {
    // this.authService.login().subscribe();
  }

}
