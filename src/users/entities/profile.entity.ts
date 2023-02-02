import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  email: string;
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAT: Date;
  @Column({ type: 'datetime', nullable: true })
  updatedAT: Date;
}
