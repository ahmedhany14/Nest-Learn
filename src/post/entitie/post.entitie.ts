import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne,  } from 'typeorm';

// enums
import { PostType, Status } from "../dto/create.posts.dto";

// entities
import { MetaOptionsEntity } from "../../meta-options/meta-options.entity";
import { User } from "../../user/entite/user.entitie";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  imageUrls: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedAt: Date;

  @Column({
    type: 'enum',
    enum: PostType,
    nullable: false,
    default: PostType.Post,
  })
  postType: PostType;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: Status.Draft,
  })
  status: Status;

  // @Column()
  // tags?: string;

  @OneToOne(() => MetaOptionsEntity
    ,
    (metaOptions) => metaOptions.post // Bidirectional relationship with MetaOptionsEntity
    ,
    {
    cascade: true,// when we save the post, it will save the metaOptions so we don't need to save it separately
    eager: true, // when we fetch the post, it will fetch the metaOptions so we don't need to fetch it separately
  })
//  @JoinColumn() // used in one-to-one relationship
  metaOptions: MetaOptionsEntity;


  @ManyToOne(() => User, (user) => user.posts, {
    //eager: true, // when we fetch the post, it will fetch the author so we don't need to fetch it separately
  })
  author: User;
}
