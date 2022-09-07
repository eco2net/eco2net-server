import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guards/jwtAuthentification.guard';
import { UpdateDateColumn } from 'typeorm';
import User from '../entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(@Body() user: UserDto) {
        return await this.usersService.createUser(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @Delete()
    async deleteUser(@Body() user: User) {
        return await this.usersService.deleteUser(user);
    }

    @Put()
    async updateUser(@Body() user) {
        // console.log(user)
        return await this.usersService.updateUser(user);
    }

    @Get(":login")
    async getUserByLogin(@Param() param) {
        return await this.usersService.getUser(param.login)
    }
}
