import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from '../telegram/chat.entity';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  day: number;

  @Column()
  month: number;

  @ManyToOne(() => ChatEntity, (chat) => chat.events)
  chat: ChatEntity;
}
