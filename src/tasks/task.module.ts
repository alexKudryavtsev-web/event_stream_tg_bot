import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from '@app/tasks/task.service';
import { EventModule } from '@app/events/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), EventModule],
  providers: [TaskService],
})
export class TaskModule {}
