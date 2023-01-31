import {
  NoticeRegisterBodyType,
  EditNoticeBodyType,
} from './../@types/notice.d';
import {
  editNoticeSql,
  insertNoticeSql,
  detailNoticeSql,
  deleteNoticeSql,
  getNoticeListSql,
  getTargetListSql,
  insertNoticeLogSql,
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
      const notice = await _dbQuery(insertNoticeSql, [
        body.title,
        body.content,
        body.target,
        body.userIdx,
      ]);
      const targetList = await _dbQuery(getTargetListSql(body.target));
      targetList.map(async (item: { student_idx: number }) => {
        await _dbQuery(insertNoticeLogSql, [notice.insertId, item.student_idx]);
      });
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
