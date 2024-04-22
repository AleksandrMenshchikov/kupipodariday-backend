import * as bcrypt from 'bcrypt';

export async function bcryptCompare(
  data: string | Buffer,
  encrypted: string,
): Promise<boolean> {
  return await bcrypt.compare(data, encrypted);
}

export async function bcryptHash(data: string | Buffer): Promise<string> {
  return await bcrypt.hash(data, 10);
}
