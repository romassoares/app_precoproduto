import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import * as func from './services/functions';

function Login() {
    const handleLogin = async () =>{
        // console.log("asdfa");
        const response = await func.api_login({
            email:'antonio@email.com',
            password:'12345678'
        })
        // console.log()
    }
    return (
        <View>
            <TouchableOpacity onPress={()=>{handleLogin()}}><Text>Click me!</Text></TouchableOpacity>
        </View>
    );
}

export default Login;