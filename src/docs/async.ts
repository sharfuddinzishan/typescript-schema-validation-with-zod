import { z } from 'zod'

const orderSchema = z.object({
  item: z.string(),
  qty: z.number().positive().min(1).max(12),
  price: z.number().positive().min(1).max(9999)
})

const orders = [
  { item: 'Laptop', qty: 2, price: 800 },
  { item: 'Mouse', qty: 1, price: 25 }
]

calculateTotal(orders).then((result) => console.log(result))

async function calculateTotal(orders: z.infer<typeof orderSchema>[]) {
  try {
    const validatedOrders: Array<z.infer<typeof orderSchema>> =
      await Promise.all(
        orders.map(async (order) => {
          const orderWait = await orderSchema.spa(order)
          if (orderWait.success) {
            return orderWait.data
          } else {
            throw 'Validation Error'
          }
        })
      )

    const totalPrice = await calculatePrice(validatedOrders)

    return { success: true, totalPrice, data: validatedOrders }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message ?? 'Validation error'
      }
    } else {
      // Handle other types of errors
      return { success: false, error: 'An unexpected error occurred' }
    }
  }
}

// asynchronous operation to calculate the total price
async function calculatePrice(orders: z.infer<typeof orderSchema>[]) {
  return orders.reduce((prev, next) => prev + next.qty * next.price, 0)
}
