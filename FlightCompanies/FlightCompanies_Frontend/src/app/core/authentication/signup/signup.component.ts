import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterExtService } from '../../services/router.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;


  constructor(private authService: AuthService,
      private router: Router, private routerExtService: RouterExtService) {
   }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      firstname: new FormControl('Brad', Validators.required),
      lastname: new FormControl('Pitt', Validators.required),
      email: new FormControl('BP@gmail.com', Validators.required),
      password: new FormControl('byngaJ-rarbov-sijsa6', Validators.required),
      confirm: new FormControl('byngaJ-rarbov-sijsa6', Validators.required),
    });
  }


  signUp() {
    const val = this.signupForm.value;

    if (val.firstname && val.lastname && val.email && val.password && val.password == val.confirm) {
      this.authService.signUp(val.firstname, val.lastname, val.email, val. password)
        .subscribe(
          res => {
            this.router.navigateByUrl('/');
            console.log('User created successfully');
          }
        )
    }
  }
  goBack() {
    const previousUrl = this.routerExtService.getPreviousUrl() as unknown as string;
    if(previousUrl) this.router.navigateByUrl(previousUrl);
  }

}
