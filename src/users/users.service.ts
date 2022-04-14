import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
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
        });
        if (user) {
          console.log(user);
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      }

    async createUser( user : UserDto) {
        const newUser = await this.usersRepository.create(user);
        await this.usersRepository.save(newUser).catch((error) => {
          throw new HttpException('Erreur lors de la création de l\'utilisateur', HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
