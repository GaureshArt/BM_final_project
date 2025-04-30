import { User } from "../../user/entities/user.entity";
import { Bid } from "../../bid/entities/bid.entity";
import { Column, CreateDateColumn, Entity, EntityMetadata, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class BidNegotiation {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bid, bid => bid.negotiations)
  bid: Bid;

  @ManyToOne(() => User)
  sender: User;

  @Column('decimal', { nullable: true })
  proposedAmount: number;

  @Column('int', { nullable: true })
  proposedDurationDays: number;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  sentAt: Date;
}
