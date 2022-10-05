import { ChatEntity } from '@app/telegram/chat.entity';
import { TelegramService } from '@app/telegram/telegram.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/createEventDto';
import { EventEntity } from './event.entity';
import { EventListResponseInterface } from './interfaces/eventListResponse.interface';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    private readonly telegramService: TelegramService,
  ) {}

  async readEvents(telegramId: string): Promise<EventListResponseInterface> {
    const events = await this.eventRepository.find({
      where: { chat: { telegramId } },
      relations: ['chat'],
    });

    return { events };
  }

  async createEvent(
    telegramId: string,
    createEventDto: CreateEventDto,
  ): Promise<EventListResponseInterface> {
    const chat = await this.chatRepository.findOne({
      where: { telegramId },
    });

    const newEvent = new EventEntity();

    Object.assign(newEvent, createEventDto);
    newEvent.chat = chat;

    await this.eventRepository.save(newEvent);

    return await this.readEvents(telegramId);
  }

  async deleteEvent(
    telegramId: string,
    eventId: number,
  ): Promise<EventListResponseInterface> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new HttpException('Событие не найдено', HttpStatus.BAD_REQUEST);
    }

    await this.eventRepository.remove(event);

    return await this.readEvents(telegramId);
  }

  async notify(): Promise<void> {
    const events = await this.eventRepository.find({
      relations: ['chat'],
    });

    for (const event of events) {
      const { month, day } = this._calculateTomorrow();

      if (day === event.day && month === event.month) {
        await this.telegramService.notify(event.chat.telegramId, event.name);
      }
    }
  }

  _calculateTomorrow(): { month: number; day: number } {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return { month: tomorrow.getMonth() + 1, day: today.getDate() };
  }
}
