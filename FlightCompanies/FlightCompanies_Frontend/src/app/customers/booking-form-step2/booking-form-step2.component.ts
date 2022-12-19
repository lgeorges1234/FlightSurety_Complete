import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UserService } from 'src/app/core/http/user/user.service';
import { UserInfo } from 'src/app/shared/model/user';

@Component({
  selector: 'booking-form-step2',
  templateUrl: './booking-form-step2.component.html',
  styleUrls: ['./booking-form-step2.component.scss']
})
export class BookingFormStep2Component implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;
  userInfo$: Observable<UserInfo> | undefined;

  @Input()
  parentGroup!: FormGroup;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.userInfo$ = this.userService.userInfo$;
  }

  editPassenger() {

  }

}
