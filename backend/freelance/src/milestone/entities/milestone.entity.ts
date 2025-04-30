import { Project } from "../../project/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Milestone {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project)
  project: Project;

  @Column()
  title: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column('decimal')
  amount: number;

  @Column({ default: false })
  isCompleted: boolean;
}
