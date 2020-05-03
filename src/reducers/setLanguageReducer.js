import { SET_LANGUAGE } from "../actions/types";
import { AVAILABLE_LANGUAGES } from "../util/constants";

const browserLang = navigator.language || navigator.userLanguage;
const initialUserLanguage = browserLang ? browserLang.split('-')[0] : 'en';

const initialState = {
  language: localStorage.getItem("language")
    ? JSON.parse(localStorage.getItem("language"))
    : AVAILABLE_LANGUAGES.indexOf(initialUserLanguage) > -1 ? initialUserLanguage : 'en'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      localStorage.setItem("language", JSON.stringify(action.payload));
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
}
