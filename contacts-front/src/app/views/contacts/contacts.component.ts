import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Contact } from '../../lib/interfaces/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  public contacts: Contact[] = [];
  public contactForm: FormGroup;
  public editingContactId: string | undefined = "";

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: ['']
    });
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAllContacts().subscribe({
      next: (response) => {
        console.log('Contacts loaded:', response);
        this.contacts = response.data;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: Contact = this.contactForm.value;
      console.log('Creating contact:', newContact);

      if(!this.editingContactId) {
          this.contactService.createContact(newContact).subscribe({
          next: (response) => {
            if (response.code === 201) {
              this.loadContacts();
            }
            this.contactForm.reset();
          },
          error: (error) => {
            console.error('Error creating contact:', error);
          }
        });
      }else {
        newContact.id = this.editingContactId;
        this.contactService.updateContact(newContact).subscribe({
          next: (response) => {
            console.log('Contact updated:', response);
            this.loadContacts();
            this.resetForm();
            this.editingContactId = "";
          },
          error: (error) => {
            console.error('Error updating contact:', error);
          }
        });
      }

    }
  }

  resetForm() {
    this.contactForm.reset();
  }

  deleteContact(id: string) {
    console.log('Deleting contact with ID:', id);

    this.contactService.deleteContact(id).subscribe({
      next: (response) => {
        console.log('Contact deleted:', response);
        this.loadContacts(); // Reload contacts after deletion
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
      }
    });



  }

  editContact(contact: Contact,) {
    this.editingContactId = contact.id;
    this.contactForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      zipCode: contact.zipCode,
      country: contact.country
    });
  }

}
