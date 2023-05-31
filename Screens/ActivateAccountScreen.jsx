import { useEffect } from "react";
import useAuth from "js-tenancy-auth/hooks/useAuth";
import userApi from 'js-tenancy-auth/api/user';
import EmailAction from "js-tenancy-core/components/actions/EmailAction";

const ActivateAccountScreen = ({ route, navigation }) => { 

    const auth = useAuth();

    const callback = async() => {

        try {
            let decodedUrl = decodeURIComponent(route.params.activationLink);
            const response = await userApi.verifyEmail( decodedUrl );
        
            if(!response.ok) {
                //console.error(response?.data?.message)
                setError(`There has been an issue logging in: ${response?.data?.message}`);
            } else {
                console.log(response?.data);
                auth.verifyUser();
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        //console.log('activate account screen link: ' + route?.params?.activationLink);
        route?.params?.activationLink && callback();
    }, [route?.params?.activationLink]);
    
    return (
        <>
            <EmailAction 
                backAction={() => navigation.navigate('Login', 'AuthStack')}
                title="Activate Account" 
                description="You have just been sent a verification link to your email" />
        </>
    );
};

export default ActivateAccountScreen;