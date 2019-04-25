import axios from 'axios';
import store from './store.js';
import * as Actions from 'store/actions';
var baseUrl = 'http://127.0.0.1:3001/api/'
export const xapi = (optional) => {
    let token = null;
    if (store.getState().user.access_token) {
        token = store.getState().user.access_token;
    } else {
        token = localStorage.token;
    }

    let headers = null;

    if (token) {
        headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': optional
        }
    }

    let xapi = axios.create({
        baseURL: baseUrl,
        headers: headers
    });

    // Check expired token
    // xapi.interceptors.response.use(undefined, function(err) {
    //     if (err.response.status === 401) {
    //         store.dispatch(Actions.logout());
    //     }
    // });

    return xapi;
};

export function register(params) {
    return axios.post(baseUrl + 'auth/emailregister', {
        ...params
    })
}
export function login(params) {
    return axios.post(baseUrl + 'auth/login', {
        ...params
    })
}
export function verifyEmail(token) { 
    return axios.post(baseUrl + 'auth/emailverify', {
        token: token
    })
}

export function GetConnection() {
    return xapi().get('account/login');
    return axios.get(baseUrl + 'account/login')
}


export function gettingToken(code) {
    return xapi().post('account/token',{
        code: code
    });
    return axios.post(baseUrl + 'account/token', {
        code: code
    });
}

export function getOptions() {
    return xapi().get('options');
    return axios.get(baseUrl + 'options')
}

export function getuseroptions() {
    return xapi().get('getuserlistoptions');
    return axios.get(baseUrl + 'getuserlistoptions')
}

export function convertGPX(params) {
    return xapi('application/octet-stream').post('gpxfileupload',params);
 
    return axios.post(baseUrl + 'gpxfileupload', {
        params
    }, { headers: { 'Content-Type': 'application/octet-stream' } })
}

export function gettingStravaData(stravaId, email) {
    return xapi().get('getuserlistoptions');
 
    return axios.post(baseUrl + 'account/getStrava', {
        stravaId: stravaId,
        email: email,
        pageNum: 0
    })
}

export function getuseroption(id) {
    return xapi().post('getuseroption',{id}); 
    return axios.post(baseUrl + 'getuseroption', {
        id
    })
}

export function setUserData(profile) {
    return xapi().post('account/updateprofile',{
        profile
    }); 
    return axios.post(baseUrl + 'account/updateprofile', {
        profile
    })
}




