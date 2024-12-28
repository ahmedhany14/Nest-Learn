import { Injectable } from '@nestjs/common';

// dto
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

// Repository
import { User } from '../entite/user.entitie';
import { DataSource } from 'typeorm';

@Injectable()
export class UserCreateManyServiceService {

    constructor(private readonly dataSource: DataSource) { }

    public async createManyUsers(users: CreateManyUsersDto) {
        // create a new query runner
        const queryRunner = this.dataSource.createQueryRunner();
        // connect query runner to the database 

        await queryRunner.connect();

        // start transaction
        await queryRunner.startTransaction();

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
        } finally {
            // release query runner
            await queryRunner.release();
        }

        return createdUsers;
    }

}
