import { Routes } from "@angular/router";
import { CustomerListComponent } from "../components/customer-list/customer-list.component";
import { CustomerFormComponent } from "../components/customer-form/customer-form.component";

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: CustomerListComponent },
  {
    path: ':id',
    component: CustomerFormComponent
  },
  {
    path: 'customer-details',
    loadChildren: () => import('./cutomer-details.routes').then(r => r.CUSTOMER_DETAILS_ROUTES)
  },
];