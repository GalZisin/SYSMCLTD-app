import { Routes } from "@angular/router";
import { ContactFormComponent } from "../components/contact-form/contact-form.component";

export const CONTACT_FORM_ROUTES: Routes = [
    {
      path: ':id',
      component: ContactFormComponent
    },
  ];