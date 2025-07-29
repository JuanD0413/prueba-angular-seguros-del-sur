import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // Adjust the path as necessary
import { Contact, ContactResponse } from '../lib/interfaces/contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public apiUrl = environment.api || 'http://localhost:3000/api/v1/';

  constructor(private _http: HttpClient) { }

  getAllContacts() {
    return this._http.get<ContactResponse>(`${this.apiUrl}contacts`);
  }

  createContact(contact: Contact) {
    return this._http.post<ContactResponse>(`${this.apiUrl}contacts`, contact);
  }

  updateContact(contact: Contact) {
    return this._http.put<ContactResponse>(`${this.apiUrl}contacts/${contact.id}`, contact);
  }

  deleteContact(id: string) {
    return this._http.delete<ContactResponse>(`${this.apiUrl}contacts/${id}`);
  }
}
