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
function extractPostgresUriComponents(uri) {
  try {
    const url = new URL(uri);

    const [username, password] = url.username
      ? [url.username, url.password]
      : [null, null];
    const host = url.hostname;
    const database = url.pathname ? url.pathname.split('/')[1] : null;

    return { host, database, username, password };
  } catch (error) {
    console.error('Invalid URI:', error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const components = extractPostgresUriComponents(dbUrl);

// Read the database.config.json file
const configPath = path.join(__dirname, 'database.config.json');
const configFile = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configFile);

// Add the new entry under the 'dev' key
config.dev = {
  autoLoadModels: true,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      required: true,
      rejectUnauthorized: false,
    },
  },
  uri: dbUrl,
  synchronize: true,
  ...components,
};

const json = JSON.stringify(config, null, 2);

console.log('Resulting config:', json);

// Save the database.config.json file with the new entry
fs.writeFileSync(configPath, json);

console.log('Successfully added "dev" entry to database.config.json');
