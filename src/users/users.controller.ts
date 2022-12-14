import { SignUpBodyType, LoginBodyType } from './../@types/users.d';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersContoroller {
  constructor(private readonly usersservice: UsersService) {}

  @Post('signup')
  signup(@Body() body: SignUpBodyType) {
    return this.usersservice.signup(body);
  }

  @Post('login')
  login(@Body() body: LoginBodyType) {
    return this.usersservice.login(body);
  }
}
