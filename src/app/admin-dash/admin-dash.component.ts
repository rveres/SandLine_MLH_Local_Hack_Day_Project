import {Component, OnInit, AfterViewInit,  ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

declare var Cookies: any;

import { adminHash } from '../../../appConfig.config';

@Component({
  selector: 'app-admin-dash',
  styleUrls: ['./admin-dash.component.scss'],
  templateUrl: './admin-dash.component.html',
})
export class AdminDashComponent implements OnInit, AfterViewInit {
  orderData: any;

  displayedColumns = ['created', 'status', 'toppings'];
  ordersData: OrdersDatabase | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _http: HttpClient, private _router: Router) {}

  ngOnInit() {

    if (Cookies.get('hashid') !== adminHash && Cookies.get('hashid') != null) {
      this._router.navigateByUrl('/order');
    } else if (Cookies.get('hashid') == null) {
      this._router.navigateByUrl('');
    }

    this.ordersData = new OrdersDatabase(this._http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.ordersData.getOrders(this.sort.direction);
        }),
        map(data => {
          console.log(data);
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.orders.length;

          return data.orders;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

}

export interface OrderApi {
  orders: SandOrder[];
}

export interface SandOrder {
  status: number;
  toppings: string[];
  created: Date;
}

export class OrdersDatabase {
  constructor(private _http: HttpClient) {}

  getOrders(order: string): Observable<OrderApi> {
    const href = 'http://localhost:3000/api/orders';

    if (order === '' || order == null) {
      order = 'desc';
    }

    const requestUrl =
        `${href}?filter[order]=createdAt%20${order}`;

    return this._http.get<OrderApi>(requestUrl);
  }
}
