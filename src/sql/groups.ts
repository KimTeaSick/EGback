export const makeGroupSql = `INSERT INTO EG_GROUP (NAME, TEACHER_IDX) VALUES (?, ?)`;
export const groupMappingSql = `INSERT INTO GROUP_MAPPING (GROUP_IDX, STUDENT_IDX) VALUES (?, ?)`;
export const editGroupSql = `UPDATE EG_GROUP SET NAME = ? WHERE GROUP_IDX = ?`;
export const deleteGroupSql = (num: number) =>
  `DELETE FROM EG_GROUP WHERE GROUP_IDX = ${num}`;
