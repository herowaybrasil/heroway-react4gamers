import { Dispatch, Reducer } from 'redux';

import { EActions, IState } from './types';

const INITIAL_STATE: IState = {
  isFetching: false,
  hasErrors: false,
  message: "",
  user: null
};
const reducer: Reducer<IState> = (state = INITIAL_STATE, action): IState => {
  switch (action.type) {
    case EActions.HTTP_GET_GITHUB_USER:
      return {
        isFetching: true,
        hasErrors: state.hasErrors,
        user: state.user,
        message: INITIAL_STATE.message
      };

    case EActions.HTTP_GET_GITHUB_USER_SUCCESS:
      return {
        isFetching: false,
        hasErrors: false,
        user: action.payload.user,
        message: action.payload.message
      };

    case EActions.HTTP_GET_GITHUB_USER_FAIL:
      return {
        isFetching: false,
        hasErrors: true,
        user: INITIAL_STATE.user,
        message: action.payload.message
      };

    default:
      return state;
  }
};

export const getGithubUser = (username: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: EActions.HTTP_GET_GITHUB_USER, payload: null });

    try {
      const userURL = `https://api.github.com/search/users?q=${username}`;

      const usersResponse = await fetch(userURL);
      const response = await usersResponse.json();

      let payload = {};
      if (response.total_count !== 0) {
        payload = {
          message: "",
          user: response.items[0]
        };
      } else {
        payload = {
          message: "Usuário não encontrado"
        };
      }

      dispatch({ type: EActions.HTTP_GET_GITHUB_USER_SUCCESS, payload });
    } catch (error) {
      const payload = {
        message: "Ops! Algo de errado aconteceu"
      };

      dispatch({ type: EActions.HTTP_GET_GITHUB_USER_FAIL, payload });
    }
  };
};

export default reducer;
