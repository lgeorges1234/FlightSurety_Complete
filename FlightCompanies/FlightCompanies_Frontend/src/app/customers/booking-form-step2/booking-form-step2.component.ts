import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { openLoginDialog } from 'src/app/core/authentication/login-dialog/login-dialog.component';
import { UserService } from 'src/app/core/http/user/user.service';
import { UserInfo } from 'src/app/shared/model/user';
import { debug, RxJsLoggingLevel } from 'src/app/shared/utils/debug';
import { PassThrough } from 'stream';

@Component({
  selector: 'booking-form-step2',
  templateUrl: './booking-form-step2.component.html',
  styleUrls: ['./booking-form-step2.component.scss']
})
export class BookingFormStep2Component implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;
  isLoggedOut$: Observable<boolean> | undefined;
  userInfo$: Observable<UserInfo> | undefined;

  @Input()
  parentGroup!: FormGroup;

  constructor(private userService: UserService, private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
    this.userInfo$ = this.userService.userInfo$;
  }

  editPassenger() {
    this.isLoggedOut$?.pipe(
      debug(RxJsLoggingLevel.INFO, "booking user dialog"),
      map(value => {
        console.log(value);
        if(value){
          openLoginDialog(this.dialog)
          .subscribe();
        }})
    ).subscribe();
  }
}
