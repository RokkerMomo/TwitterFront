import { Button, Pressable, StyleSheet, Text, View,
    ScrollView,Image,RefreshControl,ActivityIndicator,Alert} from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import { AntDesign } from '@expo/vector-icons';
    import React, { useState, useEffect } from 'react';
    import Like from "../components/button";
    import env from '../env';
    
    const Following = ({route,navigation}) => {
    
      const [Tweets,setTweets] = useState(null)
      const [state,setState] = useState(true)
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
            userid:`${userid}`
          })}
      await fetch(`${env.SERVER.URI}/showfollowing`,requestOptions)
      .then((response) => response.json())
      .then((data) =>{
        Data= [...Data,data];
            const info = Data[0];
            if (Tweets!==info['allTweets']) {
              setTweets(info["allTweets"])
              setState(false)
            } else {
            }
            
      } );
      };
    
      useEffect(() => {
        getTweets();
      },[refreshing]);
    
      const {userid,Token} = route.params;
      return (
    
        <View style={styles.Body}>
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
    
          <Pressable onPress={()=>{navigation.navigate('NewTweet');}} style={styles.NewTweet}><Ionicons name="add" size={30} color="white" /></Pressable>
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
      }
    })
    
    export default Following