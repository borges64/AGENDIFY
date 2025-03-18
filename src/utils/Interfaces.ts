export interface NewUserRequest {
  name: string;
  email: string;
  role: 'SCHEDULER' | 'PROFESSIONAL';
}

export interface IClinic {
  name: string;
  cnpj: string;
  email: string;
  address: string;
  phone: string;
}
