import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainFlowComponent } from './main-flow/main-flow.component';
import { LoginFlowComponent } from './login-flow/login-flow.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { DoneFlowComponent } from './done-flow/done-flow.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFlowComponent
  },
  {
    path: 'order',
    component: MainFlowComponent
  },
  {
    path: 'admin',
    component: AdminDashComponent
  },
  {
    path: 'done',
    component: DoneFlowComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
