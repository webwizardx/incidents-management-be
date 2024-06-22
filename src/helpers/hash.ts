import * as bcrypt from 'bcrypt';

/**
 * Hashes a given key using bcrypt.
 * @param key - The key to be hashed.
 * @returns A promise that resolves to the hashed key.
 * @author Jonathan Alvarado
 */
export async function hash(key: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(key, saltOrRounds);
}

/**
 * Compares a key with a hash to check if they match.
 * @param key - The key to compare.
 * @param hash - The hash to compare against.
 * @returns A promise that resolves to a boolean indicating whether the key and hash match.
 * @author Jonathan Alvarado
 */
export async function isMatch(key: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(key, hash);
}
