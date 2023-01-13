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
    return () => {

    };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { token: null, errorMessage: '' }
);
