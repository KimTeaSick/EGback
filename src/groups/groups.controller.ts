import {
  MakeGroupBodyType,
  EditGroupBodyType,
  DeleteGroupBodyType,
} from './../@types/groups.d';
import { GroupsService } from './groups.service';
import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/stringToInt.pipe';

@Controller('group')
export class GroupsController {
  constructor(private readonly groupsservice: GroupsService) {}

  @Get('groupList/:idx')
  getGroupList(
    @Param('idx', ValidationPipe) idx: number,
    @Query('sortation', ValidationPipe) sortation: number,
  ) {
    return this.groupsservice.getGroupList(idx, sortation);
  }

  @Post('makeGroup')
  makegroup(@Body() body: MakeGroupBodyType) {
    return this.groupsservice.makeGroup(body);
  }

  @Post('editGroup')
  editgroup(@Body() body: EditGroupBodyType) {
    return this.groupsservice.editGroup(body);
  }

  @Post('deleteGroup')
  deletegroup(@Body() body: DeleteGroupBodyType) {
    return this.groupsservice.deleteGroup(body);
  }

  @Post('groupInfoList')
  groupPeopleCount() {
    return this.groupsservice.groupPeopleCount();
  }

  @Post('groupDetailInfo')
  groupDetailInfo(@Body() body: { idx: number }) {
    return this.groupsservice.groupDetailInfo(body.idx);
  }

  @Post('groupMemberPush')
  groupMemberPush(@Body() body: { groupIdx: number; studentIdxs: number[] }) {
    return this.groupsservice.groupMemberPush(body);
  }

  @Post('getGroupTokens')
  getGroupTokens(@Body() body: any) {
    return this.groupsservice.getPushToken(body.idxs);
  }
}
