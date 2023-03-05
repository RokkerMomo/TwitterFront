import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect,useState } from 'react'



const button = ({id}) => {
    const [numero,setnumero] = useState(0)

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idTweet:`${id}`
            })}
              //axios
              fetch("http://192.168.1.102:3000/getlikes",requestOptions)
              .then(res =>{
                console.log(res.status);
                if (res.status=="400"){
                  msg="error";
                }else{}
                return res.json();
              }).then(
                (result) =>{
                setnumero(result)
                }
              )
              console.log(numero)
              return numero;
    },[])

  return (
    <Pressable style={styles.heart}><Ionicons  name="heart-outline" size={20} color="white" /><Text style={styles.number}>{numero}</Text></Pressable>
  )
}

export default button

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
      width:40,
      flexWrap:'wrap',
      marginLeft:5
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
    }
    
  })