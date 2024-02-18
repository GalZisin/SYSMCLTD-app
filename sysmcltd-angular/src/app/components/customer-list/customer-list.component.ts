import { Component, OnDestroy, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../../interfaces/customer';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  router = inject(Router);
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  customerList: Customer[] = [];

  getAllCustomersSubscription!: Subscription;
  deletCustomerSubscription!: Subscription;

  displayedColumns: string[] = [
    'id',
    'name',
    'customerNumber',
    'created',
    'action',
  ];

  ngOnInit() {
    this.getCustomersFromServer();
  }

  getCustomersFromServer() {
    this.httpService.getAllCustomers().subscribe({
      next: (result) => {
        this.customerList = result;
        console.log(this.customerList);
      },
      error: (error) => {
        console.log("***Error:", error)
      },
      complete: () => console.log('get all customers complete')
    });
  }

  viewDetails(id: number) {
    this.router.navigateByUrl(`/customers/customer-details/${id}`);
  }

  edit(id: number) {
    this.router.navigateByUrl('/customers/' + id);
  }

  delete(id: number) {
    this.httpService.deleteCustomer(id).subscribe(() => {
      this.getCustomersFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }
}
