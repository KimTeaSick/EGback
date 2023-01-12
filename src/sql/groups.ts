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

export const groupDetailInfo = () => {};
