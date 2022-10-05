import { EventService } from '@app/events/event.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly eventService: EventService) {}

  @Cron(process.env.ALGORITHM_CRON)
  async handleCron() {
    await this.eventService.notify();
  }
}
