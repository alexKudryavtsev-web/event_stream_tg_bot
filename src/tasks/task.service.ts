import { TelegramService } from '@app/telegram/telegram.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly telegramService: TelegramService) {}

  @Cron(process.env.ALGORITHM_CRON)
  async handleCron() {
    await this.telegramService.notify('-428091053', 'НИКИТА КРАСАВЧИК');
  }
}
