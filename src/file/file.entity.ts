import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { fileTypes } from './file.enum';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  paht: string;

  @Column({
    type: 'enum',
    enum: fileTypes,
    default: fileTypes.IMAGE,
    nullable: false,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  mime: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  size: number;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
