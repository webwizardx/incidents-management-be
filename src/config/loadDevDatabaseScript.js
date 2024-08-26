/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Read the database URI from the .env file
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error('DB_URL is not defined in the .env file');
  process.exit(1);
}

// Read the database.config.json file
const configPath = path.join(__dirname, 'database.config.json');
const configFile = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configFile);

// Add the new entry under the 'dev' key
config.dev = {
  autoLoadModels: true,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
    native: true,
  },
  uri: dbUrl,
  synchronize: true,
};

// Save the database.config.json file with the new entry
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log('Successfully added "dev" entry to database.config.json');
