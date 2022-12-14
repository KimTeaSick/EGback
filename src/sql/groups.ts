export const makeGroupSql = `INSERT INTO EG_GROUP (NAME, TEACHER_IDX) VALUES (?, ?)`;
export const groupMappingSql = `INSERT INTO GROUP_MAPPING (GROUP_IDX, STUDENT_IDX) VALUES (?, ?)`;
