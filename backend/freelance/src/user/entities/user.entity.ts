import { Skill } from "../../skill/entities/skill.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum UserRole {
    CLIENT = 'client',
    FREELANCER = 'freelancer',
}  
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole})
  role: 'client' | 'freelancer';

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @ManyToMany(() => Skill)
  @JoinTable({name:'user_skill'})
  skills: Skill[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}