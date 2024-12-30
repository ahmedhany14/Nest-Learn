import { Injectable } from '@nestjs/common';
import { Hashing } from './hashing.provider';

// bcrypt
import * as bcrypt from 'bcrypt';


@Injectable()
export class BcryptProvider implements Hashing {

    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash) ? true : false;
    }
}
