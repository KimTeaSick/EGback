import { getSalt } from './../common/salt';
import {
  EditBody,
  SignUpBodyType,
  LoginBodyType,
  UserSearchBodyType,
} from './../@types/users.d';
import {
  loginSql,
  singupSql,
  userIdxSql,
  userListSql,
  editNameSql,
  groupMoveSql,
  registUserSql,
  userSearchSql,
  emailCheckSql,
  editNumberSql,
  userAdmissionSql,
  userNoticeLogSql,
} from './../sql/users';
import { _dbQuery, _dbQueryOne } from 'src/common/mysql';
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
      const encPassword = CryptoJs.SHA256(word).toString();
      const userInfo = await _dbQuery(loginSql(email, encPassword));
      return userInfo;
    } catch (error) {
      console.log(`error ${error}`);
      return { status: 403 };
    }
  }

  userSearch(body: UserSearchBodyType) {
    const { searchData, sortation } = body;
    return _dbQuery(userSearchSql(searchData, sortation));
  }
  async emailCheck(body: { email: string }) {
    console.log(body);
    const { email } = body;
    let use = false;
    const result = await _dbQueryOne(emailCheckSql(email));
    console.log('emailResult', result.emailCount);
    if (result.emailCount !== 0) use = true;
    return use;
  }

  async userList() {
    const idx = await _dbQuery(userIdxSql);
    console.log(idx);

    const list = Promise.all(
      idx.map((item: { USER_IDX: number }) => {
        return _dbQueryOne(userListSql(item.USER_IDX));
      }),
    );
    console.log(list);

    return list;
  }

  async userAdmission(body: {
    admission: number;
    idx: number;
    group_idx: number;
  }) {
    await _dbQuery(userAdmissionSql, [body.admission, body.idx]);
    await _dbQuery(registUserSql, [body.group_idx, body.idx]);

    return { status: 200 };
  }

  userNoticeLog(idx: number) {
    return _dbQuery(userNoticeLogSql(idx));
  }

  async editUser(body: EditBody) {
    await _dbQuery(editNameSql, [body.name, body.user_idx]);
    await _dbQuery(editNumberSql, [body.number, body.user_idx]);
    await _dbQuery(groupMoveSql, [body.group_idx, body.user_idx]);
    return { status: 200 };
  }
}
