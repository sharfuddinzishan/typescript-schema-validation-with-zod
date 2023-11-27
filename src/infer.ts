import { z } from 'zod'

/*
infer: By this, we can create type from another schema


*/
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  age: z.number(),
  salary: z.number().optional()
})

type TUserType = z.infer<typeof userSchema>

type Tadmin = z.infer<typeof userSchema>
/*

    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
    salary?: number | undefined;
}
*/

let user: TUserType = {
  name: 'Sharfuddin',
  email: 'abc@gmail.com',
  password: '1234',
  confirmPassword: '1234'
}

console.log(user)

/****************************************/
const roleSchema = z.enum(['User', 'Admin', 'Editor'])
type TRole = z.infer<typeof roleSchema> // type TRole = "User" | "Admin" | "Editor"

/****************************************/
// let countries=['America','Bangladesh','Canada']
// let countriesSchema=z.enum(countries) // Not worked as countries not const

/****************************************/
let designation = ['Dev', 'Designer', 'MoGr'] as const // designation now readonly
// designation.push('CSS') // Not worked as readonly
// designation='video' // Not worked as readonly
const designationSchema = z.enum(designation) // same as z.enum(['User', 'Admin', 'Editor'])

/****************************************/

/****************************************/

/****************************************/

/****************************************/
