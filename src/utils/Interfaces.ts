export interface IAdmin {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface IClinic {
  name: string;
  cnpj: string;
  password: string;
  email: string;
  address: string;
  phone: string;
}

export interface IAppointment {
  date: Date;
  patientId: string;
  scheduledById: string;
  performedById: string;
  clinicId: string;
  MoreInfo: string;
}

export interface IPatient {
  name: string;
  email: string;
  password: string;
  cpf: string;
  address: string;
  phone: string;
  phone2: string;
}
