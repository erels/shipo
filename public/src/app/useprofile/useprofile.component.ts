import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';



@Component({
  selector: 'app-useprofile',
  templateUrl: './useprofile.component.html',
  styleUrls: ['./useprofile.component.css']
})
export class UseprofileComponent implements OnInit {

  authenticationService;


  constructor(public dialogRef: MatDialogRef<UseprofileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, authenticationService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
  }

}
