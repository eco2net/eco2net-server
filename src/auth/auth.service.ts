import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async register(user : UserDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createUserData = await this.userService.createUser({
            ...user,
            password : hashedPassword
        });
        console.log({
            ...user,
            password : hashedPassword
        });
    }

    async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.userService.getUser(login);
        if( user && user.password === pass) {
            const {password, ...result} = user;
            console.log(password);
            console.log(result);
            return result
        }
        return null;
    }
}
