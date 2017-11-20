import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AuthenticationService} from '../../authentication.service';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

declare let paypal: any;

@Component({
  selector: 'app-shiporder',
  templateUrl: './shiporder.component.html',
  styleUrls: ['./shiporder.component.css']
})
export class ShiporderComponent implements OnInit, AfterViewChecked {

  displayedColumns = ['id', 'Name', 'ReciveDate', 'Weghit' , 'Dimention', 'Notes'  ];

  // dataSource: ExampleDataSource | null;
  dataSource;
  authenticationService;
  groupsy= [];
  ButtonToggleGroup;
  groupValue;
  sumeofArray = 0;
  result;
  customMessage ;
  addressMessage = '';




  // ---- paPall
  private didPaypalScriptLoad = false;
  private loading = true;
  private paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AW0leY2qmMtb8lTGexTXs58b0OUjCoKqI0Lnl8j_H-LoK-nFw3tua7dn1rle0moMvImOWACvlDN2qA5T',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.sumGroup (), currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      // show success page
    }
  };
  // ---------

  orders = [
    {'id': 1, 'Name': 'Amazon', 'ReciveDate': '01-01-17', 'Weghit': '10', 'Dimention': '20x20'},
    {'id': 2, 'Name': 'OverStock', 'ReciveDate': '01-01-17', 'Weghit': '10', 'Dimention': '20x20'}
  ];
  pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  dig = /^\d+$/;
  y: Element[];
  title =  'הזמנות למשלוח:';
  rForm: FormGroup;
  sForm: FormGroup;

  constructor(authenticationService: AuthenticationService, private fb: FormBuilder) {
    this.authenticationService = authenticationService;
    // this.dataSource = new ExampleDataSource(this.y);
    this.rForm = this.fb.group({
      'shiptoname': '',
      'address': '',
      'city': '',
      'zipcode': '',
      'country': '',
      'phone': ''
    } ,{ validator: this.validateForm} );

    this.sForm = this.fb.group({
      'orderValue': [null, Validators.compose([Validators.pattern(this.dig)])],
      'orderDesc': ''
    },{ validator: this.validateForm});

  }
  validateForm(formgroup: FormGroup) {
    // console.log('validateSform',formgroup);
    // const tmp = formgroup.get('orderDesc');
    // console.log('tmp',tmp);
    if (formgroup.dirty){
    //  console.log('validateSform',formgroup);
      return { 'validator': true };
    } else { return null; }

    }
  ngOnInit() {
    this.result = this.authenticationService.getordersforshipment();
    this.result.subscribe(x => {
      this.dataSource = x;
      console.log('orders1 =', this.dataSource);
    });


  }

  sumGroup () {
    let sum = 0;
    console.log('length', this.groupsy.length);
    for (let i = 0; i < this.groupsy.length ; i++) {
      if (typeof parseFloat (this.groupsy[i]) == 'number' && this.groupsy[i] != null) {
        console.log('this.groupsy[i]', this.groupsy[i]);
        sum += parseInt(this.groupsy[i]);
      }
    }
    this.sumeofArray = sum;
    return sum;
}
  genderChanged(val, i) {
    console.log('genderChanged1', val, i);
    this.groupsy[i] = val;
    this.sumGroup ();
  }


  sumGroup1 () {
    let sum = 0;
    console.log('length', this.groupsy.length);
    for (let i = 0; i < this.groupsy.length ; i++) {
      if (typeof parseFloat (this.groupsy[i]) == 'number' && this.groupsy[i] != null) {
        console.log('this.groupsy[i]', this.groupsy[i]);
        sum += parseInt(this.groupsy[i]);
      }
    }
    // this.sumeofArray = sum;
    // return sum;
  }


  takeThis(i) {

    console.log('acordionStart', i,  this.sumGroup ());
    const xxx = this.sumGroup ();
    setTimeout(function () {
      // sumGroup ();

      this.xxx();
      // this function removes a bug with highlighting of the button toggles
      // the delay is necessary don't remove
     // this.groupsy[i] = this.groupValue;
     // console.log('acordion2', i,  val);
      // document.getElementById(temp).setAttribute("class", "toggle-button mat-button-toggle");
    }, 5000);
    // this.groupsy[i] = this.groupValue;

  }

  updateorderdesc(formData , i) {
    console.log(formData);
    formData.id = this.dataSource[i].id;
    if (formData.orderValue == null) {
      formData.orderValue = this.dataSource[i].customerdeclarevalue ;
    }
    if (!this.sForm.get('orderDesc').dirty ) {
      formData.orderDesc = this.dataSource[i].customerdeclaretxt ;
    }
    let result;
    result = this.authenticationService.updateshippingdesc(JSON.stringify(formData));
    result.subscribe(x => {
      if (x.update == 1){
        console.log('RetLogin=', x);
        this.customMessage = "פרטי ההזמנה שונו בהצלחה";
        // this.sForm.errorState = false;
      }
    });
  }
  updateAddressChange(formData , i) {
    formData.id = this.dataSource[i].id;
    if (!this.rForm.get('shiptoname').dirty) {
      formData.shiptoname = this.dataSource[i].shiptoname;
    }
    if (!this.rForm.get('address').dirty) {
      formData.address = this.dataSource[i].address;
    }
    if (!this.rForm.get('city').dirty) {
      formData.city = this.dataSource[i].city;
    }
    if (!this.rForm.get('zipcode').dirty) {
      formData.zipcode = this.dataSource[i].zip;
    }
    if (!this.rForm.get('country').dirty) {
      formData.country = this.dataSource[i].country;
    }
    if (!this.rForm.get('phone').dirty) {
      formData.phone = this.dataSource[i].phone;
    }

    // console.log('updateAddressChange',formData);
    let result;
    result = this.authenticationService.updateAddressChange(JSON.stringify(formData));
    result.subscribe(x => {
      if (x.update == 1){
        console.log('RetLogin=', x);
        this.addressMessage = "כתובת ההזמנה שונתה בהצלחה. לשינוי כתובת קבועה, שנה פרופיל ";
        // this.sForm.errorState = false;
      }
    });
  }

  // PayPall


  ngAfterViewChecked() {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

}
export function orderValueFunc(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    console.log('orderValueFunc', control.value);
    return {'valid': {value: control.value}} ;
  };

}
export interface Element {
  id: number;
  Name: string;
  ReciveDate: string;
  Weghit: string;
  Dimention: string;
  ShipDate: string;
  Carrier: string;
  Tracking: string;
  Notes: string;
}

const data: Element[] = [
  {'id': 1, 'Name': 'Amazon', 'ReciveDate': '01-01-17', 'Weghit': '10', 'Dimention': '20x20' , 'ShipDate': '01-01-17', 'Carrier': 'USPS',   'Tracking': '111111111111', 'Notes': 'Blah blah blahaaa'},
  {'id': 2, 'Name': 'OverStock', 'ReciveDate': '01-01-17', 'Weghit': '10', 'Dimention': '20x20' , 'ShipDate': '01-01-17', 'Carrier': 'FedEx',   'Tracking': '111112111111', 'Notes': 'Blah blah blahaaa'}
];

export class ExampleDataSource extends DataSource<any> {
  result;
// x: Element[];
  y: Element[];
  constructor(x) {
    super();
    this.y = x;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(data);
    // console.log('orders2 =', this.y);
    // return Observable.of(this.y);
  }

  disconnect() {}
}
