import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

// entity

import { Post } from "../../post/entitie/post.entitie";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
    })
    email: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    name: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        select: false
    })
    @Exclude() // this decorator will exclude the password from the response
    password?: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    @Exclude() // this decorator will exclude the googleId from the response
    googleId?: string

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}