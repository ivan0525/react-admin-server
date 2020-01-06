import { createConnection, Connection } from 'typeorm'

async function connect() {
  const connection: Connection = await createConnection()
}

connect()
