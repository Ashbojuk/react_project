import * as actionTypes from './userActionTypes';
import { checkLoginStatus } from '../helpers/auth';
import { LOADING } from './taskActionTypes';



const defaultState = {
  isAuthenticated: checkLoginStatus(),
  loading: false,
  successMessage: null,
  error: null,
  userInfo: null,
  sendContactFormSuccess: false
};


export const authReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
    case actionTypes.AUTH_LOADING: return loadingState;

    case LOADING:
      return {
        ...state,
        successMessage: null,
        error: null,
      };

    case actionTypes.AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: 'You have successfully registered!!!'
      };
    }

    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      };
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...defaultState,
        isAuthenticated: false
      };
    }

    case actionTypes.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo
      };
    }

    case actionTypes.SENDING_CONTACT_FORM: {
      return {
        ...loadingState,
        sendContactFormSuccess: false
      };
    }

    case actionTypes.SEND_CONTACT_FORM_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: 'Your message has been successfully sent!!!',
        sendContactFormSuccess: true
      };
    }

    default: return state;
  }

}; 