/**
 * Actions
 */
export enum EActions {
  HTTP_GET_GITHUB_USER = "@LOGIN/HTTP_GET_GITHUB_USER",
  HTTP_GET_GITHUB_USER_SUCCESS = "@LOGIN/HTTP_GET_GITHUB_USER_SUCCESS",
  HTTP_GET_GITHUB_USER_FAIL = "@LOGIN/HTTP_GET_GITHUB_USER_FAIL",

  UPDATE_POST_COMMENT = "@LOGIN/UPDATE_POST_COMMENT"
}

/**
 * State
 */
export interface IState {
  readonly isFetching: boolean;
  readonly hasErrors: boolean;
  readonly message: string;
  readonly user: any;
}

/**
 * Action Creators
 */
