import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import Like from "../components/button";
const Home = ({route,navigation}) => {

  const [Tweets,setTweets] = useState(null)
  const [state,setState] = useState(null)
  var Data = [];

  useEffect(() => {
    const getTweets = async ()=>{
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner:`${userid}`
        })}
     await fetch("http://192.168.1.102:3000/showuserTweets",requestOptions)
    .then((response) => response.json())
    .then((data) =>{
      Data= [...Data,data];
          const info = Data[0];
          if (Tweets!==info['Tweets']) {
            setTweets(info["Tweets"])
          console.log(Tweets)
          } else {
          }
          
    } );
    }
    getTweets();
  },[state]);

  const {userid,Token} = route.params;
  return (
    <View style={styles.Body}>
      <ScrollView>
      {Tweets&&Tweets.map((Tweet) => {
        const fecha = Tweet.fecha.slice(0, 10);
        return (
          <View key={Tweet._id} style={styles.Carta}>
          <View style={styles.contenido}>
          <View style={styles.Foto}>
          <Image
        style={styles.tinyLogo}
        source={{
          uri: Tweet.fotoperfil,
        }}
      />
          </View>
          
          <View style={styles.info}>
          <Text style={styles.NombreCompleto}>{Tweet.ownername} </Text>
          <Text style={styles.usuario}>@{Tweet.owneruser}</Text>
          </View>

          <Text style={styles.usuario}>{fecha }</Text>
          <Text style={styles.input}>{Tweet.descripcion}</Text>
          {(Tweet.foto!=="undefined") && <Image source={{ uri: Tweet.foto }} style={{ width: 310, height: 310, position:'relative', marginBottom:5, borderRadius:10 }} />}
          </View>
          <View style={styles.footer}>
          <Pressable style={styles.heart}><AntDesign name="message1" size={20} color="white" /><Text style={styles.number}> 25</Text></Pressable>
          <Like idTweet={Tweet._id} userid={userid}></Like>
          </View>
          
          </View>
        );
      })}
      
      </ScrollView>
      

      <Pressable onPress={()=>{navigation.navigate('NewTweet',{
        token:Token,
        userid:userid
            })}} style={styles.NewTweet}><Ionicons name="add" size={30} color="white" /></Pressable>
    </View>
  )
}

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
  footer:{
    height:25,
    flex:0,
    flexWrap:"wrap",
    paddingLeft:"65%"
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
    paddingBottom:5,
    marginTop:10,
    left:5,
    flex:0,
    display:"flex",
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
    flexDirection:'row'
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
    width:50,
    height:50,
    borderRadius:30,
    marginRight:8,
    justifyContent:'center',
    alignItems:"center"
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
    marginBottom:10,
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
  tinyLogo: {
    position:"relative",
    width: 50,
    height: 50,
    maxHeight:'101%',
    maxWidth:'101%',
    borderRadius:30,
  },
  
})

export default Home