import { MakeGroupBodyType } from './../@types/groups.d';
import { GroupsService } from './groups.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('group')
export class GroupsController {
  constructor(private readonly groupsservice: GroupsService) {}

  @Post('makeGroup')
  makegroup(@Body() body: MakeGroupBodyType) {
    return this.groupsservice.makeGroup(body);
  }
}
