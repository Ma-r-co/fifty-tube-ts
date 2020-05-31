export const START_REQUEST = 'START_REQUEST' as const;
export const RECEIVE_DATA = 'RECEIVE_DATA' as const;
export const FINISH_REQUEST = 'FINISH_REQUEST' as const;

export type Video = {
  commentCount: string;
  dislikeCount: string;
  duration: string;
  favoriteCount: string;
  id: string;
  likeCount: string;
  publishedAt: string;
  tags: string[];
  title: string;
  viewCount: string;
}

export type Videos = Video[];

export interface VideoListState {
  queryWord: string | undefined,
  videos: Videos | undefined,
  error: boolean,
};
