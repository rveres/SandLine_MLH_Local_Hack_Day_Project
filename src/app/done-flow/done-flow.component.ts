import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var Cookies: any;

@Component({
  selector: 'app-done-flow',
  templateUrl: './done-flow.component.html',
  styleUrls: ['./done-flow.component.scss']
})
export class DoneFlowComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    if (Cookies.get('hashid') == null) {
      this._router.navigateByUrl('');
    } else {
      Cookies.remove('hashid');
    }
  }
}
