import { z } from 'zod'
/*
intersection: And means all required property must be given
*/
const authSchema = z.object({
  username: z.string(),
  password: z.number()
})

const roleSchema = z.object({
  role: z.enum(['Admin', 'User', 'Normal'])
})

const UserSchema = z.intersection(authSchema, roleSchema)
const UserSchema1 = roleSchema.and(authSchema) // same as above

const EmployeeSchema = z
  .object({
    fullName: z.string(),
    age: z.number()
  })
  .and(UserSchema)
//   .and(authSchema).and(roleSchema)

const user = {
  fullName: 'Sharfuddin Ahamed',
  age: 29,
  role: 'Admin',
  username: 'sua',
  password: 1234
}

console.log(EmployeeSchema.parse(user))

const CompanySchema = z.intersection(
  z.object({ company: z.literal('CPI') }),
  EmployeeSchema
)
console.log(CompanySchema.parse({ ...user, company: 'CPI' }))
