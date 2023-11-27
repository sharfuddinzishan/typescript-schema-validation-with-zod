import { z } from 'zod'

/*
require: makes all properties required, but you can specify which property be required
partial: makes all field optional
*/

// All Fields set to optional()
const infoSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    age: z.number(),
    salary: z.number(),
    role: z.enum(['User', 'Admin', 'Editor']),
    password: z.string(),
    confirmPassword: z.string()
  })
  .partial()

//   name, email, password, confirmPassword is now required
const authSchema = infoSchema.required({
  name: true,
  email: true,
  password: true,
  confirmPassword: true
})
