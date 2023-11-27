import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  admitId: z
    .string()
    .startsWith('CPI-')
    .refine((data) => data.startsWith('CPI-'), {
      message: `Start With CPI-`
    })
})

const p1 = {
  name: 'Zishan',
  admitId: 'CPi-Zishan'
}

// console.log(userSchema.parse(p1))

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
  admitId: 'Zishan'
}

try {
  console.log(userSchema2.parse(p2))
} catch (error: unknown) {
  if (error instanceof z.ZodError) {
    const errorMessages = error.errors
      .map((err) => err.message)
      .filter((msg): msg is string => typeof msg === 'string')
    console.error(errorMessages) // Log the validation error messages
  } else {
    throw error // Re-throw if it's not a ZodError
  }
}
