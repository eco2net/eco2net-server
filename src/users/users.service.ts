import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {

  // constructor(
  //   @InjectRepository(Users) 
  //   private userRepository : Repository<Users>
  // ) {}

  // findAll(): Promise<Users[]> {
  //   return this.userRepository.find();
  // }

  // addUser(user: Users): Promise<InsertResult> {
  //   return this.userRepository.insert(user);;
  // }
  
}
