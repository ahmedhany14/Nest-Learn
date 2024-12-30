import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';

// Dto
import { CreateUserDto } from '../dto/create-user.dto';


// Repository
import { User } from '../entite/user.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashing } from 'src/auth/service/hashing.provider';

@Injectable()
export class CreateUserServiceService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @Inject(forwardRef(() => Hashing))
        private readonly hashing: Hashing,
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

        let newUser = this.userRepository.create({
            ...createUserDto,
            password: await this.hashing.hash(createUserDto.password),
        });

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
        delete newUser.password;
        return newUser;
    }

}
