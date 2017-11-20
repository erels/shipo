import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import 'hammerjs/hammer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticationService;
  currentUser: String;
  isLoggedIn: boolean;
  WorldTranUid;

  constructor( authenticationService: AuthenticationService, private _router: Router) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
    console.log('HomeIsLogin=', 'OnInit');
    if (this.authenticationService.isactive() ) {

      this.isLoggedIn = true;
      console.log('HomeIsLogin=', this.isLoggedIn);
    }
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

  }

}
