import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from '@app/telegram/chat.entity';
import { TelegramService } from '@app/telegram/telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity])],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
