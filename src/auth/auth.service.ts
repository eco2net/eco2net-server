import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

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
