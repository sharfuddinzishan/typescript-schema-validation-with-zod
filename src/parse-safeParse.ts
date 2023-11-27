import { z } from 'zod'

const userSchema = z.object({
  name: z.string({
    required_error: 'Must Give Your Name',
    invalid_type_error: 'Name Should Be Alphabetic'
  }),
  age: z
    .number({
      required_error: 'Must Give Your Age',
      invalid_type_error: 'Age Should Be Number'
    })
    .positive()
    .lte(150)
})

const user = {
  name: 'Sharfuddin',
  age: 150
}

try {
  const result = userSchema.safeParse(user)
  if (result.success) {
    console.log(result.data)
  } else {
    throw result.error
  }
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  } else {
    console.log(err)
  }
}
