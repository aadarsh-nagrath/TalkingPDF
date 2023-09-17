import {neon, neonConfig} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http'
neonConfig.fetchConnectionCache = true;
// it atches the connection that's being set

if(!process.env.DATABASE_URL){
    throw new Error('Data base url not found');
}

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql);
// now go create a schema