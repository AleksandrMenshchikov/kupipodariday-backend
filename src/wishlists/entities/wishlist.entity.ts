import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import {
  IsArray,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  @MinLength(1)
  @MaxLength(250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @Column('int', { array: true })
  @IsArray()
  itemsId: number[];

  @OneToMany(() => Wish, (wish) => wish.wishlists)
  items: Wish[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
