import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  rForm: FormGroup;
  addressMessage;
  user;
  profile;
  result;
  authenticationService;
  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  dig = /^\d+$/;
  customMessage;





  constructor(authenticationService: AuthenticationService, private fb: FormBuilder) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
    this.result = this.authenticationService.getprofile();
    this.result.subscribe(x => {
      this.user = x;
      console.log('profile =', this.user);
    });

    this.rForm = this.fb.group({
      'lname': '',
      'fname': '',
      'email': [null, Validators.compose([ Validators.pattern(this.pureEmail) ])],
      'address': '',
      'city': '',
      'zipcode': '',
      'country': '',
      'phone': [null, Validators.compose([Validators.pattern(this.dig), Validators.minLength(10)])]
    });
  }
  updateProfileChange(form, i) {
    console.log('updateProfileChange', form);
    let result;
    result = this.authenticationService.updateProfileChange(form);
    result.subscribe(x => {
      console.log('updateProfileChangeAfterUpdate', x);
      if (x.update == 1){
        console.log('RetLogin=', x);
        this.customMessage = "פרופיל שונה בהצלחה";
        // this.sForm.errorState = false;
        this.rForm.markAsPristine();
      }
    });
}
}
