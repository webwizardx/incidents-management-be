export type Config = {
  db: {
    connection: string;
    url: string;
  };
  env: string;
  locale: string;
  port: number;
  secret: string;
};

export default (): Config => ({
  db: {
    connection: process.env.DB_CONNECTION,
    url: process.env.DB_URL,
  },
  env: process.env.NODE_ENV,
  locale: process.env.LOCALE,
  port: parseInt(process.env.PORT) || 3000,
  secret: process.env.SECRET,
});
