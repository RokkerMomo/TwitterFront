
import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

const NewTweet = ({route,navigation}) => {
  const {userid,Token} = route.params;
  let date = new Date().toLocaleDateString()
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
      fetch("http://192.168.1.102:3000/finduser",requestOptions)
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

    let NewTweet = (owner,content,uri)=>{

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
      foto:`${uri}`,
      fecha:`${date}`
    })}
      //axios
      fetch("http://192.168.1.102:3000/newtweet",requestOptions)
      console.log('ENVIADO')
      navigation.navigate('Home',{
        userid:userid,
        token:Token,
      })
     }

  return (
    <View style={styles.Body}>
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.navigate('Home',{
        userid:userid,
        token:Token,
      })}}><Ionicons style={styles.backbutton} name="arrow-back" size={30} color="white" /></Pressable>
        <Text style={styles.Titulo}>Nuevo Tweet</Text>
      </View>

      <View style={styles.Carta}>
        <View style={styles.Foto}>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://i0.wp.com/ssbmtextures.com/wp-content/uploads/2022/12/old-falco-7ab2d6cf.png?ssl=1',
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
      flexWrap:'wrap'
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
    }
    
})