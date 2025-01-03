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
    password?: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    googleId?: string

    @OneToMany(() => Post, post => post.author)
    posts: Post[]
}