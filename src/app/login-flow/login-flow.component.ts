import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var Cookies: any;

import * as sha256 from 'sha256';
import { adminHash } from '../../../appConfig.config';

@Component({
  selector: 'app-login-flow',
  templateUrl: './login-flow.component.html',
  styleUrls: ['./login-flow.component.scss']
})
export class LoginFlowComponent implements OnInit {
  router: Router;

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
  working = false;
  sha256Filter: string;
  errorIndicatorExist = false;

  loginSubmit() {
    this.working = true;
    this.errorIndicatorExist = false;

    this.sha256Filter = sha256(this.nameInput + this.schoolIDInput);

    this._http.get('http://localhost:3000/api/SLUsers/findOne?filter[where][hash]=' + this.sha256Filter).subscribe(data => {
      Cookies.set('hashid', data.hash, { expires: new Date(new Date().getTime() + 30 * 60 * 1000) });

      if (data.hash === adminHash) {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/order');
      }

    }, err => {
      this.errorIndicatorExist = true;
    });

    this.working = false;

  }

  constructor(private _http: HttpClient, router: Router) { this.router = router; }

  ngOnInit() {
  }

}
