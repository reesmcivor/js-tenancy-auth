import { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Buttons from 'js-tenancy-core/components/Buttons';

import { AntDesign } from '@expo/vector-icons';
import { AppForm, AppInputText, ErrorMessage } from 'js-tenancy-core/components/form';

import * as Yup from 'yup';
import userApi from 'js-tenancy-auth/api/user';
import TitleAndDescription from 'js-tenancy-auth/components/TitleAndDescription';
import * as Linking from 'expo-linking';
import useAuth from 'js-tenancy-auth/hooks/useAuth';

const LoginScreen = ({ navigation }) => { 

    const auth = useAuth();
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    const login = async (formValues) => {

        const verifyAccountBaseLink = Linking.createURL('/activate-account');
        const response = await userApi.login({...formValues, device_name: 'mobileApplication', link: verifyAccountBaseLink});

        console.log(response);

        if(!response.ok) {
            setError(`There has been an issue logging in: ${response?.data?.message}`);
        } else {
            auth.logIn(response?.data);
            if(!response?.data?.verified) {
                navigation.navigate('Activate Account');
            }
        }

        setIsLoading(false);
    }

    if(isLoading) {
        return <View><Text>loading...</Text></View>
    }

    const loginSubmitHandler = () => formRef.current && formRef.current.handleSubmit();
      
    const validationSchema = Yup.object({
        email: Yup.string().email().required().label('Email'),
        password: Yup.string().required().label('Password'),
    })
    
    return (            
        <View className="flex flex-1 bg-blue-40">
            <ScrollView className="flex flex-1" contentContainerStyle={{ justifyContent: "between", itemsAlign: 'between', alignContent: 'between' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Landing') }} className="top-5 left-5 z-10">
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>

                <View className="flex-1 justify-between p-5 items-center">
                    <View className="flex-1 justify-center w-full max-w-md">
                        
                
                
                        <TitleAndDescription title={"Sign in"} description={"You must have had an active account"} />

                        {error && <ErrorMessage error={error} errorClassNames="mb-10 w-full justify-center"/>}

                        <AppForm
                            innerRef={formRef}
                            initialValues={{ email: 'test@logicrises.co.uk' }}
                            onSubmit={values => login(values)}
                            validationSchema={validationSchema}
                            validateOnBlur={false}
                        >
                            <View>
                                <AppInputText 
                                    name="email"
                                    label="Email"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    textContextType="emailAddress"
                                    autoCapitalize='none'
                                    placeholder={"Enter your email"}
                                    type="email"
                                />
                                <AppInputText 
                                    name="password"
                                    label="Password"
                                    autoCorrect={false}
                                    textContextType="password"
                                    autoCapitalize='none'
                                    placeholder={"Enter your password"}
                                    secureTextEntry
                                />
                            </View>
                        </AppForm>
                
                    

                    </View>
                    <View className="sm:max-w-xs w-full">
                        <Buttons.primary title="Login" buttonClassNames="w-full mb-3" 
                            onButtonPress={() => loginSubmitHandler()} 
                        />
                        <Buttons.transparent title="Forgot Password" buttonClassNames="w-full" 
                            onButtonPress={() => navigation.navigate('Forgot')} 
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;