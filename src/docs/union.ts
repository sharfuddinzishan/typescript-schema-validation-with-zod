import { union, z } from 'zod'

/*
built-in z.union method for composing "OR" types.
*/
const strNumBool = z.string().or(z.number()).or(z.boolean())
const NumBool = union([z.number(), z.boolean()])
const numLiterals = union([z.number(), z.literal('CPI')])

// console.log(NumBool.parse('S')) // Expected boolean, received string
// console.log(numLiterals.parse('S')) // Invalid literal value, expected \"CPI\
console.log(numLiterals.parse('CPI')) // Invalid literal value, expected \"CPI\
