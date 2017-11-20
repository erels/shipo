import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  authenticationService;
  myUser: String;
  rForm: FormGroup;

  username;
  password;
  titleAlert: string = 'שדה אימייל חובה';
  noConnection: string = '';

  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(public dialogRef: MatDialogRef<LogindialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, authenticationService: AuthenticationService, private fb: FormBuilder) {

    this.authenticationService = authenticationService;

    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.email, Validators.required, Validators.pattern(this.pureEmail)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });

  }

  ngOnInit() {
    // Use value change subscribe to empy the error message after wrong log in
    this.rForm.get('username').valueChanges.subscribe(
      (value: any) => {
        this.noConnection = '';
    }
  );
    this.rForm.get('password').valueChanges.subscribe(
      (value: any) => {
        this.noConnection = '';
      }
    );
  }

  onNoClick(): void {
    // this.dialogRef.close();
    this.dialogRef.close(this.myUser);
  }

  login(formData) {
    this.noConnection = '';
    this.username = formData.username;
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
    });
    this.noConnection = 'צרוף משתמש וסיסמה לא קיים';
    // EnMessage = 'User with this password does not exist'
  }

  closeLogin() {
    this.onNoClick();
  }

}
