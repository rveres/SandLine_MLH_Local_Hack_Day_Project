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

  displayedColumns = ['created', 'state', 'number', 'title'];
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
          console.log(this.sort.direction);
          return this.ordersData.getOrders(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
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

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export class OrdersDatabase {
  constructor(private _http: HttpClient) {}

  getOrders(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._http.get<GithubApi>(requestUrl);
  }
}
