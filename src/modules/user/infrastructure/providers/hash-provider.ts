import { HashProvider } from '@shared/application/providers/hashProvider/hash-provider';
import { hash, compare } from 'bcrypt';

export class BcryptjsHashProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    const saltRounds = 10;
    return hash(payload, saltRounds);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
