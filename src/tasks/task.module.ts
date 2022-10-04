import { TelegramModule } from '@app/telegram/telegram.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from '@app/tasks/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), TelegramModule],
  providers: [TaskService],
})
export class TaskModule {}
