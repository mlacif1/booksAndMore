import { SET_LANGUAGE, SET_FILTER_BY } from './types';

export const setLanguage = payload => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SET_LANGUAGE,
      payload
    });
    resolve();
  })
};

export const setFilterBy = payload => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SET_FILTER_BY,
      payload
    });
    resolve();
  })
};

