import { Button, Pressable, StyleSheet, Text, View,
  ScrollView,Image,RefreshControl,ActivityIndicator,Alert} from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { AntDesign } from '@expo/vector-icons';
  import React, { useState, useEffect } from 'react';
  import Like from "../components/button";
  import env from '../env';

const Profile = ({route,navigation}) => {

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
  const [refreshing, setRefreshing] = React.useState(false);
  const [Datos,setDatos] = useState(null)
  const [followers,setFollowers] = useState(0)
  const [following,setFollowing] = useState(0)
  const [check,SetCheck] = useState(null)
  var Data = [];


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

  async function Follow(){

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
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idSeguido:`${profileid}`,
    idSeguidor:`${userid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    await fetch(`${env.SERVER.URI}/follow`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        console.log(result)
      }
    )
  }

   async function CheckFollow(){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
    idSeguido:`${profileid}`,
    idSeguidor:`${userid}`
      })}
    await fetch(`${env.SERVER.URI}/checkfollow`,requestOptions)
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

  async function getTweets (){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        owner:`${profileid}`
      })}
  await fetch(`${env.SERVER.URI}/showuserTweets`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    Data= [...Data,data];
        const info = Data[0];
        if (Tweets!==info['Tweets']) {
          setTweets(info["Tweets"])
          setState(false)
          setRefreshing(false)
        } else {
        }
        
  } );
  };

  async function GetGollowers() {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idSeguido:`${profileid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    fetch(`${env.SERVER.URI}/getfollowers`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        setFollowers(result)
      }
    )
  }

  async function GetFollowing() {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idSeguidor:`${profileid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    fetch(`${env.SERVER.URI}/getFollowing`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        setFollowing(result)
      }
    )
  }

  async function GetData (){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        _id:`${profileid}`
      })}
    // Similar to componentDidMount and componentDidUpdate:
    fetch(`${env.SERVER.URI}/finduser`,requestOptions)
    .then(res =>{
      if (res.status=="400"){
      }else{}
      return res.json();
    }).then(
      (result) =>{
        setDatos(result);
      }
    )
  }

  useEffect(() => {
    
    GetData();
    GetFollowing();
    GetGollowers();
    getTweets();
    CheckFollow();
    
  },[refreshing]);

  const {userid,profileid,Token} = route.params;
  return (

    <View style={styles.Body}>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        
        <View style={styles.Cartaperfil}>
          <View style={styles.contenido}>
          <View style={styles.Foto}>
          <Image
        style={styles.tinyLogo}
        source={{
          uri: Datos&&Datos.foto
        }}
      />
          </View>
          <View style={styles.infoperfil}>
          <Text style={styles.NombreCompleto}>{Datos&&Datos.nombre} {Datos&&Datos.apellido}</Text>
          <Text style={styles.usuario}>@{Datos&&Datos.usuario}</Text>
          </View>
          {(userid==profileid) && <Pressable onPress={()=>{navigation.navigate('Drawer', {
            screen: 'EditProfile',
            params: { userid: userid,Token:Token },
          })}} style={styles.send}>
        <Text>Editar Perfil</Text>
        </Pressable>}

        {(userid!=profileid) && <Pressable onPress={()=>{Follow()}} style={styles.send}>

        {(check==true) &&<Text>Siguiendo</Text>}
        {(check==false) &&<Text>Seguir</Text>}

        </Pressable>}
        <Text style={styles.bio}>{Datos&&Datos.bio}</Text>
          </View>
          <View style={styles.footerperfil}>
            <Text style={styles.NombreCompleto}>{following} </Text><Text style={styles.usuario}>Siguiendo </Text>
            <Text style={styles.NombreCompleto}>{followers} </Text><Text style={styles.usuario}>Seguidores</Text>
          </View>
          </View>
        



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

          <Text style={styles.fecha}> {fecha}</Text>
          {(Tweet.owner==userid) &&<Pressable onPress={()=>{createTwoButtonAlert(Tweet._id)}} style={{marginLeft:'10%'}}><Ionicons name="ios-trash" size={20} color="red" /></Pressable>}
          
          </View>
          <Text style={styles.input}>{Tweet.descripcion}</Text>
          {(Tweet.foto!=="undefined") && <Image source={{ uri: Tweet.foto }} style={{ width: 310, height: 310, position:'relative', marginBottom:5, borderRadius:10 }} />}
          <Like idTweet={Tweet._id} userid={userid} token={Token}></Like>
          
          </View>
        );
      })}
      <ActivityIndicator style={{marginTop:50}} animating={state} size="large" color="#239EEC" />
      </ScrollView>
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
  footerperfil:{
    height:25,
    flex:0,
    flexWrap:"wrap",
    paddingLeft:"18%"
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
  Cartaperfil:{backgroundColor:'#16202A',
  width:'100%',
  borderRadius:10,
  paddingTop:16,
  paddingRight:20,
  paddingLeft:20,
  paddingBottom:5,
  marginTop:3,
  flex:0,
  display:"flex",},

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
  fecha:{
    color:'#909090',
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
  infoperfil:{
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
  bio:{
    color:"white",
    marginTop:10,
    marginBottom:10,
    width:200,
    marginLeft:55

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
  },Body:{
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
  }
})

export default Profile