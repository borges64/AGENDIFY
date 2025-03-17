export interface NewUserRequest {
  name: string;
  email: string;
  role: 'SCHEDULER' | 'PROFESSIONAL';
}
