import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainFlowComponent } from './main-flow/main-flow.component';
import { LoginFlowComponent } from './login-flow/login-flow.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFlowComponent
  },
  {
    path: 'order',
    component: MainFlowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
