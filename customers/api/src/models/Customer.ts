export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateCustomerDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
}

export interface UpdateCustomerDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: Address;
}
