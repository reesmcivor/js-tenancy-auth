import { LoginScreen } from '../Screens';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = () => {
    
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default AuthStack;