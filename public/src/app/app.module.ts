import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//  B11 was changed below to b12 :
// import { MdButtonModule, MdCardModule, MdDialogModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule,
  MatExpansionModule, MatButtonToggleModule, MatGridListModule, MatAutocompleteModule} from '@angular/material';
// import {MatStepperModule, MdInputModule, MatTableModule} from '@angular/material';
import {MatStepperModule, MatInputModule, MatTableModule} from '@angular/material';
import {AuthenticationService} from './authentication.service';

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { RegisterdialogComponent } from './registerdialog/registerdialog.component';

import { UseprofileComponent } from './useprofile/useprofile.component';
import { OrdersComponent } from './home/orders/orders.component';
import { HomeimageComponent } from './home/homeimage/homeimage.component';
import {AuthGuardGuard} from './auth-guard.guard';
import { ShiporderComponent } from './home/shiporder/shiporder.component';
import {ProfileComponent} from './home/profile/profile.component';
import { WhreciveComponent } from './home/whrecive/whrecive.component';
import { WhshipComponent } from './home/whship/whship.component';



export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardGuard] },
  { path: 'shiplist', component: ShiporderComponent, canActivate: [AuthGuardGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard] },
  { path: 'recive', component: WhreciveComponent, canActivate: [AuthGuardGuard] },
  { path: 'ship', component: WhshipComponent, canActivate: [AuthGuardGuard] },
  { path: 'homeimage', component: HomeimageComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'homeimage' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogindialogComponent,
    RegisterdialogComponent,
    UseprofileComponent,
    OrdersComponent,
    HomeimageComponent,
    ShiporderComponent,
    ProfileComponent,
    WhreciveComponent,
    WhshipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    BrowserAnimationsModule,
    // MdButtonModule,
    MatButtonModule,
    // MdMenuModule,
    MatMenuModule,
   // MdCardModule,
    MatCardModule,
    // MdToolbarModule,
    MatToolbarModule,
    // MdIconModule,
    MatIconModule,
   // MdDialogModule,
    MatDialogModule,
    MatStepperModule,
    MatTableModule,
    // MdInputModule
    MatInputModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatAutocompleteModule

  ],
  entryComponents: [
    LogindialogComponent,
    RegisterdialogComponent,
    UseprofileComponent
  ],

  providers: [AuthenticationService, AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
