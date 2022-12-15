export type SignUpBodyType = {
  name: string;
  email: string;
  password: string;
  number: string;
  sortation: number;
};

export type LoginBodyType = {
  email: string;
  password: string;
};

export type UserSearchBodyType = {
  sortation: string;
  searchData: string;
};
