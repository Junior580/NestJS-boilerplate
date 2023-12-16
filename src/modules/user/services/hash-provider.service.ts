import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashProviderService {
  public async generateHash(payload: string): Promise<string> {
    const saltRounds = 10;
    return hash(payload, saltRounds);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
