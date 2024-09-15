
// all the imports here
import dotenv from 'dotenv';
import path from 'path';

// requireing path from env file
dotenv.config({path: path.join(process.cwd(), '.env')});

// all the export from here
export default {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES_IN,
};