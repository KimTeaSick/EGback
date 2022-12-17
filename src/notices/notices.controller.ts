import {
  NoticeRegisterBodyType,
  EditNoticeBodyType,
} from './../@types/notice.d';
import { NoticeService } from './notices.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeservice: NoticeService) {}

  @Get('getNoticeList')
  getNoticeList() {
    return this.noticeservice.getNoticeList();
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
