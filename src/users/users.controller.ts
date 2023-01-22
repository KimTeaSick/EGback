import {
  SignUpBodyType,
  LoginBodyType,
  UserSearchBodyType,
} from './../@types/users.d';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { _dbConn } from 'src/common/mysql';

@Controller('users')
export class UsersContoroller {
  constructor(private readonly usersservice: UsersService) {}

  @Post('signup')
  signup(@Body() body: SignUpBodyType) {
    console.log(process.env.HOST);
    console.log(_dbConn);
    return this.usersservice.signup(body);
  }

  @Post('login')
  login(@Body() body: LoginBodyType) {
    return this.usersservice.login(body);
  }
  @Post('emailCheck')
  emailCheck(@Body() body: { email: string }) {
    return this.usersservice.emailCheck(body);
  }
  @Post('userSearch')
  userSearch(@Body() body: UserSearchBodyType) {
    return this.usersservice.userSearch(body);
  }
  @Post('userList')
  userList(@Body() body: unknown) {
    return this.usersservice.userList(body);
  }
  @Post('userAdmission')
  userAdmission(@Body() body: { admission: number; idx: number }) {
    return this.usersservice.userAdmission(body);
  }
}
