import { config } from 'dotenv';

config({ quiet: true });

export default function getEnv(variable: string) {
  const envVar = process.env[variable];

  if (!envVar) {
    throw new Error(`${variable} not set in .env`);
  }

  return envVar;
}
