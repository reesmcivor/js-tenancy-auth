import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { AuthContext } from 'js-tenancy-auth/store/AuthContext';
import userApi from 'js-tenancy-auth/api/user';
import EmailAction from "js-tenancy-core/components/actions/EmailAction";

const ActivateAccountScreen = ({ route, navigation }) => { 

    const authCtx = useContext(AuthContext);
    const callback = async() => {
        let decodedUrl = decodeURIComponent(route.params.activationLink);
    
        const response = await userApi.verifyEmail( decodedUrl );
    
        if(!response.ok) {
            console.error(response?.data?.message)
            setError(`There has been an issue logging in: ${response?.data?.message}`);
        } else {
            authCtx.verify(true);   
        }
    };
    
    useEffect(() => {
        console.log('activate account screen link: ' + route?.params?.activationLink);
        route?.params?.activationLink && callback();
    }, []);
    
    return (
        <>
            <Text>{ JSON.stringify(authCtx) }</Text>
            <EmailAction 
                backAction={() => navigation.navigate('Login', 'AuthStack')}
                title="Activate Account" 
                description="You have just been sent a verification link to your email" />
        </>
    );
};

export default ActivateAccountScreen;