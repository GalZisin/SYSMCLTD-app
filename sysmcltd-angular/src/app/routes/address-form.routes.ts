import { Routes } from "@angular/router";
import { AddressFormComponent } from "../components/address-form/address-form.component";

export const ADDRESS_FORM_ROUTES: Routes = [
    {
      path: ':id',
      component: AddressFormComponent,
    },
  ];