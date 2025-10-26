// src/modules/comments/dto/create-comment.dto.ts
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsInt()
  taskId: number;

  @IsInt()
  userId: number;
}
