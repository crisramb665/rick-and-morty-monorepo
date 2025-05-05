/** npm imports */
import Redis from 'ioredis'

// Redis instance to cache data
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0, // using unique db since app is not bigger enough atm
})

export default redis
