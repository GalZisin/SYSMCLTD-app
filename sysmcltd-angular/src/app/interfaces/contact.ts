export interface Contact {
    id?: number;
    fullName: string;
    officeNumber: string;
    email:string;
    created?: string;
  }

  export interface UpdateContact {
    fullName: string;
    officeNumber: string;
    email:string;
  }

  export interface AddContact{
    fullName: string;
    officeNumber: string;
    email:string;
    customerId: number;
  }