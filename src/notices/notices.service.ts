import { Injectable } from '@nestjs/common';
import { _dbConn } from 'src/common/mysql';

@Injectable()
export class NoticeService {
  getNoticeList(param) {
    console.log(_dbConn);
  }
}
