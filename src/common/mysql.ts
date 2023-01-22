import mysql from 'mysql2';

const _dbConn = mysql.createPool({
  host: 'database-1.cjm1jhtpnrvb.ap-northeast-1.rds.amazonaws.com',
  user: 'root',
  database: 'EGDB',
  port: 3306,
  password: 'wlztmd856',
});

function _dbQuery(sqlString: string, values?: any): any {
  return new Promise((resolve, reject) => {
    _dbConn.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

function _dbQueryOne(sqlString: string, values?: any): any {
  return new Promise((resolve, reject) => {
    _dbConn.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results[0]);
    });
  });
}

export { _dbConn, _dbQuery, _dbQueryOne };
