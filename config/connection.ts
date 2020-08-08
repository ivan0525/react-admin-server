import { createConnection } from 'typeorm'

async function bootstrap() {
  await createConnection()
}

bootstrap()
