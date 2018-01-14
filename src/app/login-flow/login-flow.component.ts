import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const sha256 = require('sha256');

@Component({
  selector: 'app-login-flow',
  templateUrl: './login-flow.component.html',
  styleUrls: ['./login-flow.component.scss']
})
export class LoginFlowComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  idFormControl = new FormControl('', [
    Validators.required,
    Validators.min(10000),
    Validators.max(90000)
  ]);

  nameInput = '';
  schoolIDInput: number;

  loginSubmit() {

    console.log(sha256(this.nameInput + this.schoolIDInput));

  }

  constructor() { }

  ngOnInit() {
  }

}
