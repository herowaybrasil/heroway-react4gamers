/**
 * Actions
 */
export enum EActions {
  HTTP_SEND_COMMENT = "@sendComment/HTTP_SEND_COMMENT",
  HTTP_SEND_COMMENT_SUCCESS = "@sendComment/HTTP_SEND_COMMENT_SUCCESS",
  HTTP_SEND_COMMENT_FAIL = "@sendComment/HTTP_SEND_COMMENT_FAIL",

  UPDATE_COMMENT_TYPING = "@sendComment/UPDATE_COMMENT_TYPING"
}

/**
 * State
 */
export interface IState {
  readonly isSending: boolean;
  readonly hasErrors: boolean;
  readonly typing: boolean;
}

/**
 * Action Creators
 */
