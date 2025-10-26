// src/modules/comments/comment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;   // ✅ must match DTO field name

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
