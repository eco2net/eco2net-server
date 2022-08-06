import { Controller, Request, Post, UseGuards, Body, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {
    }

  
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async login(@Body() user) {
    //   console.log(user);
    return await this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() user) {
      return await this.authService.register(user);
  }
}
