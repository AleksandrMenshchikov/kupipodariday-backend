import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('wishes')
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({ type: 'numeric', precision: 9, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 9, scale: 2 })
  raised: number;

  @Column({ type: 'integer' })
  copied: number;

  @Column({ type: 'varchar', length: 1024 })
  description: string;

  @OneToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToOne(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
