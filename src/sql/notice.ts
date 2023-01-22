export const getNoticeListSql = `
SELECT u.NAME, n.TITLE, n.CONTENT, n.REG_DATE, n.NOTICE_IDX
FROM NOTICE n LEFT JOIN USER u ON n.WRITER_IDX = u.USER_IDX 
ORDER BY REG_DATE DESC`;

export const insertNoticeSql = `INSERT INTO NOTICE (TITLE, CONTENT, WRITER_IDX)VALUES (?,?,?)`;

export const detailNoticeSql = (num: number) =>
  `SELECT u.NAME, n.TITLE, n.CONTENT, n.REG_DATE, n.NOTICE_IDX
  FROM NOTICE n LEFT JOIN USER u ON n.WRITER_IDX = u.USER_IDX
  WHERE NOTICE_IDX = ${num}`;

export const editNoticeSql = `UPDATE NOTICE SET TITLE = ?, CONTENT = ? WHERE NOTICE_IDX = ?`;
export const deleteNoticeSql = (num: number) =>
  `DELETE FROM NOTICE WHERE NOTICE_IDX = ${num}`;
