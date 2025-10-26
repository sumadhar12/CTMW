import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Import ConfigService

// Entities
import { User } from './users/entities/user.entity';
import { Project } from './projects/entities/project.entity';
import { Task } from './tasks/entities/task.entity';
import { Comment } from './comments/entities/comment.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    // Loads environment variables from .env file and makes ConfigService global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM MySQL configuration (Async using ConfigService) 👈 MODIFIED SECTION
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule to access its service
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // Use configService.get<T>() for type-safe environment access
        host: configService.get<string>('DB_HOST', 'localhost'),
        // Use + to convert the string to a number, or Number()
        port: Number(configService.get<string>('DB_PORT', '3306')),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASS', ''),
        database: configService.get<string>('DB_NAME', 'cmt'),
        entities: [User, Project, Task, Comment],
        synchronize: true, // auto-create tables (disable in production)
      }),
      inject: [ConfigService], // Inject the ConfigService
    }),

    // Application modules
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
})
export class AppModule {}