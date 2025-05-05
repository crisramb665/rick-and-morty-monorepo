/** npm install */
import cron from 'node-cron'

/** local imports */
import { updateCharacters } from './updateCharacters'

// alternative to run the cron job in dev env. For production better use another approach like 'crontab'
export const scheduleCharactersUpdate = () => {
  cron.schedule('0 */12 * * *', async () => {
    console.log('Running scheduled character update...')
    await updateCharacters()
  })

  console.log('✅ Scheduler for updating characters is set up to run every 12 hours.')
}
