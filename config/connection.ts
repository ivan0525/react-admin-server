import { createConnection, Connection } from 'typeorm'

async function connect() {
  const connection: Connection = await createConnection({
    type: 'mongodb',
    url: 'mongodb://admin:admin123456@ds145329.mlab.com:45329/react-admin',
    useUnifiedTopology: true
  })
}

connect()
