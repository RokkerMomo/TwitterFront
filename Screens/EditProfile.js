import {Button, Pressable, StyleSheet, Text, TextInput, View,Alert,Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import React, {useEffect, useState} from 'react'
import { firebase, UploadFile } from "../components/config/config";
import { MaterialIcons } from '@expo/vector-icons';
import env from '../env';
import { Ionicons } from '@expo/vector-icons';

const EditProfile = ({route,navigation}) => {
  const [image,setImage] = useState(null);
  const [mostrar,setmostrar] = useState(null);
  const [resultadoimagen,setresultadoimagen] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [nombre,onChangeNombre] = useState('Nombre')
  const [apellido,onChangeApellido] = useState('Apellido')
  const [usuario,onChangeUsuario] = useState('Usuario')
  const [bio,onChangeBio] = useState('Biografia')


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

  async function GetData (){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id:`${profileid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    await fetch(`${env.SERVER.URI}/finduser`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        setImage(result.foto)
        onChangeNombre(result.nombre)
        onChangeApellido(result.apellido)
        onChangeUsuario(result.usuario)
        onChangeBio(result.bio)
      }
    )
  }

  const uploadImage = async (name,LastName,user,bio) =>{
    // setUploading(true);
    // const response = await fetch(image.uri)
    // const blob = await response.blob();
    // const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    // const result = await UploadFile(blob,filename)
    // console.log(result)
    // setresultadoimagen(result)

    const requestOptions = {
      method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    _id:`${profileid}`,
    nombre:`${name}`,
    apellido:`${LastName}`,
    usuario:`${user}`,
    bio:`${bio}`,
    // foto:`${result}`
  })}

    fetch(`${env.SERVER.URI}/edituser`,requestOptions)
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
     const createTwoButtonAlert = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

    useEffect(()=>{
      GetData();
    },[])

    const {userid,profileid,Token} = route.params;
  return (
    <View style={styles.Body}>
      <View style={styles.Carta}>
        
        <Pressable onPress={pickImage} style={styles.agregarfoto}>
        {image && <Image source={{ uri: image&&image }} style={{ width: 100, height: 100, position:'absolute', borderRadius:50 }} />}
          {!image &&<MaterialIcons name="add-a-photo" size={24} color="grey" />}
          </Pressable>

        <Text style={styles.datos}>Datos Personales</Text>
        <TextInput onChangeText={onChangeNombre} value={nombre} placeholder='Nombre' style={styles.Input}></TextInput>
        <TextInput onChangeText={onChangeApellido} value={apellido} placeholder='Apellido' style={styles.Input}></TextInput>
        <TextInput onChangeText={onChangeUsuario} value={usuario} placeholder='Usuario' style={styles.Input}></TextInput>
        <TextInput value={'somesecretpassword'} editable={false} secureTextEntry={true} placeholder='Password' style={styles.Inputpass}></TextInput>
      
        <Pressable style={styles.changepass}><Ionicons name="md-key-sharp" size={30} color="black" /><Text style={styles.textchangepass}> Cambiar</Text></Pressable>

        <TextInput onChangeText={onChangeBio} value={bio}
        editable
        multiline
        numberOfLines={4}
        maxLength={50} placeholder='Biografia (Opcional)' style={styles.InputBio}></TextInput>
        
        
      <Pressable onPress={()=>{uploadImage(nombre,apellido,usuario,bio)}} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(6, 153, 240, 0.2)' : 'transparent',
            },
            styles.Registro,
          ]}>
          <Text style={styles.textRegistro}>Guardar Cambios</Text>
          </Pressable>

         

      </View>
     
    </View>
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
      height:480,
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
    marginTop:10,
    marginBottom:10,
    flexWrap:'wrap',
    flexDirection:'row'
    
    },
    Input:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom:10,
      paddingLeft:5,
      height:35,
      width:'100%'
    },
    Inputpass:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom:10,
      paddingLeft:5,
      height:35,
      width:'50%'
    },

    InputBio:{
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginBottom:10,
        paddingLeft:5,
        height:80,
        width:'100%'
      },
    
    
    textIngresar:{
      color:'#00FF38',
    },
    
    Registro:{
      width:125,
      height:50,
      color:'#0699F0',
      borderColor:'#0699F0',
      borderRadius:5,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:'25%',
    },
    changepass:{
      width:'49%',
      height:35,
      color:'yellow',
      backgroundColor:'yellow',
      borderColor:'black',
      borderRadius:5,
      borderWidth:2,
      alignItems: 'center',
      marginLeft:'1%',
      flexWrap:'wrap',
      flexDirection:'row',
      paddingLeft:'5%'
    },
    textchangepass:{
      color:"black"
    },
    textRegistro:{
      color:'#0699F0',
    },
    agregarfoto:{
      backgroundColor: '#FFFFFF',
        borderRadius: 50,
        marginBottom:10,
        width: 100, height: 100,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'30%',
    }
    
})

export default EditProfile