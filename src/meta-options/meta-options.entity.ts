import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class MetaOptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "json",
    nullable: false
  })
  value: JSON;

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @DeleteDateColumn()
  deleteDate: Date;
}