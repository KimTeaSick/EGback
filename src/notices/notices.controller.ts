import { NoticeService } from './notices.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeservice: NoticeService) {}

  @Get('getNoticeList')
  getNoticeList(@Param() param: any) {
    return this.noticeservice.getNoticeList(param);
  }
}
