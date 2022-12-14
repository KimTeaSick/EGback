import { NoticeRegisterBodyType } from './../@types/notice.d';
import { NoticeService } from './notices.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeservice: NoticeService) {}

  @Get('getNoticeList')
  getNoticeList(@Param() param: any) {
    return this.noticeservice.getNoticeList(param);
  }

  @Post('postNotice')
  postNotice(@Body() body: NoticeRegisterBodyType) {
    return this.noticeservice.postNotice(body);
  }
}
