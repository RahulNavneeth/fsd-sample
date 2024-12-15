import { Pool } from 'pg';

export const pool = new Pool({
	user: 'postgres.njcchhxglgfvlnyqbcoe',
	host: 'aws-0-us-east-1.pooler.supabase.com',
	database: 'postgres',
	password: 'fsd-sample',
	port: 5432,
});
