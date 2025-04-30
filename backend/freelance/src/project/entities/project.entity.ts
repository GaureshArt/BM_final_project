import { Category } from "../../category/entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bid } from "../../bid/entities/bid.entity";
import { Milestone } from "../../milestone/entities/milestone.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(()=>Category)
  @JoinTable({name:'project_category'})
  category: Category[] ;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal')
  budget: number;

  @Column({ type: 'date' })
  deadline: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  client: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  assignedFreelancer: User;
  @OneToMany(() => Bid, bid => bid.project)
  bids: Bid[];
  @OneToMany(() => Milestone, milestone => milestone.project)
milestones: Milestone[];
}
