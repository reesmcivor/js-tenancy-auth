
import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    notifications: [],
    isVerified: false,
    verify: (verified) => {},
    authenticate: (token) => {}, 
    logout: () => {}
});

function AuthContextProvider({ children }) 
{
    const [authToken, setAuthToken] = useState();
    const [isVerified, setIsVerified] = useState();

    function verify(verified) {
        setIsVerified(verified);
        AsyncStorage.setItem('verified', '"' + verified + '"');
    }
    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    } 
    function logout() {
        AsyncStorage.removeItem('token');
        setAuthToken();
    }
    const value = {
        token: authToken, 
        isAuthenticated: !!authToken, 
        isVerified: !!isVerified,
        verify: verify,
        authenticate: authenticate, 
        logout: logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}



export default AuthContextProvider;