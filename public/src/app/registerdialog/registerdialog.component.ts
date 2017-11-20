import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {LogindialogComponent} from '../logindialog/logindialog.component';

import { AbstractControl } from '@angular/forms';

import {MatStepperModule} from '@angular/material';



@Component({
  selector: 'app-registerdialog',
  templateUrl: './registerdialog.component.html',
  styleUrls: ['./registerdialog.component.css']
})
export class RegisterdialogComponent implements OnInit {
  authenticationService;
  myUser: String;
  rForm: FormGroup;
  emailFormControl;
  titleAlert: string = 'שדה חובה';
  noPass: string = '';
  noConnection;
  passwordConfirm: string;
  password: string;
  address;
  city;

  passMatch = /t/;

    lname;
  fname;

  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  constructor(public dialogRef: MatDialogRef<LogindialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    this.authenticationService = authenticationService;

    this.rForm = this.fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.pureEmail)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'fname': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'lname': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'passwordConfirm': [null, Validators.compose([ Validators.required ])],
      'address': '',
      'city': '',
      'zipcode': '',
      'country': '',
      'phone': ''
    } , this.passwordMatchValidator );


  }

  ngOnInit() {

    this.rForm.get('passwordConfirm').valueChanges.subscribe(

      (passwordConfirm) => {

        if (this.rForm.get('passwordConfirm').value === this.rForm.get('password').value) {
          this.noPass = '';
          this.passMatch = /t/;
        } else {
          this.noPass = ' סיסמה לא תואמת';
          this.passMatch = /f/;
          // return this.rForm.invalid;
        }

      });
    this.rForm.get('password').valueChanges.subscribe(

      (passwordConfirm) => {


        if (this.rForm.get('passwordConfirm').value === this.rForm.get('password').value) {
          this.noPass = '';
        } else {
          this.noPass = ' סיסמה לא תואמת';
          // return this.rForm.invalid;
        }

      });

  }


  passComp() {
    let p1 = '';
    let p2 = '';

    console.log('####', p1, p2);
    if (p1 !== p2) {
      console.log('NOT GOOD');
      return -1;
    }
    return null;
  }

  passwordMatchValidator(g: FormGroup) {
    console.log('aaaaaaaaaaa');
    return;
  }
  onNoClick(): void {
    // this.dialogRef.close();
    this.dialogRef.close(this.myUser);
  }
  closeLogin() {
    this.onNoClick();
  }

  register(formData) {
    this.noConnection = '';
    /*this.username = formData.username;
    this.password = formData.password;
    console.log('--- LoginDialog  ---');
    let result;
    result = this.authenticationService.getUser(this.username, this.password);
    result.subscribe(x => {
      this.myUser = x;
      console.log('RetLogin=', this.myUser);
      if (this.authenticationService.isLoggedInStat) {
        // this._router.navigate(['']);
        this.onNoClick();
      }
    });*/

    // console.log('ALL==', JSON.stringify(formData));
    if (this.password !== this.passwordConfirm){
      this.noConnection = 'סיסמה לא זהה ';
      return;
    } else {
      let result;
      result = this.authenticationService.register(JSON.stringify(formData));
      result.subscribe(x => {
        this.myUser = x;
        console.log('RetLogin=', this.myUser);
        if (this.authenticationService.isLoggedInStat) {
          // this._router.navigate(['']);
          this.onNoClick();
        }else {
          this.noConnection = 'אמייל משתמש כבר קיים במערכת!';
        }
      });

    }
  }
}
