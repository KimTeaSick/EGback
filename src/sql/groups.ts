export const makeGroupSql = `INSERT INTO EG_GROUP (NAME, TEACHER_IDX, COMMENT) VALUES (?, ?, ?)`;
export const groupMappingSql = `INSERT INTO GROUP_MAPPING (GROUP_IDX, STUDENT_IDX) VALUES (?, ?)`;
export const editGroupSql = `UPDATE EG_GROUP SET NAME = ? WHERE GROUP_IDX = ?`;
export const deleteGroupSql = (num: number) =>
  `DELETE FROM EG_GROUP WHERE GROUP_IDX = ${num}`;

export const myGroupNumberListSqlForTeacher = (idx: number) =>
  `select * from EG_GROUP where teacher_idx = ${idx}`;

export const myGroupNumberListSqlForStudent = (idx: number) =>
  `select * from GROUP_MAPPING where student_idx = ${idx}`;

export const myGroupListSqlForStudent = (idx: number) =>
  `select * from EG_GROUP where group_idx = ${idx}`;

export const groupPeopleCount = (idx: number) =>
  `select 
  eg.GROUP_IDX, 
  eg.name, 
  eg.COMMENT, 
  count(gm.STUDENT_IDX) as student_count,
  u.NAME as teacher_name 
  from EG_GROUP eg left join GROUP_MAPPING gm on gm.GROUP_IDX = eg.GROUP_IDX 
  left join USER u on u.USER_IDX = eg.TEACHER_IDX 
  where eg.GROUP_IDX = ${idx}`;

export const getIdxSql = `select GROUP_IDX from EG_GROUP `;

export const groupDetailInfo = (
  idx: number,
) => `select u.USER_IDX, u.NAME, u.EMAIL, u.NUMBER
  from GROUP_MAPPING gm left join USER u on gm.STUDENT_IDX  = u.USER_IDX 
  where gm.GROUP_IDX = ${idx}`;
