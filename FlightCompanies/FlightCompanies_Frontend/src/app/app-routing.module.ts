import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "customers",
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: "home",
    component: HomeComponent
  },
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'customers'
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
