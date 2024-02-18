import { Address } from "./address";
import { Contact } from "./contact";

export interface Customer {
    id?: number;
    name: string;
    customerNumber: string;
    created?: string;
    addresses?: Array<Address>;
    contacts?: Array<Contact>;
  }

  export interface UpdateCustomer {
    name: string;
    customerNumber: string;
  }