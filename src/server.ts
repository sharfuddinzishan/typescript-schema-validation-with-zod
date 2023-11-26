import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

async function main() {
  try {
    await mongoose.connect(config.db as string)
    app.listen(config.port, () => {})
  } catch (err) {
    new Error('Port or Database Connection Error')
  }
}

main()
