import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  age: z.number().optional(),
  salary: z.number().optional()
})

let user = {
  name: 'Zishan',
  email: 'ac@gmail.com',
  password: '1234',
  confirmPassword: '1234',
  notes: 'I love programming'
}

let parseUser = userSchema.passthrough().parse(user)

console.log(parseUser)
/*
{
    name: 'Zishan',
    email: 'ac@gmail.com',
    password: '1234',
    confirmPassword: '1234',
    notes: 'I love programming'
  }
  */

/////////////////////////////////////////////////////////

const addressSchema = z
  .object({
    city: z.string(),
    dist: z.string()
  })
  .partial() // makes all required field as optional

const addressSchema1 = z
  .object({
    city: z.string(),
    dist: z.string()
  })
  .partial({ dist: true }) // makes dist as optional and city as required

const addressSchema2 = z
  .object({
    village: z.string().optional(),
    city: z.string().optional(),
    dist: z.string().optional()
  })
  .required() // makes all as required

const addressSchema3 = z
  .object({
    village: z.string(),
    city: z.string().optional(),
    dist: z.string().optional()
  })
  .required({ dist: true }) // makes dist as required and city as required, village in required

///////////////////////////////////////////

const infoSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    age: z.number(),
    salary: z.number()
  })
  .partial({ password: true, confirmPassword: true, salary: true }) // password is optional now

let user1 = {
  name: 'Zishan',
  email: 'zishan@gmail.com',
  age: 23,
  notes: 'I love programming'
}
let parseUser1 = infoSchema.passthrough().parse(user1)

console.log(parseUser1) // { name: 'Zishan', notes: 'I love programming' }
