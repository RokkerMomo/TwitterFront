import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native';
import React, {useState} from 'react'
import env from '../env';

const Login = ({navigation}) => {

  let msg ="";

    const [state,setstate] = useState({
       usuario:'',
       password:'' 
    })

    const createTwoButtonAlert = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


    let ingresar = async (user,pass)=>{
    const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario:`${user}`,
      password:`${pass}`,
    })}
      //axios
      await fetch(`${env.SERVER.URI}/signIn`,requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
          msg="error";
        }else{}
        return res.json();
      }).then(
        (result) =>{
          if (msg=="error") {
            msg=result.msg
          createTwoButtonAlert();
          }else{
            navigation.navigate('Drawer', {
              screen: 'Drawer',
              params: { 
                token:result.token,
                userid:result.user._id,},
            });
            console.log(result);
          }
        }
      )
     }
    
     
  return (
    <View style={styles.Body}>
       
        <View style={styles.Carta}>
        <Text style={styles.Titulo}> Inicio de sesión</Text>
          <TextInput onChangeText={(value) => setstate({...state, usuario:value})} placeholder='Usuario' style={styles.Input}></TextInput>
          <TextInput onChangeText={(value) => setstate({...state, password:value})} secureTextEntry={true} placeholder='Password' style={styles.Input}></TextInput>
          <Pressable onPress={()=>{ingresar(state.usuario,state.password)}} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(0, 255, 56, 0.20)' : 'transparent',
            },
            styles.Ingreso,
          ]}>
        <Text style={styles.textIngresar}>Ingresar</Text>
      </Pressable>
          <Pressable onPress={()=>{navigation.navigate('Register')}} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(6, 153, 240, 0.2)' : 'transparent',
            },
            styles.Registro,
          ]}>
          <Text style={styles.textRegistro}>Registro</Text>
          </Pressable>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    Body:{
        flex: 1,
        backgroundColor: '#637885',
        alignItems: 'center',
        justifyContent: 'center',
    
      },
    Titulo:{
      color: '#FFFFFF',
      fontSize:24,
      fontWeight:"bold",
      marginBottom:12,
    
    
    },
    Carta:{
      backgroundColor:'#16202A',
      width:281,
      height:250,
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
    
    
    },
    Input:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom:10,
      paddingLeft:5,
      height:35,
    },
    
    Ingreso:{
      width:103,
      height:35,
      color:'#00FF38',
      borderColor:'#00FF38',
      borderRadius:5,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:69,
      marginBottom:10,
      
    
    },
    
    textIngresar:{
      color:'#00FF38',
    },
    
    Registro:{
      width:103,
      height:35,
      borderColor:'#239EEC',
      borderRadius:5,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:69,
    },
    
    textRegistro:{
      color:'#239EEC',
    },
    
})

export default Login