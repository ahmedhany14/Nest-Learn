import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Hashing {

    abstract hash(password: string): Promise<string>; // for hashing password

    abstract compare(password: string, hash: string): Promise<boolean>; // for comparing password and hash
}
