import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository : Repository<User>
    ){}

    async getUser(login : string) {
        const user = await this.usersRepository.findOne({
           where:{ login: login }
        }).catch((error) => {
          throw new HttpException('Erreur lors de la recherche de l\'utilisateur', HttpStatus.INTERNAL_SERVER_ERROR);
        })
        if(user) return user
        throw new HttpException('Login inexistant', HttpStatus.NOT_FOUND)
      }

      async getUserById(id : number) {
        const user = await this.usersRepository.findOne({
           where:{ id: id }
        }).catch((error) => {
          throw new HttpException('Erreur lors de la recherche de l\'utilisateur', HttpStatus.INTERNAL_SERVER_ERROR);
        })
        if(user) return user
        throw new HttpException('Login inexistant', HttpStatus.NOT_FOUND)
      }

    async createUser( user : UserDto) : Promise<User> {        
        const newUser = await this.usersRepository.create(user);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async updateUser(user) : Promise<any> {
      console.log(user);
      const userUpdated = await this.usersRepository.update(user.id, user);
      return userUpdated;
    }

    async getAllUsers() : Promise<User[]> {
      try {
        var users = await this.usersRepository.find();
      } catch (error) {
        console.log(error)
      }
      return users
    }

    async deleteUser(user : User) : Promise<User>{
      try {
       return await this.usersRepository.remove(user);
      } catch (error) {
        console.log(error);
        throw new HttpException(`Erreur lors de la suppression de l'utilisateur`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
