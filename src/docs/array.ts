import { z } from 'zod'
/*
z.string().array(); // string[]
z.string().number(); // number[]
z.string().array().optional(); // string[] | undefined
*/

// items['laptop','Mobile']
const items = z.string().array() // const items = z.array(z.string());

///////////////////////////////////////////////////////////
const orderSchema = z.object({
  item: z.string(),
  qty: z.number().positive().min(1).max(12),
  price: z.number().positive().min(1).max(999999),
})
const ordersSchema = z.object({
  orderId: z.number(),
  orders: z.array(orderSchema).nonempty({ message: 'Must Have 1 Order' }),
})

const userSchema = z.object({
  email: z.string().email(),
  favourite: z.string().array().nonempty().min(1),
  allOrders: z.array(ordersSchema),
})

const order1 = {
  email: 'user@example.com',
  favourite: ['Books', 'Movies'],
  allOrders: [
    {
      orderId: 1,
      orders: [
        {
          item: 'Lenovo Flex 5',
          qty: 1,
          price: 95000,
        },
        {
          item: 'Keyboard Lenovo',
          qty: 1,
          price: 1500,
        },
      ],
    },
    {
      orderId: 2,
      orders: [
        {
          item: 'Earphone',
          qty: 1,
          price: 1000,
        },
        {
          item: 'Mouse',
          qty: 1,
          price: 3500,
        },
      ],
    },
  ],
}

try {
  const trans1 = userSchema.strict().safeParse(order1)

  if (trans1.success) {
    const requestOrderId = 1
    const getOrdersById =
      trans1.data.allOrders.find((order) => order.orderId === requestOrderId)
        ?.orders || []

    const getTotal = getOrdersById.reduce(
      (prev, item) => prev + item.price * item.qty,
      0,
    )
    console.log(getTotal)
  } else {
    throw trans1.error
  }
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  }
}
