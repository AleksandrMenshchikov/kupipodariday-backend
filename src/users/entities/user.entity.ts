import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  @Index()
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Wish, (wish) => wish.owner)
  @JoinColumn()
  wishes: Wish[];

  @OneToOne(() => Offer, (offer) => offer.user)
  @JoinColumn()
  offers: Offer[];

  @OneToOne(() => Wishlist, (wishlist) => wishlist.owner)
  @JoinColumn()
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
