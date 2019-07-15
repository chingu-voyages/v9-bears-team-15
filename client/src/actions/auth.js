import axios from 'axios';
// import { returnErrors } from './messages';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });
  
    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};
  
// LOGIN USER
export const login = (email, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Request Body
    const body = JSON.stringify({ email, password });

    axios
        .post("/api/auth/login", body, config)
        .then(res => {

            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            });
        })
        .catch(err => {
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
    };
  
    // REGISTER USER
    export const register = ({ username, password, email }) => dispatch => {
    // Headers
    const config = {
         headers: {
            "Content-Type": "application/json"
        }
    };
  
    // Request Body
    const body = JSON.stringify({ username, email, password });
    axios
        .post("/api/users", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
      .catch(err => {
            //dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
    };
  
    // LOGOUT USER
    export const logout = () => (dispatch) => {
    dispatch({ type: 'CLEAR_LEADS' });
    dispatch({
            type: LOGOUT_SUCCESS
    });
};
  
// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().authReducer.token;
  
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
  
    // If token, add to headers config
    if (token) {
        config.headers["x-auth-token"] = `${token}`;
    }
  
    return config;
};