import { config } from 'dotenv';

config({ quiet: true });

export default function getEnv(val: string, defaultVal?: string): string {
  const envVar = process.env[val] ?? defaultVal;

  if (envVar === undefined) {
    throw new Error(`${val} not set in .env`);
  }

  return envVar;
}
