import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'hammerjs/hammer';
import {FormGroup} from '@angular/forms';
//B11 import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LogindialogComponent} from './logindialog/logindialog.component';
import { RegisterdialogComponent } from './registerdialog/registerdialog.component';
import {UseprofileComponent} from './useprofile/useprofile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  myData: Array<any>;
  myUsers: Array<any>;
  myUser: String;



  isLoggedIn: boolean;
  authenticationService;
  connectionError = 'ok';
  WorldTranUid: string;

  username: String = '2@2.com';
  password: String = 'pass2';

  animal: string;
  name: string;
  isWhEmp = false;
  constructor(private http: Http, authenticationService: AuthenticationService, private _router: Router,public dialog: MatDialog) {

    this.authenticationService = authenticationService;



    /*this.http.get('https://jsonplaceholder.typicode.com/photos')
      .map(response => response.json())
      .subscribe(res => this.myData = res);*/

    // this.WorldTranUid = JSON.parse(localStorage.getItem('WorldTranUid'));
    this.WorldTranUid = localStorage.getItem('WorldTranUid');
    console.log('WorldTranUidAfterCallingService=' , this.WorldTranUid);

    if (this.WorldTranUid) {
      let result;
      result = this.authenticationService.validateUser(this.WorldTranUid);
      result.subscribe(x => {
        this.isLoggedIn = x;
        console.log('FinalLoginChecking=', x);
        this.username = this.authenticationService.fname + ' ' + this.authenticationService.lname;
        this.isWhEmp = this.authenticationService.WH;

        if (!this.isLoggedIn) {
          localStorage.removeItem('WorldTranUid');
          this.WorldTranUid = '';
          this.username = '';
        }
      });
    }
    // this._router.navigate(['home']);
  }
  openDialog(): void {
    let dialogRef;
    dialogRef = this.dialog.open( LogindialogComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.isLoggedIn = true;
        this.WorldTranUid = result;
        this.username = this.authenticationService.fname + ' ' + this.authenticationService.lname;
        this.isWhEmp = this.authenticationService.WH;
      }
    });
  }

  openRegister(): void {
    let dialogRef;
    dialogRef = this.dialog.open( RegisterdialogComponent, {
      width: '300px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.isLoggedIn = true;
        this.WorldTranUid = result.uuid;
        this.username = this.authenticationService.fname + ' ' + this.authenticationService.lname;
      }
    });
  }

  openProfile(): void {
    this._router.navigate(['profile']);
    /*let dialogRef;
    dialogRef = this.dialog.open( UseprofileComponent, {
      width: '300px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.isLoggedIn = true;
        this.WorldTranUid = result.uuid;
        this.username = this.authenticationService.fname + ' ' + this.authenticationService.lname;
      }
    });*/
  }


  ngOnInit() {
    // ...
    console.log('ngOnInit...');
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit()....');
  }

  loginForm() {
    console.log('LoginForm func');
    this._router.navigate(['login']);
  }

  logout() {
    console.log('logoutUser=' , this.WorldTranUid);
    localStorage.removeItem('WorldTranUid');
    this.isLoggedIn = false;
    let result;
    result = this.authenticationService.logout(this.WorldTranUid);
    result.subscribe(x => {
      console.log('Logout =', x);
    });
    this._router.navigate(['']);

  }

  login(username: string, password: string) {
    this.authenticationService.isLoggedIn(username, password).subscribe(
      res => this.myData = res,
      error => this.connectionError = error
    );
  }

  getUsers() {
    this.myUsers = [];
    console.log('--- getUsers Function ---');
    this.authenticationService.getUsers()
      .map(res => res.json())
      .subscribe(users => {
        this.myUsers = users;
      console.log(this.myUsers);
      });
  }

  getUser(username: string, password: string) {
    console.log('--- getUsers Function ---');
    let result;
    result = this.authenticationService.getUser(username, password );
    result.subscribe(x => {
      this.myUser = x;
      console.log(this.myUser);
    });
  }

  validateUser() {
    this.WorldTranUid = localStorage.getItem('WorldTranUid');
    if (this.WorldTranUid) {
      this.authenticationService.validateUser(this.WorldTranUid).subscribe(res => {
        if (res) {
          return true;
        } else {
          localStorage.removeItem('WorldTranUid');
        }
      });
    }
    return false;
  }

orderlist() {
  this._router.navigate(['orders']);
}

}
