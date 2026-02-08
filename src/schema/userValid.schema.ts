
import { object, string, ref, date, InferType, number } from 'yup';

let userSchema = object({
  id: string().uuid(),
  full_name: string().required(),
  email: string().required().email(),
  password: string().required().min(8).max(20)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  status: string().optional(),
  date_of_birth: date(),
  username: string().min(3).max(20).optional(),
  confirmPassword: string().required().oneOf([ref('password')], 'Password must be match!'),
  role: string().max(10).required(),
  created_at: date().default(() => new Date())
});

export let loginSchema = object({
  username: string().required(),
  password: string().required()
});


export type LoginUser = InferType<typeof loginSchema>
export type User = InferType<typeof userSchema>
export default userSchema;