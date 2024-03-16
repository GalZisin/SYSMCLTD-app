import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from '../components/customer-details/customer-details.component';

export const CUSTOMER_DETAILS_ROUTES: Routes = [
    {
      path: ':id',
      component: CustomerDetailsComponent
    },
    {
      path: ':customerId/contact-form',
      loadChildren: () => import('./contact-form.routes').then(r => r.CONTACT_FORM_ROUTES)
    },
    {
      path: ':customerId/address-form',
      loadChildren: () => import('./address-form.routes').then(r => r.ADDRESS_FORM_ROUTES)
    },
  ];