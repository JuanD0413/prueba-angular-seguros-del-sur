export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export  interface ContactResponse {
  code: number;
  message: string;
  data: Contact[];
}
