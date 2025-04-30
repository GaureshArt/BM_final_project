import { Milestone } from "../../milestone/entities/milestone.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Milestone)
  @JoinColumn()
  milestone: Milestone;

  @Column('decimal')
  amount: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}