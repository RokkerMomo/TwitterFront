import { Button, Pressable, StyleSheet, Text, View,
ScrollView,Image,RefreshControl,ActivityIndicator,Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import Like from "../components/button";
import env from '../env';

const Home = ({route,navigation}) => {

  const createTwoButtonAlert = (idtweet) =>
    Alert.alert('Alerta', 'Seguro que quieres borrar este Tweet', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Borrar', onPress: () => {const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${Token}`
        },
        body: JSON.stringify({
          idTweet:`${idtweet}`
        })}
    fetch(`${env.SERVER.URI}/deleteTweet`,requestOptions)
    .then((response) => response.json())
    .then((data) =>{
      console.log(data)
      setRefreshing(true)
          
    } );}},
    ]);

  const [Tweets,setTweets] = useState(null)
  const [state,setState] = useState(true)
  const hasUnsavedChanges = Boolean(true);
  const [check,SetCheck] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  var Data = [];


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);


  async function getTweets (){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        owner:`${userid}`
      })}
  await fetch(`${env.SERVER.URI}/showalltweets`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    Data= [...Data,data];
        const info = Data[0];
        if (Tweets!==info['Tweets']) {
          setTweets(info["Tweets"])
          console.log(Tweets&&Tweets)
          setState(false)
    setRefreshing(false)
        } else {
        }
        
  } );
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (!hasUnsavedChanges) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Cerrar Sesion?',
        'Quieres volver a la pantalla de inicio y cerrar tu sesion ?',
        [
          { text: "No salir", style: 'cancel', onPress: () => {} },
          {
            text: 'Salir',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    }),
    
    getTweets();
  },[refreshing]);

  const {userid,Token} = route.params;
  return (

    <View style={styles.Body}>
      
      <View style={styles.header}>
        <Pressable onPress={()=>{navigation.openDrawer();}}><Ionicons style={styles.backbutton} name="menu" size={30} color="white" /></Pressable>
        <Text style={styles.Titulo}>Home</Text>
        <Pressable style={styles.search} onPress={()=>{navigation.navigate('Drawer', {
            screen: 'search',
            params: {userid: userid,Token:Token },
          })}} ><Ionicons  name="ios-search" size={24} color="white" /></Pressable>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {Tweets&&Tweets.map((Tweet) => {
        const fecha = Tweet.fecha.slice(0, 10);
        return (


          <Pressable onPress={()=>{navigation.navigate('Drawer', {
            screen: 'comments',
            params: { idTweet: `${Tweet._id}`,userid: userid,Token:Token },
          })}} key={Tweet._id} style={styles.Carta}>
         
         
          <View style={styles.contenido}>
           
          <Pressable onPress={()=>{navigation.navigate('Drawer', {
  screen: 'Profile',
  params: { profileid: `${Tweet.owner}`,userid: userid,Token:`${Token}` },
})}} style={styles.Foto}>
          <Image
        style={styles.tinyLogo}
        source={{
          uri: Tweet.fotoperfil,
        }}
      />
          </Pressable>
          <View style={styles.info}>
          <Text style={styles.NombreCompleto}>{Tweet.ownername} </Text>
          <Text style={styles.usuario}>@{Tweet.owneruser}</Text>
          </View>

          <Text style={styles.usuario}> {fecha}</Text>



          
          {(Tweet.owner==userid) &&<Pressable onPress={()=>{createTwoButtonAlert(Tweet._id)}} style={{marginLeft:'10%'}}><Ionicons name="ios-trash" size={20} color="red" /></Pressable>}
         
         
         
         
         
         
          </View>



          <Text style={styles.input}>{Tweet.descripcion}</Text>
          {(Tweet.foto!=="undefined") && <Image source={{ uri: Tweet.foto }} style={{ width: '100%', height: 310, marginBottom:5, borderRadius:10,position:'relative' }} />}
          

          
          <Like idTweet={Tweet._id} userid={userid} token={Token}></Like>
          
          </Pressable>
        );

      })}
      
      <ActivityIndicator style={{marginTop:50}} animating={state} size="large" color="#239EEC" />
      </ScrollView>

      <Pressable onPress={()=>{navigation.navigate('Drawer', {
            screen: 'NewTweet',
            params: {userid: userid,Token:Token },
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
    width:'98%',
    borderRadius:10,
    paddingTop:16,
    paddingRight:20,
    paddingLeft:20,
    paddingBottom:5,
    marginTop:10,
    left:'1%',
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
    width:125,
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
  header:{
    backgroundColor:'#16202A',
    width:360,
    height:60,
    top:0,
    flex:0,
    flexWrap:'wrap',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },search:{
    justifyContent:'center',
    alignItems:'center',
    width:30,
    height:30,
marginLeft:'55%',
    top:'40%'
}
})

export default Home