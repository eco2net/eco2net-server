import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import User from 'src/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(@Body() user: UserDto) {
        return await this.usersService.createUser(user);
    }

    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @Delete()
    async deleteUser(@Body() user: User) {
        return await this.usersService.deleteUser(user);
    }
}
