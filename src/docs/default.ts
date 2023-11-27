import { z } from 'zod'

/*
-- Default: if value not provided then default value is paresed
*/
const userSchema = z.object({
  name: z.string(),
  role: z.enum(['User', 'Admin', 'Editor']).default('User')
})

const s1 = { name: 'Zishan' }

console.log(userSchema.parse(s1)) //{ name: 'Zishan', role: 'User' }

const s2 = { name: 'Zishan', role: 'Admin' }
console.log(userSchema.parse(s2))
