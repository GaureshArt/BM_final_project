import { User } from "../../user/entities/user.entity";
import { Project } from "../../project/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectPublicMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  attachmentUrl: string;
  @Column({ type: 'boolean', default: true })
  isParentMessage: boolean;


  @ManyToOne(() => ProjectPublicMessage, (msg) => msg.childMessages, { nullable: true})
  @JoinColumn({ name: 'parent_message_id' })
  parentMessage?: ProjectPublicMessage;

  @OneToMany(() => ProjectPublicMessage, (msg) => msg.parentMessage)
  childMessages: ProjectPublicMessage[];

  @Column({default:false})
  IsUpdated:boolean
  
  @CreateDateColumn()
  createdAt: Date;
}
