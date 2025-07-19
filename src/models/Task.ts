import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;
} 