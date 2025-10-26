import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'open' | 'in_progress' | 'done';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { eager: true })
  project: Project;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, { eager: true, nullable: true })
  assignee: User;

  @Column({ type: 'date', nullable: true })
  dueDate: string;

  @Column({ type: 'enum', enum: ['low','medium','high'], default: 'medium' })
  priority: TaskPriority;

  @Column({ type: 'enum', enum: ['open','in_progress','done'], default: 'open' })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];
}
