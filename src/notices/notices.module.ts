import { NoticeController } from './notices.controller';
import { NoticeService } from './notices.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [NoticeService],
  controllers: [NoticeController],
  exports: [NoticeService],
})
export class NoticesModule {}
