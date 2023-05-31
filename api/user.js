import apiClient from "js-tenancy-core/api/client";

const lookupEndpoint = '/user/lookup';
const lookup = user => apiClient.get(lookupEndpoint, {email: email});

const loginEndpoint = '/user/login';
const login = user => apiClient.post(loginEndpoint, user);

const registerEndpoint = '/user/register';
const register = user => apiClient.post(registerEndpoint, user);

const forgotPasswordEndpoint = '/user/forgot_password';
const forgot = email => apiClient.post(forgotPasswordEndpoint, email);

const setPasswordEndpoint = '/user/set_password';
const setPassword = setPasswordRequest => apiClient.post(setPasswordEndpoint, setPasswordRequest);

const logoutEndpoint = '/user/logout';
const logout = () => apiClient.post(logoutEndpoint);

const verifyEmail = setVerifyEmailEndpoint => apiClient.get(setVerifyEmailEndpoint);

const profileEndpoint = '/user';
const profile = user => apiClient.get(profileEndpoint, user); 

export default {
    login, 
    logout,
    register,
    forgot, 
    setPassword, 
    profile,
    verifyEmail
}