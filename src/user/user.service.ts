import { Injectable } from '@nestjs/common';

// Dto
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { GetUserParmersDto } from './dto/get-user-parmers.dto';

// Repository
import { User } from './entite/user.entitie';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

// Exceptions
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) throw new BadRequestException('User already exists');

    let newUser = await this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }

  public findAll(getUserDto: GetUserParmersDto, queryDto: GetUserQueryDto) {
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
    console.log(id);
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
