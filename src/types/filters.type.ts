export enum Statuses {
  ALL = 'All',
  COMPLETED = 'Completed',
  UNCOMPLETED = 'Uncompleted',
  FAVORITES = 'Favorites',
}

export type TFilter = {
  byStatus: Statuses;
  byUserId: number | string;
  search: string;
};

export const statusesOptions = Object.values(Statuses);
