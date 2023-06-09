import { connectXo } from './src/connect.js';

var srStatus;

const xo = await connectXo()
const [id, key] = process.argv.slice(7)

xo.on('notification', async notification => {
  for (const itemId of Object.keys(notification.params.items)) {
    const item = notification.params.items[itemId]
    if (item.type == 'SR') {
      if (item.uuid == id) {
        console.log({
          name: item.name_label,
          percentualUsage: item.physical_usage*100/item.size,
          usage: item.physical_usage,
          total: item.size,
          status: srStatus > 0 ? 'online' : 'offline'
        }[key])
        xo.close()
      }
    }
  }
})

const command = process.argv[6]
if (command == 'get-all') {
  const srs = Object.keys(await xo.call('sr.getAllUnhealthyVdiChainsLength'))
  console.log(JSON.stringify({data: srs.map(sr => ({"{#SR_ID}": sr}))}))
  xo.close()
} else if (command == 'get') {
  srStatus = (await xo.call('sr.stats', {id})).stats.iops.r.reduce((x, y) => x+y)
  await xo.call('sr.scan', {id}).catch(e => {})
}
