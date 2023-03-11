import {Button, Pressable, StyleSheet, Text, TextInput, View,Alert,Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import React, {useState} from 'react'
import { firebase, UploadFile } from "../components/config/config";
import { MaterialIcons } from '@expo/vector-icons';
import env from '../env';

const Register = ({navigation}) => {
  const [image,setImage] = useState(null);
  const [mostrar,setmostrar] = useState(null);
  const [resultadoimagen,setresultadoimagen] = useState(null);
  const [uploading,setUploading] = useState(false);

  const pickImage = async () =>{
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
    const source = {uri:result.uri};
    console.log(source)
    console.log(result)
    setImage(source);
    setmostrar(result.assets[0].uri)
    }

  }

  const uploadImage = async (name,LastName,user,pass,bio) =>{
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    const result = await UploadFile(blob,filename)
    console.log(result)
    setresultadoimagen(result)

    const requestOptions = {
      method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombre:`${name}`,
    apellido:`${LastName}`,
    usuario:`${user}`,
    password:`${pass}`,
    bio:`${bio}`,
    foto:`${result}`
  })}

    fetch(`${env.SERVER.URI}/signup`,requestOptions)
    .then(res =>{
      console.log(res.status);
      if (res.status=="400"){
        console.log("error")
      }else{
        navigation.navigate('Login')

      }
      return res.json();
    }).then(
      (result) =>{
        console.log(result);
        msg=result.msg;
        createTwoButtonAlert();
      }
      
    )
  }

  let msg ="";
  
    const [state,setstate] = useState({
        nombre:'',
        apellido:'', 
        usuario:'',
        password:'',
        bio:'',
     })

     const createTwoButtonAlert = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

     
  return (
    <ScrollView>
    <View style={styles.Body}>
      <View style={styles.Carta}>
        <Text style={styles.datos}>Ingrese Sus Datos</Text>

        <TextInput onChangeText={(value) => setstate({...state, nombre:value})} placeholder='Nombre' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, apellido:value})} placeholder='Apellido' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, usuario:value})} placeholder='Usuario' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, password:value})} secureTextEntry={true} placeholder='Password' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, bio:value})} 
        editable
        multiline
        numberOfLines={4}
        maxLength={50} placeholder='Biografia (Opcional)' style={styles.InputBio}></TextInput>
        
        <Pressable onPress={pickImage} style={styles.agregarfoto}>
        {image && <Image source={{ uri: mostrar }} style={{ width: 200, height: 200, position:'absolute' }} />}
          <MaterialIcons name="add-a-photo" size={24} color="grey" />
          </Pressable>
        
      <Pressable onPress={()=>{uploadImage(state.nombre,state.apellido,state.usuario,state.password,state.bio)}} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(6, 153, 240, 0.2)' : 'transparent',
            },
            styles.Registro,
          ]}>
          <Text style={styles.textRegistro}>Registro</Text>
          </Pressable>

         

      </View>
     
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    datos:{
        color:'white',
        marginBottom:10
    },
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
      width:280,
      height:590,
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
    marginTop:10,
    marginBottom:10,
    
    },
    Input:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom:10,
      paddingLeft:5,
      height:35,
    },
    InputBio:{
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginBottom:10,
        paddingLeft:5,
        height:80,
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
      color:'#0699F0',
      borderColor:'#0699F0',
      borderRadius:5,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:69,
    },
    
    textRegistro:{
      color:'#0699F0',
    },
    agregarfoto:{
      backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginBottom:10,
        width: 200, height: 200,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
    }
    
})

export default Register