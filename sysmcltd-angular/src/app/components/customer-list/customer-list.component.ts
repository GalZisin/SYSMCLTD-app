import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../../interfaces/customer';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../services/http.service';

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

  displayedColumns: string[] = [
    'id',
    'name',
    'customerNumber',
    'created',
    'action',
  ];

  ngOnInit() {
    console.log("customerLIst is loaded");
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
