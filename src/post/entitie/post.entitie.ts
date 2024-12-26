import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// enums
import { PostType, Status } from './../dto/create.posts.dto';

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

  @Column()
  tags: string[];

  @Column()
  metadata: any;
}
