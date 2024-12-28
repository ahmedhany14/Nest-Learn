import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// dto
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

// Repository
import { User } from '../entite/user.entitie';
import { DataSource } from 'typeorm';
import { CustomError } from 'src/common/custom.error';

@Injectable()
export class UserCreateManyServiceService {

    constructor(private readonly dataSource: DataSource) { }

    public async createManyUsers(users: CreateManyUsersDto) {

        // create a new query runner
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            // connect query runner to the database 
            await queryRunner.connect();
            // start transaction
            await queryRunner.startTransaction();
        } catch (error) {
            throw new HttpException(
                new CustomError(
                    HttpStatus.REQUEST_TIMEOUT,
                    'Request timeout',
                    'The request to create a user has timed out'
                ),
                HttpStatus.REQUEST_TIMEOUT
            )
        }

        const createdUsers = [];

        // try for well, catch for error, finally for cleanup and release
        // if everything goes well, commit transaction
        try {
            for (let user of users.users) {
                const newUser = queryRunner.manager.create(User, user);
                createdUsers.push(await queryRunner.manager.save(newUser));
            }

            // commit transaction
            await queryRunner.commitTransaction();
        } catch (error) {
            // if something goes wrong, rollback transaction
            await queryRunner.rollbackTransaction();

            throw new HttpException(
                new CustomError(
                    HttpStatus.CONFLICT,
                    'unable to process the request, try again later',
                    'The user could not be created'
                ),
                HttpStatus.CONFLICT,
                {
                    description: String(error)
                }
            );
        } finally {
            // release query runner
            await queryRunner.release();
        }

        return createdUsers;
    }

}
