import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert, ScrollView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Like from "../components/button";
import React, { Component } from 'react'
import { useRoute } from "@react-navigation/native";
import env from '../env';
Tweets=[];
Data =[];

class Home2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
          Tweets:[],
        };
      }
    
      componentDidMount() {
        
        const getTweets = async ()=>{
            const requestOptions = {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                owner:`64052e87dc9cbdd6244b50fa`
              })}
           await fetch(`${env.SERVER.URI}/showuserTweets`,requestOptions)
          .then((response) => response.json())
          .then((data) =>{
            Data= [...Data,data];
                const info = Data[0];
                Tweets=info["Tweets"]
               this.setState({Tweets:Tweets})
                console.log(this.state.Tweets)
                
          } );
          }
          getTweets();
      }


      componentDidUpdate(prevProps,prevState) {
  // Typical usage (don't forget to compare props):
  if (this.state.Tweets !== prevState.Tweets) {
    
    const getTweets = async ()=>{
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner:`64052e87dc9cbdd6244b50fa`
          })}
       await fetch(`${env.SERVER.URI}/showuserTweets`,requestOptions)
      .then((response) => response.json())
      .then((data) =>{
        Data= [...Data,data];
            const info = Data[0];
            Tweets=info["Tweets"]
           this.setState({Tweets:Tweets})
            console.log(this.state.Tweets)
            
      } );
      }
      getTweets();
  }
}

 
  render() {
    const { route } = this.props;
    return (
        <View style={styles.Body}>
        <ScrollView>
        {this.state.Tweets&&this.state.Tweets.map((Tweet) => {
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
            <Like idTweet={Tweet._id} userid={route.params.userid}></Like>
            </View>
            
            </View>
          );
        })}
        
        </ScrollView>
        
  
        <Pressable onPress={()=>{this.props.navigation.navigate('NewTweet',{
          token:route.params.token,
          userid:route.params.userid
              })}} style={styles.NewTweet}><Ionicons name="add" size={30} color="white" /></Pressable>
      </View>
    )
  }

  
}

export default function(props) {
    const route = useRoute();
  
    return <Home2 {...props} route={route}/>;
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