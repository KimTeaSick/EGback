import {
  makeGroupSql,
  editGroupSql,
  groupMappingSql,
  deleteGroupSql,
} from './../sql/groups';
import {
  MakeGroupBodyType,
  EditGroupBodyType,
  DeleteGroupBodyType,
} from './../@types/groups.d';
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

  async editGroup(body: EditGroupBodyType) {
    const { groupIdx, groupName, studentIdxs } = body;
    await _dbQuery(editGroupSql, [groupName, groupIdx]);
    await _dbQuery(groupMappingSql, [groupIdx, studentIdxs]);
    return { status: 200 };
  }

  async deleteGroup(body: DeleteGroupBodyType) {
    const { groupIdx } = body;
    await _dbQuery(deleteGroupSql(groupIdx));
    return { status: 200 };
  }
}
