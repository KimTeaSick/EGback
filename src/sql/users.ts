export const singupSql = `INSERT INTO USER (NAME, EMAIL ,NUMBER, PASSWORD, SALT, SORTATION, PUSH_TOKEN) VALUES (?,?,?,?,?,?,?)`;

export const loginSql = (email: string, password: string) =>
  `SELECT * FROM USER WHERE EMAIL = "${email}" AND PASSWORD = "${password}"`;

export const getGroup = (idx: string) =>
  `SELECT * FROM GROUP_MAPPING WHERE STUDENT_IDX = "${idx}"`;

export const getSaltSql = (email: string) =>
  `SELECT SALT FROM USER WHERE EMAIL = "${email}"`;

export const userSearchSql = (searchData: string, sortation: string) =>
  `
  SELECT name, number, email, sortation FROM user 
  WHERE 1 and
  ${
    sortation === 'all'
      ? `name like "%${searchData}%" or NUMBER like "%${searchData}%" or EMAIL like "%${searchData}%"`
      : `${sortation} like "%${searchData}%"`
  } 
  `;

export const emailCheckSql = (email: string) => {
  return `SELECT count(email) as emailCount FROM USER WHERE EMAIL like "${email}"`;
};

export const userIdxSql = `select USER_IDX from USER`;

export const userListSql = (idx: number) => {
  return `
  SELECT u.USER_IDX, u.NAME, u.SORTATION, u.NUMBER, u.EMAIL, u.ADMISSION, u.IN_GROUP,GROUP_CONCAT(eg.NAME) as group_name, create_at, u.PUSH_TOKEN
  FROM USER u LEFT JOIN GROUP_MAPPING gm ON gm.STUDENT_IDX = u.USER_IDX 
  LEFT JOIN EG_GROUP eg ON eg.GROUP_IDX = gm.GROUP_IDX 
  WHERE u.USER_IDX = ${idx} ORDER BY USER_IDX DESC`;
};

export const userAdmissionSql = `UPDATE USER SET ADMISSION = ? WHERE USER_IDX = ?`;

export const userNoticeLogSql = (
  idx: number,
) => `select n.NOTICE_IDX, n.TITLE, n.CONTENT, n.REG_DATE 
from NOTICE n left join NOTICE_LOG nl on nl.NOTICE_IDX = n.NOTICE_IDX 
left join USER u on nl.TARGET_IDX = u.USER_IDX 
where u.USER_IDX = ${idx}`;

export const editNameSql = `UPDATE USER SET NAME = ?  WHERE USER_IDX = ?`;
export const editNumberSql = `UPDATE USER SET NUMBER = ?  WHERE USER_IDX = ?`;
export const groupMoveSql = `UPDATE GROUP_MAPPING SET GROUP_IDX = ?  WHERE STUDENT_IDX = ?`;

export const registUserSql = `INSERT INTO GROUP_MAPPING (GROUP_IDX, STUDENT_IDX) VALUES (?, ?)`;

export const admissionSql = (idx: number) =>
  `SELECT * FROM USER WHERE USER_IDX = "${idx}"`;

export const rejectMemberSql = (user_idx: number) =>
  `delete from USER WHERE USER_IDX = ${user_idx}`;
