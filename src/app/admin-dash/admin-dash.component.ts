import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';

declare var Cookies: any;

import { adminHash } from '../../../appConfig.config';

@Component({
  selector: 'app-admin-dash',
  styleUrls: ['./admin-dash.component.scss'],
  templateUrl: './admin-dash.component.html',
})
export class AdminDashComponent implements OnInit, AfterViewInit {
  orderData: any;

  displayedColumns = ['created', 'toppings', 'operations'];
  ordersData: OrdersDatabase | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  errorExist = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    if (Cookies.get('hashid') !== adminHash && Cookies.get('hashid') != null) {
      this._router.navigateByUrl('/order');
    } else if (Cookies.get('hashid') == null) {
      this._router.navigateByUrl('');
    }

    this.ordersData = new OrdersDatabase(this._http);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.ordersData.getOrders(this.sort.direction);
      }),
      map(data => {
        this.isLoadingResults = false;
        this.errorExist = false;
        this.resultsLength = data.length;

        return data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.errorExist = true;
        return observableOf([]);
      })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

  deleteOrder(id: number) {

    this.isLoadingResults = true;

    this._http.delete('http://localhost:3000/api/orders/' + id).subscribe(data => {

      const newDataSource = this.dataSource.data;

      for (const orderIndex in this.dataSource.data) {
        if (this.dataSource.data[+orderIndex].id === id) {
          newDataSource.splice(+orderIndex, 1);
        }
      }

      this.dataSource.data = newDataSource;

      this.resultsLength = this.dataSource.data.length;
      this.isLoadingResults = false;

      this._changeDetectorRef.detectChanges();

      console.log('success');

    }, err => {
      this.errorExist = true;

      console.log('there was an error');
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WarnDialogComponent, {
      height: '150px',
      width: '300px',
      data: {}
    });
  }

  constructor(private _http: HttpClient, private _router: Router, private _changeDetectorRef: ChangeDetectorRef,  
    public dialog: MatDialog) { }

}

export interface SandOrder {
  id: number;
  status: number;
  toppings: string[];
  created: Date;
}

export class OrdersDatabase {
  constructor(private _http: HttpClient) { }

  getOrders(order: string): Observable<SandOrder[]> {
    const href = 'http://localhost:3000/api/orders';

    if (order === '' || order == null) {
      order = 'desc';
    }

    const requestUrl =
      `${href}?filter[order]=createdAt%20${order}&filter[where][status]=0`;

    return this._http.get<SandOrder[]>(requestUrl);
  }

}
