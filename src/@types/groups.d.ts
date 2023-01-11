export type MakeGroupBodyType = {
  teacherIdx: number;
  groupName: string;
  studentIdxs: number[];
};

export type EditGroupBodyType = {
  groupIdx: number;
  groupName: string;
  studentIdxs: number[];
};

export type DeleteGroupBodyType = {
  groupIdx: number;
};
