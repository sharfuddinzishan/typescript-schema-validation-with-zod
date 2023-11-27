import { z } from 'zod'

/*
Default:strip out unrecognized keys during parsing.
Passthrough: to pass through unknown keys
Strict: If there are any unknown keys in the input, Zod will throw an error (ZodError for parse).
*/

// Default Parsing
const getInfo = z
  .object({
    name: z.string(),
    age: z.number(),
    salary: z.number().optional()
  })
  .parse({
    name: 'Zishan',
    age: 23,
    dept: 'CSE'
  })

console.log(getInfo) // { name: 'Zishan', age: 23 }

///////////////////////////////////////////////////////////
const getInfoPass = z
  .object({
    name: z.string(),
    age: z.number(),
    salary: z.number().optional()
  })
  .passthrough()
  .parse({
    name: 'Zishan',
    age: 23,
    dept: 'CSE'
  })

console.log(getInfoPass) // { name: 'Zishan', age: 23, dept: 'CSE' }

///////////////////////////////////////////////////////////

const getInfoStrict = z
  .object({
    name: z.string(),
    age: z.number(),
    salary: z.number().optional()
  })
  .strict()
  .parse({
    name: 'Zishan',
    age: 23,
    dept: 'CSE'
  })

console.log(getInfoStrict) // Unrecognized key(s) in object: 'dept'
