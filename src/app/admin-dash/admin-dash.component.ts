import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var Cookies: any;

import { adminHash } from '../../../appConfig.config';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit, AfterViewInit {
  orderData: any;

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    if (Cookies.get('hashid') !== adminHash && Cookies.get('hashid') != null) {
      this._router.navigateByUrl('/order');
    } else if (Cookies.get('hashid') == null) {
      this._router.navigateByUrl('');
    }
  }

  ngAfterViewInit() {

    this._http.get('http://localhost:3000/api/orders?filter[where][status]=0').subscribe(data => {
      console.log(data[0]);
      this.orderData = data;

    });

  }

}
