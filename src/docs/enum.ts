import { z } from 'zod'

const shift = ['Morning', 'Evening', 'Weekend'] as const // to used this in enum must used as const
const studentSchema = z.object({
  roll: z.number(),
  name: z.string(),
  dept: z.enum(['CSE', 'BBA', 'EEE']),
  type: z.enum(shift)
})

const s1 = {
  roll: 1,
  name: 'Zishan',
  dept: 'CSE',
  type: 'Morning'
}

const p1 = studentSchema.parse(s1)
console.log(p1)

////////////////////////////////////////////////////////////////

console.log('*************************************')
const branch = ['Gulshan', 'Banani', 'Uttara']
const studentSchema1 = z.object({
  roll: z.number(),
  name: z.string(),
  dept: z.enum(['CSE', 'BBA', 'EEE']),
  type: z.enum(shift),
  campus: z.string().refine((data) => branch.includes(data as string), {
    message: `Campus Only Available in ${[...branch]}`
  })
})

const s2 = {
  roll: 1,
  name: 'Zishan',
  dept: 'CSE',
  type: 'Evening',
  campus: 'Uttara'
}

const p2 = studentSchema1.parse(s2)
console.log(p2)

////////////////////////////////////////////////////////////////////

console.log('*************************************')
const s3 = {
  roll: 1,
  name: 'Zishan',
  dept: 'CSE',
  type: 'Morning',
  campus: 'Uttara'
}

const p3 = studentSchema1.parse(s3)
console.log(p3)

//////////////////////////////////////////////////////////////////////

console.log('###########################')
const studentSchema2 = z
  .object({
    roll: z.number(),
    name: z.string(),
    dept: z.enum(['CSE', 'BBA', 'EEE']),
    type: z.enum(shift),
    campus: z.string().optional()
  })
  .refine((obj) => branch.includes(obj.campus as string), {
    message: `Campus should be ${[...branch]}`
  })

const s4 = {
  roll: 1,
  name: 'Zishan',
  dept: 'CSE',
  type: 'Morning',
  campus: 'Gulshan'
}

const p4 = studentSchema2.parse(s4)
console.log(p4)
