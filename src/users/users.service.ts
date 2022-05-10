import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>
    ){}

    async getUser(login: string) {
        const user = await this.usersRepository.findOne({
          login: login
        }).catch((error) => {
          throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
        })
      }

    async createUser( user : UserDto) : Promise<User> {
      console.log(user);
        const newUser = await this.usersRepository.create(user);
        await this.usersRepository.save(newUser).catch((error) => {
          console.log(error);
          throw new HttpException(`Erreur lors de la création de l'utilisateur`, HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return newUser;
    }

    async getAllUsers() : Promise<User[]> {
      try {
        var users = await this.usersRepository.find();
      } catch (error) {
        console.log(error)
      }
      return users
    }

    async deleteUser(user : UserDto) : Promise<User>{
      console.log(user);
      try {
       return await this.usersRepository.remove(user);
      } catch (error) {
        throw new HttpException(`Erreur lors de la suppression de l'utilisateur`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
