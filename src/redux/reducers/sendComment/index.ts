import { Dispatch, Reducer } from 'redux';

import { IAppState } from '../../configureStore';
import { EActions as EPostActions } from '../posts/types';
import { EActions, IState } from './types';

const INITIAL_STATE: IState = {
  isSending: false,
  hasErrors: false,
  typing: false
};
const reducer: Reducer<IState> = (state = INITIAL_STATE, action): IState => {
  switch (action.type) {
    case EActions.UPDATE_COMMENT_TYPING:
      return {
        isSending: state.isSending,
        hasErrors: state.hasErrors,
        typing: action.payload
      };

    case EActions.HTTP_SEND_COMMENT:
      return {
        isSending: true,
        hasErrors: state.hasErrors,
        typing: state.typing
      };

    case EActions.HTTP_SEND_COMMENT_SUCCESS:
      return {
        isSending: false,
        hasErrors: false,
        typing: state.typing
      };

    case EActions.HTTP_SEND_COMMENT_FAIL:
      return {
        isSending: false,
        hasErrors: true,
        typing: state.typing
      };

    default:
      return state;
  }
};

export const updateCommentTyping = (isTyping: boolean) => {
  return {
    type: EActions.UPDATE_COMMENT_TYPING,
    payload: isTyping
  };
};

export const sendComment = (postId: number, comment: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: EActions.HTTP_SEND_COMMENT, payload: null });

    try {
      const state: IAppState = getState();

      const url = `https://us-central1-heroway-react-facebook.cloudfunctions.net/app/posts/${postId}/comment`;
      // const url = `http://localhost:5000/heroway-react-facebook/us-central1/app/posts/${postId}/comment`;

      const options = {
        method: "POST",
        body: JSON.stringify({
          login: state.login.user.login,
          avatar_url: state.login.user.avatar_url,
          comment: comment
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };

      const response = await fetch(url, options);
      const json = await response.json();

      dispatch({ type: EActions.HTTP_SEND_COMMENT_SUCCESS, payload: json });
      dispatch({ type: EPostActions.UPDATE_POST_COMMENT, payload: json });
    } catch (error) {
      dispatch({ type: EActions.HTTP_SEND_COMMENT_FAIL, payload: error });
    }
  };
};

export default reducer;
