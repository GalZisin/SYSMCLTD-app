import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AddContact, UpdateContact } from '../../interfaces/contact';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  appService = inject(AppService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  contactData!: UpdateContact;
  customerId!: number;

  contactForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    officeNumber: [''],
    email: [''],
  });

  contactId!: number;
  isEdit = false;

  ngOnInit() {
    this.contactId = this.route.snapshot.params['id'];
    this.customerId = this.route.snapshot.params['customerId'];

    if (this.contactId) {
      this.isEdit = true;
      this.contactData = this.appService.getContactData();
      this.contactForm.patchValue(this.contactData);
    }
  }

  save() {
    console.log(this.contactForm.value);

    const contact: UpdateContact = {
      fullName: this.contactForm.value.fullName!,
      officeNumber: this.contactForm.value.officeNumber?.toString()!,
      email: this.contactForm.value.email!,
    };

    if (this.isEdit) {
      this.httpService
        .updateContact(this.contactId, contact)
        .subscribe(() => {
          console.log('success');
          this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl(`/customers/customer-details/${this.customerId}`);
        });
    } else {
      const newContact: AddContact = {
        fullName: this.contactForm.value.fullName!,
        officeNumber: this.contactForm.value.officeNumber?.toString()!,
        email: this.contactForm.value.email!,
        customerId: this.customerId
      }
      this.httpService.createContact(newContact).subscribe(() => {
        console.log('success');
        this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl(`/customers/customer-details/${this.customerId}`);
      });
    }
  }
}
