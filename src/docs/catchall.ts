import { z } from 'zod'

/*
catchall- All unknown keys of specified type will be parsed
*/

const MidMarksSchema = z
  .object({
    physics: z.number().nonnegative(),
  })
  .catchall(z.number().nonnegative())

const student1 = {
  physics: 25,
  math: 15,
  C: 45,
}

const result1 = MidMarksSchema.parse(student1)
console.log(result1)
