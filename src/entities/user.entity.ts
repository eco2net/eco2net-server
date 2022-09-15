import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from './report.entity';
 
@Entity()
export class User {

  constructor() {

  }
  
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  public login: string;
 
  @Column()
  public name: string;
 
  @Column()
  public password: string;

  @Column()
  public isAdmin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date
}
 
// export default User;