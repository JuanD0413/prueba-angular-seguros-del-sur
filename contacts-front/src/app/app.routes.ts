import { Routes } from '@angular/router';
import { ContactsComponent } from './views/contacts/contacts.component';

export const routes: Routes = [{
  path: '',
  component: ContactsComponent
},{
  path: 'contacts',
  component: ContactsComponent
},{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];
