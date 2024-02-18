export interface Address {
    id?: number;
    city: string;
    street: string;
    created?: string;
  }

  export interface UpdateAddress {
    city: string;
    street: string;
  }

  export interface AddAddress{
    city: string;
    street: string;
    customerId: number;
  }