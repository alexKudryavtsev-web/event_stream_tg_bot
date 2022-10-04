import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from '@app/tasks/task.module';
import { TelegramModule } from '@app/telegram/telegram.module';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'build'),
      exclude: ['/'],
    }),
    ScheduleModule.forRoot(),
    TaskModule,
    TelegramModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
