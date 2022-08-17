import { Controller, Request, Post, UseGuards, Body, HttpCode, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import RequestWithUser from './interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {
    }

  
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  async login(@Req() request: RequestWithUser, @Res() response) {
    const user = request.user;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    console.log(cookie)
    response.setHeader('Set-Cookie', cookie);
    console.log(response)
    return response.send(user);
  }

  @Post('/register')
  async register(@Body() user) {
      return await this.authService.register(user);
  }
}
