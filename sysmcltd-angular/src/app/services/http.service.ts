import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer, UpdateCustomer } from '../interfaces/customer';
import { Contact, UpdateContact } from '../interfaces/contact';
import { Address, UpdateAddress } from '../interfaces/address';


@Injectable({
    providedIn: 'root',
})
export class HttpService {
    apiUrl = 'https://localhost:7239';
    http = inject(HttpClient);
    constructor() { }

    getAllCustomers() {
        console.log('getAllCustomers');
        return this.http.get<Customer[]>(this.apiUrl + '/api/customer');
    }

    createCustomer(customer: Customer) {
        return this.http.post(this.apiUrl + '/api/customer', customer);
    }

    getCustomer(customerId: number) {
        return this.http.get<Customer>(
            this.apiUrl + '/api/customer/' + customerId
        );
    }

    updateCustomer(customerId: number, customer: UpdateCustomer) {
        return this.http.put<Customer>(
            this.apiUrl + '/api/customer/' + customerId,
            customer
        );
    }

    deleteCustomer(customerId: number) {
        return this.http.delete(this.apiUrl + '/api/customer/' + customerId);
    }

    createContact(contact: Contact) {
        return this.http.post(this.apiUrl + '/api/contact', contact);
    }

    updateContact(contactId: number, contact: UpdateContact) {
        return this.http.put<UpdateContact>(
            this.apiUrl + '/api/contact/' + contactId,
            contact
        );
    }

    deleteContact(contactId: number) {
        return this.http.delete(this.apiUrl + '/api/contact/' + contactId);
    }
    
    createAddress(address: Address) {
        return this.http.post(this.apiUrl + '/api/address', address);
    }

    updateAddress(addressId: number, address: UpdateAddress) {
        return this.http.put<UpdateAddress>(
            this.apiUrl + '/api/address/' + addressId,
            address
        );
    }

    deleteAddress(addressId: number) {
        return this.http.delete(this.apiUrl + '/api/address/' + addressId);
    }
}