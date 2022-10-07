import { Module } from '@nestjs/common';
import { TaskService } from '@app/tasks/task.service';
import { EventModule } from '@app/events/event.module';

@Module({
  imports: [EventModule],
  providers: [TaskService],
})
export class TaskModule {}
