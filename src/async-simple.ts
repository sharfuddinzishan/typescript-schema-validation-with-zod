import { Error } from 'mongoose'
import { z } from 'zod'

const orderSchema = z.object({
  item: z.string(),
  qty: z.number().positive().min(1).max(12),
  price: z.number().positive().min(1).max(9999)
})

const order = { item: 'Laptop', qty: 2, price: 800 }

////////////////////////////////////////////////

orderSchema
  .spa(order)
  .then((result) => console.log(result))
  .catch((error) => console.error(error))

//////////////////////////////////////

const verifyOrder = async (getOrder: z.infer<typeof orderSchema>) => {
  const result = await orderSchema.spa(getOrder)
  if (result.success) {
    console.log(result.data)
  } else {
    throw new Error('Validation Error')
  }
}

verifyOrder(order)

////////////////////////////////////////
// Verify Multiple Orders

const orders = [
  { item: 'Laptop', qty: 2, price: 800 },
  { item: 'Mouse', qty: 1, price: 25 }
]

const verifyMultipleOrder = async (
  getOrders: z.infer<typeof orderSchema>[]
) => {
  const allOders = await Promise.all(
    getOrders.map(async (singleOrder) => {
      const result = await orderSchema.spa(singleOrder)
      if (result.success) {
        return result.data // for this .data need to await before orderSchema
      } else {
        throw new Error('Validation Error')
      }
    })
  )
  return allOders
}

verifyMultipleOrder(orders).then((data) => console.log(data))
verifyMultipleOrder(orders).then((data) => {
  let total = data.reduce((prev, next) => prev + next.price * next.qty, 0)
  console.log(total)
})
