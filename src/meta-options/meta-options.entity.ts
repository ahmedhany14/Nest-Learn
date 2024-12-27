import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, OneToOne, JoinColumn
} from "typeorm";
import { Post } from "../post/entitie/post.entitie";

@Entity()
export class MetaOptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "json",
    nullable: false
  })
  value: JSON;

  @OneToOne(() => Post, (post) => post.metaOptions,
    {
      onDelete: "CASCADE", // When the post is deleted, the metaOptions will also be deleted automatically
    }) // Bidirectional relationship with Post
  @JoinColumn()
  post: Post

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @DeleteDateColumn()
  deleteDate: Date;
}