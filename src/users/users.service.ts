import { getSalt } from './../common/salt';
import { SignUpBodyType, LoginBodyType } from './../@types/users.d';
import { singupSql, loginSql } from './../sql/users';
import { _dbQuery } from 'src/common/mysql';
import { Injectable } from '@nestjs/common';
import { makeSalt } from 'src/common/salt';
import CryptoJs from 'crypto-js';

@Injectable()
export class UsersService {
  async signup(body: SignUpBodyType) {
    try {
      const { name, email, number, password, sortation } = body;
      const salt = makeSalt();
      const word = password + salt;
      const encPassword = CryptoJs.SHA256(word).toString();
      console.log(encPassword);
      await _dbQuery(singupSql, [
        name,
        email,
        number,
        encPassword,
        salt,
        sortation,
      ]);
      return { status: 200 };
    } catch (error) {
      console.log(`error ${error}`);
      return { status: 403 };
    }
  }

  async login(body: LoginBodyType) {
    try {
      const { email, password } = body;
      const { SALT } = await getSalt(email);
      const word = password + SALT;
      console.log(SALT);

      const encPassword = CryptoJs.SHA256(word).toString();
      console.log(encPassword);

      const userInfo = await _dbQuery(loginSql(email, encPassword));
      console.log(userInfo);
      return userInfo;
    } catch (error) {
      console.log(`error ${error}`);
      return { status: 403 };
    }
  }
}
