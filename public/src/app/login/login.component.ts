import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationService;
  myUser: String;
  rForm: FormGroup;

  username;
  password;
  titleAlert:string = 'שדה אימייל חובה';
  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private _router: Router, authenticationService: AuthenticationService, private fb: FormBuilder
              ) {
    this.authenticationService = authenticationService;

    this.rForm = fb.group({
      'username' : [null, Validators.compose([Validators.required, Validators.email, Validators.required, Validators.pattern(this.pureEmail) ])],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit() {



  }

  onNavigate() {
    this._router.navigate(['']);
  }

  login(formData ) {
    this.username = formData.username;
    this.password = formData.password;
    console.log('--- Login  ---');
    let result;
    result = this.authenticationService.getUser(this.username, this.password );
    result.subscribe(x => {
      this.myUser = x;
      console.log('RetLogin=', this.myUser);
      if (this.authenticationService.isLoggedInStat ){
        this._router.navigate(['']);
      }


    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('WorldTranUid');
    // TODO
    // Call service logout
  }
}
