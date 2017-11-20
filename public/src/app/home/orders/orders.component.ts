import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AuthenticationService} from '../../authentication.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit, AfterViewInit {
   displayedColumns = ['id', 'Name', 'ReciveDate', 'Weghit' , 'Dimention', 'ShipDate',  'Carrier', 'Tracking', 'Notes'  ];

  // dataSource = new ExampleDataSource();
  dataSource: ExampleDataSource | null;
  authenticationService;
  result;
  y: Element[];
  title = 'רשימת הזמנות שנשלחו:';
  mode;
  activeRoute1;

  constructor(authenticationService: AuthenticationService, activeRoute: ActivatedRoute) {
    this.activeRoute1 = activeRoute;
    this.mode = this.activeRoute1.snapshot.params['mode'];
    console.log('mode=', this.mode);
    this.authenticationService = authenticationService;
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit()');
  }
  ngOnInit() {
    console.log('qqqqqq=', this.activeRoute1.snapshot.params['mode'])
    // get old orders
    // if (this.mode == 1) {
      this.result = this.authenticationService.getorders();
      this.result.subscribe(x => {
        this.y = x;
        // console.log('orders1 =', this.y);
        this.dataSource = new ExampleDataSource(this.y);
      });
    // }
    // get outstanding orders
    /*if (this.mode == 2) {
      this.result = this.authenticationService.getoutstandingorders();
      this.result.subscribe(x => {
        this.y = x;
        // console.log('orders1 =', this.y);
        this.dataSource = new ExampleDataSource(this.y);
      });
    }*/
  }
}

export interface Element {
  id: number;
  Name: string;
  ReciveDate: string;
  Weghit : string;
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
    // return Observable.of(data);
    // console.log('orders2 =', this.y);
    return Observable.of(this.y);
  }

  disconnect() {}
}
