/** local imports */
import { updateCharacters } from '../cron/updateCharacters'

const updateCharactersScript = async () => {
  await updateCharacters()
}

updateCharactersScript()
  .then(() => console.log('characters updated'))
  .catch((error: any) => console.error('There was an error updating characters: ', error))
