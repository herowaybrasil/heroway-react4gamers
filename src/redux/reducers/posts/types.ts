/**
 * Actions
 */
export enum EActions {
  HTTP_GET_POSTS = "@posts/HTTP_GET_POSTS",
  HTTP_GET_POSTS_SUCCESS = "@posts/HTTP_GET_POSTS_SUCCESS",
  HTTP_GET_POSTS_FAIL = "@posts/HTTP_GET_POSTS_FAIL",

  UPDATE_POST_COMMENT = "@posts/UPDATE_POST_COMMENT"
}

/**
 * State
 */
export interface IState {
  readonly isFetching: boolean;
  readonly hasErrors: boolean;
  readonly posts: any;
}

/**
 * Action Creators
 */
