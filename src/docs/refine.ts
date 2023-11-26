import { z } from 'zod'

const roles = ['Admin', 'User', 'Editor']
const userSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.number(),
    confirmPassword: z.number(),
    age: z.number().optional(),
    role: z
      .string()
      .refine(
        async (data) =>
          roles.find((val) => val.toLowerCase() === data.toLowerCase()),
        {
          message: `Roles Should Be Between ${roles}`,
        },
      ),
    salary: z.number().refine((data) => data > 0, {
      message: 'Salary Should Not Zero or Less',
    }),
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    message: 'Password Mismatch',
    path: ['confirmPassword'],
  })

const user1 = {
  name: 'Sharfuddin',
  email: 'sahamed@gmail.com',
  password: 1234,
  confirmPassword: 123,
  age: 0,
  role: 'publisher',
  salary: -10,
}

try {
  const check1 = userSchema.parse(user1)
  console.log(check1)
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  } else {
    console.log(err)
  }
}
