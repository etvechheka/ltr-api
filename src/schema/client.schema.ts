
import { object, string, ref, date, InferType, number } from 'yup';

let clientSchema = object({
  id: string().uuid(),
  firstname: string().required(),
  lastname: string().required(),
  email: string().required().email(),
  image: string().optional(),
  password: string().required().min(8).max(20)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  status: string().optional(),
  confirmPassword: string().required().oneOf([ref('password')], 'Password must be match!'),
  created_at: date().default(() => new Date()),
  updated_at: date().default(() => new Date())
});
let clientLoginSchema = object({
  client_username : string().required().email(),
  client_password: string().required().min(8).max(20)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
});
export type ClientLoggin = InferType<typeof clientLoginSchema>
export type Client = InferType<typeof clientSchema>
export default clientSchema;