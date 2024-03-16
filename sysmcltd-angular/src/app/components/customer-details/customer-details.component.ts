import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Address } from '../../interfaces/address';
import { Contact } from '../../interfaces/contact';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  httpService = inject(HttpService);
  appService = inject(AppService);
  toaster = inject(ToastrService);

  customerId!: number;
  addressList: Address[] = [];
  contactList: Contact[] = [];
  customerName!: string;
  customerNumber!: string;

  displayedAddressColumns: string[] = [
    'id',
    'city',
    'street',
    'created',
    'action',
  ];

  displayedContactColumns: string[] = [
    'id',
    'fullName',
    'officeNumber',
    'email',
    'created',
    'action',
  ];

  ngOnInit() {
    this.getCustomerFromServer();
  }

  getCustomerFromServer() {
    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.httpService.getCustomer(this.customerId).subscribe(
        (result) => {
          this.customerName = result.name;
          this.customerNumber = result.customerNumber;
          this.addressList = result.addresses || [];
          this.contactList = result.contacts || [];
        });
    }
  }

  addContact() {
    this.router.navigateByUrl(`/customers/customer-details/${this.customerId}/contact-form/`);
  }

  addAddress() {
    this.router.navigateByUrl(`/customers/customer-details/${this.customerId}/address-form/`);
  }

  editAddress(address: Address): void {
    console.log('address id', address.id);
    const addressData = {
      city: address.city,
      street: address.street
    }
    this.appService.setAddresstData(addressData)
    this.router.navigateByUrl(`/customers/customer-details/${this.customerId}/address-form/${address.id}`);
  }

  editContact(contact: Contact) {
    console.log('contact id', contact.id);
    const contactData = {
      fullName: contact.fullName,
      officeNumber: contact.officeNumber,
      email: contact.email
    }
    this.appService.setContactData(contactData)
    this.router.navigateByUrl(`/customers/customer-details/${this.customerId}/contact-form/${contact.id}`);
  }

  deleteContact(id: number) {
    this.httpService.deleteContact(id).subscribe(() => {
      this.getCustomerFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }

  deleteAddress(id: number) {
    this.httpService.deleteAddress(id).subscribe(() => {
      this.getCustomerFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }
}
