import { connectXo } from './src/connect.js';

const xo = await connectXo()

const response = await xo.call('backupNg.getAllLogs')
var jobIDs = Object.values(response).map(obj => obj.jobId)
jobIDs = jobIDs.filter((v, i) => jobIDs.indexOf(v) == i)

const jobs = Object.fromEntries(jobIDs.map(jobId => [jobId, Object.values(response).filter(x => x.jobId == jobId).sort((x, y) => (x.end - y.end)).reverse()[0]]))

console.log(jobs)

const command = process.argv[6]
if (command == 'get-all') {
  console.log(JSON.stringify({data: Object.keys(jobs).map(jobId => ({"{#BACKUP_ID}": jobId}))}))
} else if (command == 'get') {
  const [id, param] = process.argv.slice(7)
  console.log(jobs[id][param])
}

xo.close()