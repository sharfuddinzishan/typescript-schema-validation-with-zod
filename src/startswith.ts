import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  admitId: z.string().startsWith('CPI-')
})

const p1 = {
  name: 'Zishan',
  admitId: 'CPI-Zishan'
}

console.log(userSchema.parse(p1))
///////////////////////////////////////////
console.log('######################################')

const userSchema1 = z.object({
  name: z.string(),
  admitId: z.string().refine((data) => data.startsWith('CPI-'), {
    message: `aaaStart With CPI-`
  })
})

console.log(userSchema1.parse(p1))

// /////////////////////////////
console.log('*************************88888')

const userSchema2 = z
  .object({
    name: z.string(),
    admitId: z.string()
  })
  .refine((obj) => obj.admitId.startsWith('CPI-'), {
    message: `Must Start With CPI-`
  })

const p2 = {
  name: 'Zishan',
  admitId: 'CPI-Zishan'
}

console.log(userSchema2.parse(p2))
