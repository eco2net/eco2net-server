import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';
const bcrypt = require('bcrypt');
import { PostgresErrorCode } from "../Constants";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import User from 'src/entities/user.entity';
import TokenPayload from './interface/tokenPayload.interface';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService : JwtService,
        private configService : ConfigService
        ) {}

    async register(user: UserDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        try {
            const createUserData = await this.userService.createUser({
                ...user,
                password: hashedPassword
            });
            createUserData.password = undefined;
            return createUserData;;
        } catch (error) {
            if (error?.driverError?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('Email déjà existant !', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Oups ! Une erreur interne est survenue', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async comparePwd(inputPwd : String, userPwd : String ) {
        return await bcrypt.compare(
            inputPwd,
            userPwd,
        );
    }

    async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.userService.getUser(login);
        const isMatchingPassword = await this.comparePwd(
            pass,
            user.password,
        );

        if (user && isMatchingPassword) {
            const { password, ...result } = user;
            return result
        }
        return null;
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = {userId};
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
      }
}
