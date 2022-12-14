import { NoticeRegisterBodyType } from './../@types/notice.d';
import { getNoticeListSql, insertNoticeSql } from './../sql/notice';
import { Injectable } from '@nestjs/common';
import { _dbQuery } from 'src/common/mysql';

@Injectable()
export class NoticeService {
  getNoticeList(param) {
    return _dbQuery(getNoticeListSql);
  }

  async postNotice(body: NoticeRegisterBodyType) {
    try {
      await _dbQuery(insertNoticeSql, [body.title, body.content, body.userIdx]);
      return { status: 200 };
    } catch (error) {
      console.log(`error ${error}`);
      return { status: 403 };
    }
  }
}
