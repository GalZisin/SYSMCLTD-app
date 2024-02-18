import { Injectable } from '@angular/core';
import { UpdateContact } from '../interfaces/contact';
import { UpdateAddress } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private contactData!: UpdateContact;
  private addressData!: UpdateAddress;

  constructor() { }

  setContactData(data: UpdateContact) {
    this.contactData = data;
  }

  getContactData() {
    return this.contactData;
  }

  setAddresstData(data: UpdateAddress) {
    this.addressData = data;
  }

  getAddressData() {
    return this.addressData;
  }
}
