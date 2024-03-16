import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'customers', pathMatch: 'full'
  },
  {
    path: 'customers',
    loadChildren: () => import('./routes/customer.routes').then(r => r.CUSTOMER_ROUTES)
  },
  {
    path: 'create-customer',
    loadComponent: () => import('./components/customer-form/customer-form.component').then(c => c.CustomerFormComponent),
  },
];
// import { Routes } from '@angular/router';
// import { CustomerListComponent } from './components/customer-list/customer-list.component';
// import { CustomerFormComponent } from './components/customer-form/customer-form.component';
// import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
// import { ContactFormComponent } from './components/contact-form/contact-form.component';
// import { AddressFormComponent } from './components/address-form/address-form.component';

// export const routes: Routes = [
//   {
//     path: '', redirectTo: 'customers', pathMatch: 'full'
//   },
//   {
//     path: 'customers', 
//     component: CustomerListComponent
//   },
//   {
//     path: 'create-customer',
//     component: CustomerFormComponent,
//   },
//   {
//     path: 'customers/:id',
//     component: CustomerFormComponent,
//   },
//   {
//     path: 'customers/customer-details/:id',
//     component: CustomerDetailsComponent,
//   },
//   {
//     path: 'customers/customer-details/:customerId/contact-form/:id',
//     component: ContactFormComponent,
//   },
//   {
//     path: 'customers/customer-details/:customerId/address-form/:id',
//     component: AddressFormComponent,
//   }
// ];

