import { Component } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

declare var Cookies: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      height: '150px',
      width: '300px',
      data: { error: 'You must login before placing an order.' },
    });
  }

  checkAuth(): void {
    if (Cookies.get('hashid') == null || Cookies.get('hashid') === '') {
      this.openDialog();
    }
  }

  constructor(public dialog: MatDialog) { }
}
