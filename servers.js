import { connectXo } from './src/connect.js';

const xo = await connectXo()

const response = await xo.call('server.getAll')

const command = process.argv[6]
if (command == 'get-all') {
  console.log(JSON.stringify({data: Object.keys(response).map(server => ({"#{SERVER_ID}": server}))}))
} else if (command == 'get') {
  const [id, param] = process.argv.slice(7)
  console.log(response[id][param])
}

xo.close()