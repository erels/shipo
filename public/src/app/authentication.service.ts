import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthenticationService {
  // http;
  apiUrl  = 'http://localhost:3000/api/v1/';
  // apiUrl  = 'http://192.168.14.8:3000/api/v1/';
  // headers = new Headers({'Content-Type': 'application/json'});
  headers;
  options;
  uuid: string;
  isLoggedInStat: Boolean = false;
  fname;
  lname;
  WH;

  constructor(public _http: Http) {
   // this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});
  }

  isLoggedIn(username: string, password: string): Observable<boolean> {

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    const data = {
      'email': username,
      'password': password
    };

    console.log(data);

    return this._http.post(this.apiUrl + 'user', JSON.stringify(data), {headers: this.headers} )
      .map((res: Response) => {
      console.log('response=', res);
        return res.json().username === username
          && res.json().password === password;
      })
      .catch((error: any) => {
        return Observable.throw(error.statusText);
      });
  }

  getUsers() {
    console.log('--- getUsers service ---');
    return this._http.get(this.apiUrl + 'users');
  }
  // ---------------------------------------------------
  getUser(username: string, password: string) {


    console.log('--- getUser service ---');

    // this.headers.append('Content-Type', 'application/json');
    // this.options = new RequestOptions({headers: this.headers});

    const inputdata = {
      'email': username ,
      'password': password
    };
    console.log(JSON.stringify(inputdata));
const txt = JSON.stringify(inputdata);
    // return this._http.post('http://localhost:3000/api/v1/try', data , options )
    //  .map(res => res.json());
    // return this._http.post(this.apiUrl + 'validateUser', data , this.options )
    return this._http.post(this.apiUrl + 'user', txt , this.options )
      .map((res: Response) => {
        console.log('response(x1)=', res);
        this.uuid = res.json().uuid;
        console.log ('uuid=', this.uuid );
        if (this.uuid) {
        localStorage.setItem('WorldTranUid',   this.uuid );
        this.isLoggedInStat = true;
        this.fname = res.json().fname;
        this.lname = res.json().lname;
        this.WH = res.json().WH;
        console.log('lname+ fname =', this.fname , this.lname );
        return this.uuid;
      }
      })
      .catch((error: any) => {
        console.log('ERROR...', error);
        this.isLoggedInStat = false;
        return Observable.throw(error.statusText);
      });
      // .map(res => res.json()
      // );
  }

  validateUser(currentUser: String) {

    console.log( '-----validateUser------')
    const data = {
      'uid': currentUser
    };

    return this._http.post(this.apiUrl + 'validateUser', data , this.options )
      .map( (res: any ) => {
        // console.log('balayka');
        console.log('MapResponsevalidateUser=', res.json());
        this.isLoggedInStat = true;
        this.fname = res.json().fname;
        this.lname = res.json().lname;
        this.uuid = res.json().uuid;
        this.WH = res.json().WH;
        console.log('uuid=', this.uuid);
        return res.json();
        // return res;
    }).catch((error: any) => {
        this.isLoggedInStat = false;
        return Observable.throw(error.statusText);
      });

  }
  logout(currentUser: String) {
    const data = {
      'uid': currentUser
    };
    this.isLoggedInStat = false;
    return this._http.post(this.apiUrl + 'logout', data , this.options )
      .map( (res: any ) => {
         console.log('LogOutResponse=', res.json());
        return res.json();
      }).catch((error: any) => {
        return Observable.throw(error.statusText);
      });
  }
  updateshippingdesc( updatedata: string) {
    console.log('----updatedata----', updatedata);
    return this._http.post(this.apiUrl + 'updashippingdesc', updatedata , this.options )
      .map( (res: any ) => {
        console.log('updatedata=', res.json());
        return res.json();
      }).catch((error: any) => {
        // return Observable.throw(error.statusText);
        console.log('ERROR...', error);
        console.log('ERROR STATUS: ', error.ok);
        this.isLoggedInStat = false;
        // return Observable.throw(error.statusText);
        return error.ok;
      });
  }
  updateAddressChange( updatedata: string) {
    console.log('----updateAddressChange----', updatedata);
    return this._http.post(this.apiUrl + 'updateAddressChange', updatedata , this.options )
      .map( (res: any ) => {
        console.log('updatedata=', res.json());
        return res.json();
      }).catch((error: any) => {
        // return Observable.throw(error.statusText);
        console.log('ERROR...', error);
        console.log('ERROR STATUS: ', error.ok);
        this.isLoggedInStat = false;
        // return Observable.throw(error.statusText);
        return error.ok;
      });
  }
  updateProfileChange( updatedata) {
    console.log('----updateAddressChange----', updatedata);
    updatedata.uid = this.uuid;
    return this._http.post(this.apiUrl + 'updateProfileChange', JSON.stringify(updatedata) , this.options )
      .map( (res: any ) => {
        console.log('updatedata=', res.json());
        return res.json();
      }).catch((error: any) => {
        // return Observable.throw(error.statusText);
        console.log('ERROR...', error);
        console.log('ERROR STATUS: ', error.ok);
        this.isLoggedInStat = false;
        // return Observable.throw(error.statusText);
        return error.ok;
      });
  }
  getprofile () {
    console.log( '-----getprofile------')
    const data = {
      'uid': this.uuid
    };

    return this._http.post(this.apiUrl + 'getprofile', data , this.options )
      .map( (res: any ) => {
        /*console.log('getprofileMapResponse=', res.json());
        this.isLoggedInStat = true;
        this.fname = res.json().fname;
        this.lname = res.json().lname;
        this.uuid = res.json().uuid;
        console.log('uuid=', this.uuid);*/
        return res.json();
      }).catch((error: any) => {
        this.isLoggedInStat = false;
        return Observable.throw(error.statusText);
      });

  }


  register(regiterdata: String) {
    console.log('----RegisterService----', regiterdata);
    this.isLoggedInStat = false;
    return this._http.post(this.apiUrl + 'register', regiterdata , this.options )
      .map( (res: any ) => {
        console.log('register=', res.json());
        this.isLoggedInStat = true;
        this.fname = res.json().fname;
        this.lname = res.json().lname;
        this.uuid = res.json().uuid;
        this.WH = res.json().WH;
        localStorage.setItem('WorldTranUid',   this.uuid );
        return res.json();
      }).catch((error: any) => {
        // return Observable.throw(error.statusText);
        console.log('ERROR...', error);
        console.log('ERROR STATUS: ', error.ok);
        this.isLoggedInStat = false;
        // return Observable.throw(error.statusText);
        return error.ok;
      });
  }

  isactive() {
    console.log('----isactive-----', this.isLoggedInStat);
    return this.isLoggedInStat;
  }
  // -------------------------------------------------------
 getorders() {

   console.log( '-----getorders------')
   const data = {
     'uid': this.uuid
   };

   return this._http.post(this.apiUrl + 'getorders', data , this.options )
     .map( (res: any ) => {
       // console.log('balayka');
       console.log('MapResponse=', res.json());
       console.log('uuid=', this.uuid);
       return res.json();
       // return res;
     }).catch((error: any) => {
       this.isLoggedInStat = false;
       return Observable.throw(error.statusText);
     });

 }

  getordersforshipment() {

    console.log( '-----getorders------')
    const data = {
      'uid': this.uuid
    };

    return this._http.post(this.apiUrl + 'getordersforshipment', data , this.options )
      .map( (res: any ) => {
        // console.log('balayka');
        console.log('MapResponse=', res.json());
        console.log('uuid=', this.uuid);
        return res.json();
        // return res;
      }).catch((error: any) => {
        this.isLoggedInStat = false;
        return Observable.throw(error.statusText);
      });

  }

  getusername() {
    console.log( '-----getusername------')
    const data = {
      'uid': this.uuid
    };
    return this._http.post(this.apiUrl + 'getusernames', data , this.options )
      .map( (res: any ) => {
        // console.log('MapResponse=', res.json());
        return res.json();
        // return res;
      })
      .catch((error: any) => {
        this.isLoggedInStat = false;
        return Observable.throw(error.statusText);
      });
  }
  insertOrder( orderdata) {
    orderdata.uid = this.uuid;
    console.log('----insertOrder----', orderdata);
    return this._http.post(this.apiUrl + 'whinsertorder', JSON.stringify(orderdata) , this.options )
      .map( (res: any ) => {
        console.log('Inserted=', res.json());
        return res.json();
      }).catch((error: any) => {
        // return Observable.throw(error.statusText);
        console.log('ERROR...', error);
        console.log('ERROR STATUS: ', error.ok);
        this.isLoggedInStat = false;
        // return Observable.throw(error.statusText);
        return error.ok;
      });
  }
}


