import {
  NoticeRegisterBodyType,
  EditNoticeBodyType,
} from './../@types/notice.d';
import {
  getNoticeListSql,
  insertNoticeSql,
  detailNoticeSql,
  editNoticeSql,
  deleteNoticeSql,
} from './../sql/notice';
import { Injectable } from '@nestjs/common';
import { _dbQuery } from 'src/common/mysql';

@Injectable()
export class NoticeService {
  getNoticeList() {
    return _dbQuery(getNoticeListSql);
  }

  detailNotice(body: { num: number }) {
    return _dbQuery(detailNoticeSql(body.num));
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
  async editNotice(body: EditNoticeBodyType) {
    const { num, title, content } = body;
    await _dbQuery(editNoticeSql, [title, content, num]);
    return { status: 200 };
  }

  async deleteNotice(body: { num: number }) {
    await _dbQuery(deleteNoticeSql(body.num));
    return { status: 200 };
  }
}
