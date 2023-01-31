export type NoticeRegisterBodyType = {
  title: string;
  content: string;
  userIdx: number;
  target: number;
};

export type EditNoticeBodyType = {
  num: number;
  title: string;
  content: string;
};
