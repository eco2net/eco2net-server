import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    async addUser(@Body() user : UserDto){
        await this.usersService.createUser(user);
    }
}
