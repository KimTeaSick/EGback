import {
  NoticeRegisterBodyType,
  EditNoticeBodyType,
} from './../@types/notice.d';
import { NoticeService } from './notices.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeservice: NoticeService) {}

  @Get('getNoticeList')
  getNoticeList(@Param() param: any) {
    return this.noticeservice.getNoticeList(param);
  }

  @Post('detailNotice')
  detailNotice(@Body() body: { num: number }) {
    return this.noticeservice.detailNotice(body);
  }

  @Post('postNotice')
  postNotice(@Body() body: NoticeRegisterBodyType) {
    return this.noticeservice.postNotice(body);
  }

  @Post('editNotice')
  editNotice(@Body() body: EditNoticeBodyType) {
    return this.noticeservice.editNotice(body);
  }

  @Post('deleteNotice')
  deleteNotice(@Body() body: { num: number }) {
    return this.noticeservice.deleteNotice(body);
  }
}
