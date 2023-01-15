import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
        return { ...state, errorMessage: action.payload };
    case 'signin':
        return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' }
    case 'signout':
        return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const signup = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const res = await trackerApi.post('/signup', { email, password });
            const { token } = res.data;
            await AsyncStorage.setItem('token', token);
            dispatch({ type: 'signin', token})

            // navigate to main flow
            navigate('TrackList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
        }
    };
};

const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const res = await trackerApi.post('/signin', { email, password });
            const { token } = res.data;
            await AsyncStorage.setItem('token', token);
            dispatch({ type: 'signin', token})

            // navigate to main flow
            navigate('TrackList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' });
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' });
        navigate('loginFlow');
    };
};

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({ type: 'clear_error_message' });
    };
};

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({ type: 'signin', payload: token });
            navigate('TrackList');
        } else navigate('loginFlow');
    };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
