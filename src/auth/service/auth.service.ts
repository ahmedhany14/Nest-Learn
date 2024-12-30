import { Inject, Injectable, forwardRef } from '@nestjs/common';

// Services
import { UserService } from '../../user/services/user.service';
import { Hashing } from './hashing.provider';


// Dto
import { SignInDto } from '../dto/sign-in.dto';


// Exceptions
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,

    @Inject()
    private readonly hashing: Hashing,
  ) { }


  public isAuth(id: number) {
    return true;
  }

  public async SignIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    const isPasswordValid = await this.hashing.compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password', {
        description: 'The password you entered is incorrect',
      });
    }
    delete user.password;
    return user;
  }
}
