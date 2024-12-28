import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Dto
import { GetUserQueryDto } from '../dto/get-user-query.dto';
import { GetUserParmersDto } from '../dto/get-user-parmers.dto';

// Repository
import { User } from '../entite/user.entitie';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

// Exceptions
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { CustomError } from '../../common/custom.error';
import { UserCreateManyServiceService } from './user-create-many.service.service';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject()
    private readonly userCreateManyServiceService: UserCreateManyServiceService,
  ) { }

  public async create(createUserDto: CreateUserDto) {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Request timeout',
        'The request to create a user has timed out',
      );
    }
    if (user)
      throw new BadRequestException('User already exists', {
        description: 'The email is already in use',
      });

    let newUser = this.userRepository.create(createUserDto);

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to process the request, try again later',
        {
          description: 'The user could not be created',
        },
      );
    }

    return newUser;
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

    return [
      {
        name: 'user 1',
        email: 'user1@gmail.com',
      },
      {
        name: 'user 2',
        email: 'user2@gmail.com',
      },
    ];
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

  public async createManyUsers(users: CreateManyUsersDto) {
    return await this.userCreateManyServiceService.createManyUsers(users);
  }
}
