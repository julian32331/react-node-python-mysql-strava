/**
 * Description: Reducer of the login
 * Date: 12/28/2018
 */

import * as Actions from '../actions';

const initialState = {
    status: false,
    errorMsg: "",
    companyData: null
};

const auth = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN:
            {
                return {
                    ...initialState,
                    status: false
                };
            }
        case Actions.LOG_OUT: {
            return {
                ...initialState,
                status: false
            }
        }
        case Actions.LOGIN_SUCCESS:
            {
                return {
                    ...initialState,
                    status: true
                };
            }
        case Actions.LOGIN_ERROR:
            {
                return {
                    status: false,
                    errorMsg: action.errorMsg
                };
            }
        case Actions.REGISTER:
            {
                return {
                    ...initialState,
                    status: false
                }
            }
        case Actions.REGISTER_FAILD:
            {
                return {
                    status: false,
                    errorMsg: action.errorMsg
                };
            }
        case Actions.REGISTER_SUCCESS:
            {
                return {
                    ...initialState
                };
            }
        case Actions.EMAIL_VERIFY_SUCCESS:
            {
                return {
                    ...initialState
                };
            }
        case Actions.EMAIL_VERIFY_ERROR:
            {
                return {
                    ...initialState
                };
            }
        case Actions.EMAIL_VERIFY:
            {
                return {
                    ...initialState
                };
            }
        default:
            {
                return state
            }
    }
};

export default auth;