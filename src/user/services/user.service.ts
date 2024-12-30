import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Dto
import { GetUserQueryDto } from '../dto/get-user-query.dto';
import { GetUserParmersDto } from '../dto/get-user-parmers.dto';

// Repository
import { User } from '../entite/user.entitie';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

// Exceptions
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { CustomError } from '../../common/custom.error';

// Services
import { UserCreateManyServiceService } from './user-create-many.service.service';
import { CreateUserServiceService } from './create-user.service.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject()
    private readonly userCreateManyServiceService: UserCreateManyServiceService,

    @Inject()
    private readonly createUserServiceService: CreateUserServiceService,
  ) { }

  public async create(createUserDto: CreateUserDto) {
    return await this.createUserServiceService.create(createUserDto);
  }

  public async createManyUsers(users: CreateManyUsersDto) {
    return await this.userCreateManyServiceService.createManyUsers(users);
  }

  public async findOneByEmail(email: string) {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password']
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process the request, try again later',
        'The request to create a user has timed out',
      );
    }

    if (!user)
      throw new BadRequestException('User not found', {
        description: 'The user with the given id was not found',
      });

    return user;
  }

  public async findOnebyId(id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process the request, try again later',
        'The request to create a user has timed out',
      );
    }

    if (!user)
      throw new BadRequestException('User not found', {
        description: 'The user with the given id was not found',
      });

    return user;
  }


  public findAll(getUserDto: GetUserParmersDto, queryDto: GetUserQueryDto) {
    // Use of custom error
    throw new HttpException(
      new CustomError(
        HttpStatus.MOVED_PERMANENTLY,
        'Invalid query parameters',
        'The query parameters are invalid',
      ),
      HttpStatus.MOVED_PERMANENTLY,
    );
  }

}
