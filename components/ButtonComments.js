import {  Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect,useState } from 'react'
import env from '../env';


const Button = ({idTweet,userid,token}) => {
    const [numero,setnumero] = useState(0)
    const [numerocomentario,setNumerocomentario] = useState(0)
    const [check,SetCheck] = useState(false)

    async function CheckLike(){
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
          idTweet:`${idTweet}`,
          idUsuario:`${userid}`
        })}
      await fetch(`${env.SERVER.URI}/checklike`,requestOptions)
     .then(res =>{
       if (res.status=="400"){
       }else{}
       return res.json();
     }).then(
       (result) =>{
         if (result.status=='true') {
          SetCheck(true)
         }else{
          SetCheck(false)
         }
       }
     )
    }


    const getcomentarios = ()=>{
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
          idTweet:`${idTweet}`,
        })}
        fetch(`${env.SERVER.URI}/getcomentariosnumber`,requestOptions)
        .then(res =>{
          if (res.status=="400"){
            msg="error";
          }else{}
          return res.json();
        }).then(
          (result) =>{
          setNumerocomentario(result);
          }
        )
    }



    const darLike = ()=>{

      if (check==true) {
        SetCheck(false)
      }else{
        SetCheck(true)
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
          idTweet:`${idTweet}`,
          idUsuario:`${userid}`
        })}
          //axios
          fetch(`${env.SERVER.URI}/like`,requestOptions)
          .then(res =>{
            if (res.status=="400"){
              msg="error";
            }else{}
            return res.json();
          }).then(
            (result) =>{
            if (result.msg=="Se dio like") {
              setnumero(numero+1)
            }else{
              setnumero(numero-1)
            }
            }
          )
    }

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
              idTweet:`${idTweet}`
            })}
              //axios
              fetch(`${env.SERVER.URI}/getlikes`,requestOptions)
              .then(res =>{
                if (res.status=="400"){
                  msg="error";
                }else{}
                return res.json();
              }).then(
                (result) =>{
                setnumero(result)
                }
              )
              getcomentarios();
              CheckLike();
    },[])

  return (
    <View style={styles.footer}>


<Pressable onPress={()=>{darLike()}} style={styles.heart}>
      {(check==false)&&<Ionicons  name="heart-outline" size={20} color="white" />}
      {(check==true)&&<Ionicons name="heart" size={20} color="red" />}
      
      <Text style={styles.number}> {numero}</Text></Pressable>
    </View>
    
  )
}

export default Button

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
      height:213,
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
      marginTop:10,
      left:5,
      flex:0,
    
    
    },
    contenido:{
      flex:0,
      flexWrap:'wrap',
      flexDirection:'row'
    
    
    },
    heart:{
      position:"relative",
      height:40,
      width:50,
      flexWrap:'wrap',
      flexDirection:'row',
      marginLeft:'50%'
    },
    number:{
      color:'white'
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
      backgroundColor:'white',
      width:45,
      height:45,
      borderRadius:30,
      marginRight:8
    },
    info:{
      width:180,
      flexWrap:'wrap',
      flexDirection:'row'
    },
    input:{
      color:"white",
      marginTop:10,
      marginLeft:10,
    },
    
    NewTweet:{
      position:"absolute",
      backgroundColor:'#239EEC',
      height:60,
      width:60,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:30,
      left:'80%',
      top:'87%',
    },
    footer:{
      height:25,
      flex:0,
      flexWrap:"wrap",
      paddingLeft:"65%"
    }
    
  })