
import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView,Image, ViewBase } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase, UploadFile } from "../components/config/config";
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons';
import env from '../env';

const NewTweet = ({route,navigation}) => {

  const [image,setImage] = useState(null);
  const [mostrar,setmostrar] = useState(null);
  const [resultadoimagen,setresultadoimagen] = useState(null);
  const [uploading,setUploading] = useState(false);



  let date = new Date()
  let msg ="";

    const [state,setstate] = useState({
      "ownername":"",
      "ownerLastname":"",
      "owneruser":"",
      "owner":"",
      "descripcion":"",
      "foto":"",
      "fecha":"hoy"
    })

    const [Datos,setDatos] = useState(null)

    const pickImage = async () =>{
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection:false,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const source = {uri:result.assets[0].uri};
      setImage(source);
      setmostrar(result.assets[0].uri)
      }
    }

    useEffect(() => {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id:`${userid}`
        })}
      // Similar to componentDidMount and componentDidUpdate:
      fetch(`${env.SERVER.URI}/finduser`,requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
        }else{}
        return res.json();
      }).then(
        (result) =>{
          setDatos(result);
          console.log(Datos);
        }
      )
    },[]);

    const NewTweet = async (owner,content)=>{

      if (image!=null) {
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
      ownername:`${Datos.nombre} ${Datos.apellido}`,
      ownerLastname:`${Datos.apellido}`,
      owneruser:`${Datos.usuario}`,
      owner:`${owner}`,
      descripcion:`${content}`,
      foto:`${result}`,
      fotoperfil:`${Datos.foto}`,
      fecha:`${date}`
    })}
      //axios
      fetch(`${env.SERVER.URI}/newtweet`,requestOptions)
      console.log('ENVIADO')
      navigation.navigate('Home',{
        userid:userid,
        token:Token,
        nuevo:true,
      })
      }else{
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ownername:`${Datos.nombre} ${Datos.apellido}`,
            ownerLastname:`${Datos.apellido}`,
            owneruser:`${Datos.usuario}`,
            owner:`${owner}`,
            descripcion:`${content}`,
            foto:"undefined",
            fotoperfil:`${Datos.foto}`,
            fecha:`${date}`
          })}
            //axios
            fetch(`${env.SERVER.URI}/newtweet`,requestOptions)
            console.log('ENVIADO')
            navigation.navigate('Home',{
              userid:userid,
              token:Token,
              nuevo:true
            })
      }
    
     }
     
  const {userid,Token} = route.params;   
  return (
    <View style={styles.Body}>
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.navigate('Home',{
        userid:userid,
        token:Token,
        nuevo:true,
      })}}><Ionicons style={styles.backbutton} name="arrow-back" size={30} color="white" /></Pressable>
        <Text style={styles.Titulo}>Nuevo Tweet</Text>
      </View>

      <View style={styles.Carta}>
        <View style={styles.Foto}>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: Datos&&Datos.foto,
        }}
      />

        </View>
        <View style={styles.info}>
        <Text style={styles.NombreCompleto}>{Datos&&Datos.nombre}</Text>
        <Text style={styles.NombreCompleto}>{Datos&&Datos.apellido}</Text>
        <Text style={styles.usuario}>@{Datos&&Datos.usuario}</Text>
        </View>
        <Pressable onPress={()=>{NewTweet(userid,state.descripcion)}} style={styles.send}>
        <Text>Enviar</Text>
        </Pressable>

        <TextInput onChangeText={(value) => setstate({...state, descripcion:value})} multiline maxLength={280} style={styles.input} placeholderTextColor='white' placeholder='Escribe el Tweet aqui'></TextInput>
        {image && <View style={{ width: 310, height: 310, position:'relative', marginBottom:5, borderRadius:10 }}>
        {image && <Image source={{ uri: mostrar }} style={{ width: 310, height: 310, position:'relative', marginBottom:5, borderRadius:10 }} />}
        {image && <Pressable onPress={()=>{setImage(null)}} style={{ width: 24, height: 24, position:'absolute', marginBottom:5, borderRadius:30,backgroundColor:'rgba(151, 151, 151, 0.43)',left:'90%',top:'2%' }} ><Entypo name="cross" size={24} color="black" /></Pressable>}
        </View>}
        
        <View style={styles.footer}></View>

        <Pressable onPress={pickImage} style={styles.agregarfoto}>
          <MaterialIcons name="add-a-photo" size={30} color="grey" />
          </Pressable>
          
          
      </View>
    </View>
  )
}

export default NewTweet

const styles = StyleSheet.create({
    Body:{
      flex:1,
        backgroundColor: '#637885',
    
      },
    Titulo:{
      color: '#FFFFFF',
      fontSize:24,
      fontWeight:"bold",
      marginTop:20,

    
    
    },
    header:{
      backgroundColor:'#16202A',
      width:360,
      height:60,
      top:0,
      flex:0,
      flexWrap:'wrap',
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10
    },
    backbutton:{
      marginTop:20,
      marginLeft:10,
    },
    Carta:{
      backgroundColor:'#16202A',
      width:350,
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
      marginTop:10,
      left:5,
      display:'flex',
      flexWrap:'wrap',
      flexDirection:'row'
    
    
    },
    send:{
      position:'relative',
      backgroundColor:'white',
      width:98,
      height:35,
      borderRadius:15,
      borderColor:'black',
      borderWidth:2,
      justifyContent:'center',
      alignItems:'center',
    },
    NombreCompleto:{
      color:'white'
    },
    usuario:{
      color:'#909090'
    },
    Foto:{
      width:50,
      height:50,
      borderRadius:30,
      marginRight:8,
      justifyContent:'center',
      alignItems:"center"
    },
    tinyLogo: {
      position:"relative",
      width: 50,
      height: 50,
      maxHeight:'101%',
      maxWidth:'101%',
      borderRadius:30,
    },
    info:{
      width:150,
      flexWrap:'wrap',
      flexDirection:'row'
    },
    input:{
      color:"white",
      marginTop:10,
      marginLeft:10,
      marginBottom:10,
    },
    agregarfoto:{
        borderRadius: 5,
        marginBottom:10,
        width: 30, height: 30,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    footer:{
      backgroundColor:'#637885',
      width:'100%',
      height:2,
      flex:0,
      flexWrap:"wrap",
      paddingLeft:"65%",
      marginBottom:5
    }
    
})