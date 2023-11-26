import { z } from 'zod'

/****************************************/
const result = z
  .object({
    name: z.string({
      required_error: 'Name Should Be Provided'
    }),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    age: z.number({
      required_error: 'Age Missing',
      invalid_type_error: 'Age Should Be Number'
    }),
    salary: z.number().optional()
  })
  .safeParse({
    name: 1234,
    email: 'abc.com',
    password: 1234,
    confirmPassword: '123',
    age: '35'
  })

if (result.success) {
  console.log('Success')
} else {
  console.log(result.error.format())
}
/****************************************/
