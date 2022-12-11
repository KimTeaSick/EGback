import { getNoticeListSql } from './../sql/notice';
import { Injectable } from '@nestjs/common';
import { _dbQuery } from 'src/common/mysql';

@Injectable()
export class NoticeService {
  getNoticeList(param) {
    return _dbQuery(getNoticeListSql);
  }
}
