import mysql from 'mysql2';

const _dbConn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'EGDB',
  port: 3306,
  password: '8556',
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
