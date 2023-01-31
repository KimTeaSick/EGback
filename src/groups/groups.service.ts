import {
  getIdxSql,
  makeGroupSql,
  editGroupSql,
  deleteGroupSql,
  groupMappingSql,
  groupDetailInfo,
  groupPeopleCount,
  myGroupNumberListSqlForTeacher,
  myGroupNumberListSqlForStudent,
  myGroupListSqlForStudent,
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
  async getGroupList(idx: number, sortation: number) {
    let myGroupList = [];
    if (sortation === 1) {
      myGroupList = await _dbQuery(myGroupNumberListSqlForTeacher(idx));
    } else {
      const groupNumber = await _dbQuery(myGroupNumberListSqlForStudent(idx));
      groupNumber.map(async (number: number) => {
        const group = await _dbQuery(myGroupListSqlForStudent(number));
        myGroupList.push(group);
      });
    }
    return myGroupList;
  }

  async makeGroup(body: MakeGroupBodyType) {
    const { teacherIdx, groupName, studentIdxs, comment } = body;
    const groupIdx = await _dbQuery(makeGroupSql, [
      groupName,
      teacherIdx,
      comment,
    ]);
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

  async groupPeopleCount() {
    const idx = await _dbQuery(getIdxSql);
    const listData = await Promise.all(
      idx.map((group_idx: { GROUP_IDX: number }) => {
        const data = _dbQueryOne(groupPeopleCount(group_idx.GROUP_IDX));
        return data;
      }),
    );
    return listData;
  }

  groupDetailInfo(idx: number) {
    return _dbQuery(groupDetailInfo(idx));
  }
}
