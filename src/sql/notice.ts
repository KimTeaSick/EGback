export const getNoticeListSql = `SELECT * FROM NOTICE ORDER BY REG_DATE DESC`;
export const insertNoticeSql = `INSERT INTO NOTICE (TITLE, CONTENT, WRITER_IDX)VALUES (?,?,?)`;
