import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-whrecive',
  templateUrl: './whrecive.component.html',
  styleUrls: ['./whrecive.component.css']
})
export class WhreciveComponent implements OnInit {
  authenticationService;
  emailCtrl: FormControl;
  filteredOptions: Observable<any[]>;
  result;
  emaiList;
  emailId;
  rForm: FormGroup;
  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  dig = /^\d+$/;
  order;

  constructor( authenticationService: AuthenticationService, private fb: FormBuilder) {
    this.authenticationService = authenticationService;
    this.emailCtrl = new FormControl('', Validators.required);
    this.result = this.authenticationService.getusername();
    this.result.subscribe(x => {
      this.emaiList = x;
      console.log('WHrecive =', this.emaiList);
    });


  }


  ngOnInit() {
    this.filteredOptions = this.emailCtrl.valueChanges
    // this.filteredOptions = this.rForm.controls.emailCtrl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.emaiList.slice());

    this.rForm = this.fb.group({
      'email': '',
      'name': ['', Validators.required],
      'lin': [null, Validators.compose([Validators.pattern(this.dig), Validators.required])],
      'win': [null, Validators.compose([Validators.pattern(this.dig), Validators.required])],
      'hin': [null, Validators.compose([Validators.pattern(this.dig), Validators.required])],
      'weight': [null, Validators.compose([Validators.pattern(this.dig), Validators.required])],
      'orderDesc': ''
    });

  }
  filter(val: string): string[] {
    // console.log('filterVal', val);
    return this.emaiList.filter(emaiList =>
      emaiList.email.indexOf(val) === 0);
  }

  displayFn(email): string {
    if  (email == null) {
      return;
    }
    console.log('displayFn', email);
    this.emailId = email.id;
    // this.order.id = email.id;
   return email.email;
  }

  reciveOrder(form) {
    form.id = this.emailCtrl.value.id;
    console.log('reciveOrder', form, this.emailCtrl.value.id);
    let result;
    result = this.authenticationService.insertOrder(form);
    result.subscribe(x => {
      console.log('reciveOrderAfterInsert', x);
      if (x.insert == 1){
        console.log('RetLogin=', x);
        // this.customMessage = "פרופיל שונה בהצלחה";
        // this.sForm.errorState = false;
        this.rForm.reset();
      }
    });
  }

}
