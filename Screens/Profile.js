import { Button, Pressable, StyleSheet, Text, View,
  ScrollView,Image,RefreshControl,ActivityIndicator} from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { AntDesign } from '@expo/vector-icons';
  import React, { useState, useEffect } from 'react';
  import Like from "../components/button";
  import env from '../env';

const Profile = ({route,navigation}) => {

  
  const [Tweets,setTweets] = useState(null)
  const [state,setState] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false);
  const [Datos,setDatos] = useState(null)
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
      },
      body: JSON.stringify({
        owner:`${userid}`
      })}
  await fetch(`${env.SERVER.URI}/showuserTweets`,requestOptions)
  .then((response) => response.json())
  .then((data) =>{
    Data= [...Data,data];
        const info = Data[0];
        if (Tweets!==info['Tweets']) {
          setTweets(info["Tweets"])
          setState(false)
        console.log(Tweets)
        } else {
        }
        
  } );
  };

  async function GetData (){
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
  }

  useEffect(() => {

    GetData();
    getTweets();
    
    
  },[refreshing]);

  const {userid,Token} = route.params;
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
          <View style={styles.info}>
          <Text style={styles.NombreCompleto}>{Datos&&Datos.nombre} {Datos&&Datos.apellido}</Text>
          <Text style={styles.usuario}>@{Datos&&Datos.usuario}</Text>
          </View>
          {Datos&&Datos._id &&(userid==Datos._id) && <Pressable style={styles.send}>
        <Text>Editar Perfil</Text>
        </Pressable>}
        { Datos&&Datos._id &&(userid!==Datos._id) && <Pressable style={styles.send}>
        <Text>Seguir</Text>
        </Pressable>}
        <Text style={styles.bio}>{Datos&&Datos.bio}</Text>
          </View>
          <View style={styles.footerperfil}>
            <Text style={styles.NombreCompleto}>220 </Text><Text style={styles.usuario}>Siguiendo </Text>
            <Text style={styles.NombreCompleto}>14 </Text><Text style={styles.usuario}>Seguidores</Text>
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
      <ActivityIndicator style={{marginTop:50}} animating={state} size="large" color="#239EEC" />
      </ScrollView>

      <Pressable onPress={()=>{navigation.navigate('NewTweet', {
  screen: 'NewTweet',
  params: { userid: userid },
});}} style={styles.NewTweet}><Ionicons name="add" size={30} color="white" /></Pressable>
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
  Foto:{
    width:50,
    height:50,
    borderRadius:30,
    marginRight:8,
    justifyContent:'center',
    alignItems:"center"
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
  }
})

export default Profile