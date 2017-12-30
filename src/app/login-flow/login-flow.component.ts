import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-flow',
  templateUrl: './login-flow.component.html',
  styleUrls: ['./login-flow.component.scss']
})
export class LoginFlowComponent implements OnInit {

  nameField = new FormControl('', [Validators.required, Validators.minLength(5)]);

  name = '';
  id: number;

  constructor() { }

  ngOnInit() {
  }

}
