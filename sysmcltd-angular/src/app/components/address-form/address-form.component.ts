import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { AddAddress, UpdateAddress } from '../../interfaces/address';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  appService = inject(AppService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  addressData!: UpdateAddress;
  customerId!: number;

  addressForm = this.formBuilder.group({
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });

  addressId!: number;
  isEdit = false;

  ngOnInit() {
    this.addressId = this.route.snapshot.params['id'];
    this.customerId = this.route.snapshot.params['customerId'];

    if (this.addressId) {
      this.isEdit = true;
      this.addressData = this.appService.getAddressData();
      this.addressForm.patchValue(this.addressData);
    }
  }

  save() {
    console.log(this.addressForm.value);

    const address: UpdateAddress = {
      city: this.addressForm.value.city!,
      street: this.addressForm.value.street!,

    };

    if (this.isEdit) {
      this.httpService
        .updateAddress(this.addressId, address)
        .subscribe(() => {
          console.log('success');
          this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl(`/customers/customer-details/${this.customerId}`);
        });
    } else {
      const newAdress: AddAddress = {
        city: this.addressForm.value.city!,
        street: this.addressForm.value.street!,
        customerId: this.customerId
      }
      this.httpService.createAddress(newAdress).subscribe(() => {
        console.log('success');
        this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl(`/customers/customer-details/${this.customerId}`);
      });
    }
  }
}
