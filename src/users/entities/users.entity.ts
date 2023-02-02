import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAT: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAT: Date;

  @Column({ nullable: true })
  authStrategy: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
