import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
    Validators.min(10000)
  ]);

  nameInput = '';
  schoolIDInput: number;
  sumbitDisable = 'disabled';

  constructor() { }

  ngOnInit() {
  }

}
