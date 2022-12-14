import { makeGroupSql, groupMappingSql } from './../sql/groups';
import { MakeGroupBodyType } from './../@types/groups.d';
import { Injectable } from '@nestjs/common';
import { _dbQuery, _dbQueryOne } from 'src/common/mysql';

@Injectable()
export class GroupsService {
  async makeGroup(body: MakeGroupBodyType) {
    const { teacherIdx, groupName, studentIdxs } = body;
    const groupIdx = await _dbQuery(makeGroupSql, [groupName, teacherIdx]);
    studentIdxs.map(
      async (studentIdx: number) =>
        await _dbQuery(groupMappingSql, [groupIdx.insertId, studentIdx]),
    );
    return { status: 200 };
  }
}
