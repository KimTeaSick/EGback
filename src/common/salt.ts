import { getSaltSql } from 'src/sql/users';
import { _dbQueryOne } from './mysql';

export const makeSalt = (): string => {
  return Math.random().toString(36).substring(2, 12);
};

export const getSalt = (email: string) => {
  return _dbQueryOne(getSaltSql(email));
};
