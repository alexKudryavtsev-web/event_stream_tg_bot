import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventEntity } from '@app/events/event.entity';
import { EventService } from './event.service';
import { ChatEntity } from '@app/telegram/chat.entity';
import { TelegramModule } from '@app/telegram/telegram.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, ChatEntity]),
    TelegramModule,
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
