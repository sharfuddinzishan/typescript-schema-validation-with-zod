import { z } from 'zod'

const getInfo = z
  .object({
    name: z.string(),
    age: z.number().describe('Age of Person'),
    salary: z.number().optional().describe('Salary Of Monthly, Optional')
  })
  .parse({
    name: 'Zishan',
    age: 23,
    dept: 'CSE'
  })

console.log(getInfo)
