import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  public login(id: number) {
    const user = this.userService.findOnebyId(id);
    return user;
  }

  public isAuth(id: number) {
    return true;
  }
}
