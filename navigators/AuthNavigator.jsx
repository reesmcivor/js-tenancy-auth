import { LoginScreen, ActivateAccountScreen } from 'js-tenancy-auth/screens';
import { createStackNavigator } from '@react-navigation/stack';

const AuthNavigator = () => {

    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Activate Account" component={ActivateAccountScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;