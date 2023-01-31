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

export type EditBody = {
  user_idx?: number;
  number?: string;
  group_idx?: number;
  name?: string;
};
