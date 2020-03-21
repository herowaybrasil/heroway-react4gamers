import { Dispatch, Reducer } from 'redux';

import { EActions, IState } from './types';

const INITIAL_STATE: IState = {
  isFetching: false,
  hasErrors: false,
  posts: []
};
const reducer: Reducer<IState> = (state = INITIAL_STATE, action): IState => {
  switch (action.type) {
    case EActions.HTTP_GET_POSTS:
      return {
        isFetching: true,
        hasErrors: state.hasErrors,
        posts: state.posts
      };

    case EActions.HTTP_GET_POSTS_SUCCESS:
      return {
        isFetching: false,
        hasErrors: false,
        posts: action.payload.posts
      };

    case EActions.HTTP_GET_POSTS_FAIL:
      return {
        isFetching: false,
        hasErrors: true,
        posts: INITIAL_STATE.posts
      };

    case EActions.UPDATE_POST_COMMENT: {
      const newPosts = state.posts.map((post: any) => {
        if (post.id === action.payload.postId) {
          post.comments.push(action.payload.comment);
        }

        return post;
      });

      return {
        isFetching: false,
        hasErrors: false,
        posts: newPosts
      };
    }

    default:
      return state;
  }
};

export const getPosts = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: EActions.HTTP_GET_POSTS, payload: null });

    try {
      const url = "https://us-central1-heroway-react-facebook.cloudfunctions.net/app/posts";
      // const url = "http://localhost:5000/heroway-react-facebook/us-central1/app/posts";

      const response = await fetch(url);
      const json = await response.json();

      dispatch({ type: EActions.HTTP_GET_POSTS_SUCCESS, payload: json });
    } catch (error) {
      dispatch({ type: EActions.HTTP_GET_POSTS_FAIL, payload: error });
    }
  };
};

export default reducer;
