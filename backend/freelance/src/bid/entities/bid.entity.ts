import { BidNegotiation } from "../../bid-negotiation/entities/bid-negotiation.entity";
import { Project } from "../../project/entities/project.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
 export enum BidStatus{
    open = 'open',
    negotiate = 'negotiate',
    accepted = 'accepted',
    rejected = 'rejected'
}
@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  freelancer: User;

  @ManyToOne(() => Project)
  project: Project;

  @Column('decimal')
  initialAmount: number;

  @Column('int')
  initialDurationDays: number;

  @Column('decimal',{default:0})
  finalAmount: number;

  @Column('int',{default:0})
  finalDurationDays: number;

  @Column({ type: 'text' })
  initialMessage: string;

  @Column({ type:'enum',enum:BidStatus,default:BidStatus.open})
  status:BidStatus

  @OneToMany(() => BidNegotiation, n => n.bid)
  negotiations: BidNegotiation[];
}
