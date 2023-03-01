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
  admissionSql,
  registUserSql,
  userSearchSql,
  emailCheckSql,
  editNumberSql,
  userAdmissionSql,
  userNoticeLogSql,
  getGroup,
  rejectMemberSql,
} from './../sql/users';
import { _dbQuery, _dbQueryOne } from 'src/common/mysql';
import { Injectable } from '@nestjs/common';
import { makeSalt } from 'src/common/salt';
import CryptoJs from 'crypto-js';
import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  async signup(body: SignUpBodyType) {
    console.log(21312);
    try {
      const { name, email, number, password, sortation, pushToken } = body;
      console.log(
        'name, email, number, password',
        name,
        email,
        number,
        password,
      );

      const salt = makeSalt();
      console.log('salt', salt);

      const word = password + salt;
      const encPassword = CryptoJs.SHA256(word).toString();
      await _dbQuery(singupSql, [
        name,
        email,
        number,
        encPassword,
        salt,
        sortation,
        pushToken,
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
      console.log('SALT', SALT);
      const word = password + SALT;
      console.log('word', password + SALT);
      const encPassword = CryptoJs.SHA256(word).toString();
      console.log('email, encPassword', email, encPassword);
      const userInfo = await _dbQueryOne(loginSql(email, encPassword));
      console.log(userInfo);
      if (userInfo !== undefined) {
        // const groupIdx = await _dbQueryOne(getGroup(userInfo[0].USER_IDX));
        const token = jwt.sign(
          {
            type: 'JWT',
            userInfo: userInfo,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '2 days', // 만료시간 15분
            issuer: '토큰발급자',
          },
        );
        // userInfo.GROUP_IDX = groupIdx.GROUP_IDX;

        return {
          status: 200,
          userInfo: userInfo,
          message: '토큰이 발급되었습니다.',
          token: token,
        };
      } else {
        return {
          status: 204,
          message: '아이디 혹은 비밀번호가 틀렸습니다.',
        };
      }
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
    const userInfo = await _dbQueryOne(admissionSql(body.idx));

    return { status: 200, userInfo };
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

  async rejectMember(user_idx: number) {
    await _dbQueryOne(rejectMemberSql(user_idx));
    return {
      status: 200,
      message: '회원이 거절되었습니다.',
    };
  }
}
