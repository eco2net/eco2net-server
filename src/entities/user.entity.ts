import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class User {
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
}
 
export default User;