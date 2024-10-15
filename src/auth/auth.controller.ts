import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from './dtos/sign-up.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Get()
    testRoute() {
      return this.authService.testRoute();
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get('restrict')
    restrictedRoute() {
      return 'ok';
    }
  
    @UseGuards(AuthGuard('local'))
    @Post('sign-in')
    signIn(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto);
    }
  
    // @Post('reset-password')
    // resetPassword(@Body('email') email: string) {
    //   return this.authService.sendResetPasswordEmail(email);
    // }
  
    // @Post('verify-reset-password/:token')
    // verifyResetPassword(
    //   @Body('password') password: string,
    //   @Param('token') token: string,
    // ) {
    //   return this.authService.resetPassword(token, password);
    // }
  }