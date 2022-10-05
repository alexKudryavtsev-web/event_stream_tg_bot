import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEventDto } from '@app/events/dto/createEventDto';
import { EventListResponseInterface } from '@app/events/interfaces/eventListResponse.interface';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  async readEvents(
    @Query('telegramId') telegramId: string,
  ): Promise<EventListResponseInterface> {
    return await this.eventService.readEvents(telegramId);
  }

  @Post()
  async createEvent(
    @Query('telegramId') telegramId: string,
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventListResponseInterface> {
    return await this.eventService.createEvent(telegramId, createEventDto);
  }

  @Delete(':id')
  async deleteEvent(
    @Param('id') eventId: number,
    @Query('telegramId') telegramId: string,
  ): Promise<EventListResponseInterface> {
    return await this.eventService.deleteEvent(telegramId, eventId);
  }
}
