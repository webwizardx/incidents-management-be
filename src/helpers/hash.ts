import * as bcrypt from 'bcrypt';

export async function hash(key: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(key, saltOrRounds);
}

export async function isMatch(key: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(key, hash);
}
