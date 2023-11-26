import { z } from 'zod'

const UserSchema = z
  .object({
    name: z.string({
      required_error: 'Name Should Be Provided',
    }),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    age: z.number({
      required_error: 'Age Missing',
      invalid_type_error: 'Age Should Be Number',
    }),
    salary: z.number().optional(),
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    message: 'Password Not Match',
    path: ['confirmPassword'],
  })
/****************************************/
try {
  const result = UserSchema.parse({
    name: 'Sharfuddin',
    email: 'abc@g.com',
    password: '1234',
    confirmPassword: '1234',
    age: 35,
  })
  console.log(result)
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  }
}
