import { Component, OnDestroy, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../interfaces/customer';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {

  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  customerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    customerNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
  });

  customerId!: number;
  isEdit = false;
  submitted = false;

  ngOnInit() {
    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.isEdit = true;
      this.httpService.getCustomer(this.customerId).subscribe((result) => {
        console.log(result);
        this.customerForm.patchValue(result);
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm?.controls;
  }

  save() {
    if (this.customerForm?.invalid) {
      return;
    }
    // this.submitted = true;
    console.log(this.customerForm.value);

    const customer: Customer = {
      name: this.customerForm.value.name!,
      customerNumber: this.customerForm.value.customerNumber!,
    };

    if (this.isEdit) {
     this.httpService
        .updateCustomer(this.customerId, customer)
        .subscribe(() => {
          console.log('success');
          this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl('/customers');
        });
    } else {
      this.httpService.createCustomer(customer).subscribe(() => {
        console.log('success');
        // this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl('/customers');
      });
    }
  }
}
