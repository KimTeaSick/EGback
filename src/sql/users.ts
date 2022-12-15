export const singupSql = `INSERT INTO USER (NAME, EMAIL ,NUMBER, PASSWORD, SALT, SORTATION) VALUES (?,?,?,?,?,?)`;

export const loginSql = (email: string, password: string) =>
  `SELECT * FROM USER WHERE EMAIL = "${email}" AND PASSWORD = "${password}"`;
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
