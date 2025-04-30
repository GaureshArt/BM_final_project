import { User } from "../../user/entities/user.entity";
import { Project } from "../../project/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectPrivateMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  attachmentUrl: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({default:false})
  IsUpdated:boolean

  @CreateDateColumn()
  createdAt: Date;
}
