export type SignUpBodyType = {
  name: string;
  email: string;
  password: string;
  number: string;
  nickname?: string;
};

export type LoginBodyType = {
  id: string;
  password: string;
};
