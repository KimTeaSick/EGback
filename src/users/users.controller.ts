import { Request } from 'express';
import {
  EditBody,
  LoginBodyType,
  SignUpBodyType,
  UserSearchBodyType,
} from './../@types/users.d';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { _dbConn } from 'src/common/mysql';
import { NextFunction, Response } from 'express';

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
  @Post('emailCheck')
  emailCheck(@Body() body: { email: string }) {
    return this.usersservice.emailCheck(body);
  }
  @Post('userSearch')
  userSearch(@Body() body: UserSearchBodyType) {
    return this.usersservice.userSearch(body);
  }
  @Post('userList')
  userList() {
    return this.usersservice.userList();
  }
  @Post('userAdmission')
  userAdmission(
    @Body() body: { admission: number; idx: number; group_idx: number },
  ) {
    return this.usersservice.userAdmission(body);
  }
  @Post('userNoticeLog')
  userNoticeLog(@Body() body: { user_idx: number }) {
    return this.usersservice.userNoticeLog(body.user_idx);
  }

  @Post('editUser')
  editUser(@Body() body: EditBody) {
    return this.usersservice.editUser(body);
  }

  @Post('rejectMember')
  rejectMember(@Body() body: { user_idx: number }) {
    return this.usersservice.rejectMember(body.user_idx);
  }
}
