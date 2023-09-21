import React, { useEffect, useState } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import {loginMethod} from './functions/methods'

import { getRealm } from "./db/realm"
// import Realm from "realm"

const Login = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onPressLogin = async ()  => {
        setLoading(true)
        const request = {email:email, password:password}
        const result = await loginMethod(request)

        if (result) {
            const {data} = result
            try {

                const realm = await getRealm()

                const response = realm.write(()=> {
                    realm.create('User', {
                        _id: data.id,
                        email: email,
                        access_token: data.access_token ,
                        created_at: new Date,
                    })
                })

                console.log(response)

                realm.close();    
                setLoading(false)
                navigation.navigate('Home')

            } catch (error) {
                setLoading(false)
                setError("Error saveLogin into method:" + error)
            }
        } else {
            setError("Error in login method")
            setLoading(false);
        }
    }
useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
})
 return (
 <SafeAreaView>
    <View style={style.container}>
       
        <View style={style.group}>
            <Text style={style.text}>Email</Text>
            <TextInput
                onChangeText={value => setEmail(value)} 
                style={style.input} 
                placeholder="Email"/>
        </View>
        <View style={style.group}>
            <Text style={style.text}>Password</Text>
            <TextInput 
                onChangeText={value => setPassword(value)} 
                style={style.input} 
                secureTextEntry={true}
                placeholder="Password"/>
        </View>
        <View>
            <Text style={style.error}>
                {(error) ? error : ''}
            </Text>
        </View>
        <View style={style.btngroup}>
            <Pressable style={style.btn} onPress={onPressLogin}>
                    
            <Text style={style.textbtn}>{ (loading)?'Carregando...':'Logar'}</Text>
        
        </Pressable>
        </View>
    </View>
 </SafeAreaView>)
}

const style = StyleSheet.create({
    container:{
        justifyContent:'center',
        marginTop: 20
    },
    group:{
        margin: 10,
    },
    input:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        color:'black'
    },
    btngroup:{
        justifyContent:'center',
    },
    btn:{
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'green'
    },
    text:{
        color:"black"
    },
    textbtn:{
        color:"white",
        fontSize:18
    },
    error:{
        fontSize:18
    }
})

export default Login;