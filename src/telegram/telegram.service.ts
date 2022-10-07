import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TelegramBot from 'node-telegram-bot-api';
import { Repository } from 'typeorm';
import { ChatEntity } from '@app/telegram/chat.entity';

const buttons = {
  edit: {
    text: 'Редактировать',
    web_app: { url: process.env.WEB_APP_LINK },
  },
};

const greetings = `
*Бот Отмечалкин приветствует!*
Я создан, чтобы напоминать о предстоящем событии за день до него в 21:00.

- _Напоминать о ДР близких и коллег_
- _Напоминать о каких-нибудь специфических праздниках_
- _Инструмент для event-менеджеров_

Редактировать события: /edit
Инструкция: /help

Разработал: *alexKudryavtsev-web*
`;

const edit = `
Добавить или удалить событие:
`;

const help = `
Комманды:
  - /start - перезапустить
  - /edit - редактировать список событий
  - /help - инструкция

***Данный бот активно используется новейший функционал Telegram, поэтому не работает на некоторых устройствах. Используйте стабильный Telegram Web в таком случае***
`;

@Injectable()
export class TelegramService {
  bot: TelegramBot;

  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {
    this.bot = new TelegramBot(process.env.TELEGRAM_KEY, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      this._newChat(msg.chat.id);

      this.bot.sendMessage(msg.chat.id, greetings, {
        parse_mode: 'Markdown',
      });
    });

    this.bot.onText(/\/edit/, (msg) => {
      this.bot.sendMessage(msg.chat.id, edit, {
        reply_markup: {
          inline_keyboard: [[buttons.edit]],
        },
      });
    });

    this.bot.onText(/\/help/, (msg) => {
      this.bot.sendMessage(msg.chat.id, help, {
        parse_mode: 'Markdown',
      });
    });
  }

  async notify(telegramId: string, message: string) {
    this.bot.sendMessage(telegramId, message, {
      parse_mode: 'Markdown',
    });
  }

  async _newChat(chatId: number): Promise<void> {
    const candidate = await this.chatRepository.findOne({
      where: { telegramId: String(chatId) },
    });

    if (candidate) {
      return;
    }

    const newChat = new ChatEntity();

    newChat.telegramId = String(chatId);

    await this.chatRepository.save(newChat);
  }
}
