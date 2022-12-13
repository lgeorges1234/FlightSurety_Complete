import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('BP@gmail.com', Validators.required),
      password: new FormControl('byngaJ-rarbov-sijsa6', Validators.required),
      keepLoggged: new FormControl('',)
    })
  };

  signIn() {
    const val = this.loginForm.value;

    if(val.email && val.password) {
      this.authService.login(val.email, val.password)
      .subscribe(
        res => {
          this.close();
        }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }
}

export function openLoginDialog(dialog: MatDialog) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = "modal-panel";
  config.backdropClass = 'backdropBackground';
  // config.position = {
  //   'top': '60px',
  //   'right': '300px'
  // };

  config.data = {};

  const dialogRef = dialog.open(LoginDialogComponent, config);

  return dialogRef.afterClosed();
}