import { Button, Pressable, StyleSheet, Text, View,
    ScrollView,Image,RefreshControl,ActivityIndicator,Alert} from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import React, { useState, useEffect } from 'react';
    import Like from "../components/ButtonComments";
    import env from '../env';
import { TextInput } from 'react-native-gesture-handler';
    
    const Comments = ({route,navigation}) => {
    
      let date = new Date()
      const [nuevo,setNuevo] =useState(false);
      const [comentarios,setComentarios] = useState(null)
      const [state,setState] = useState(true)
      const [refreshing, setRefreshing] = React.useState(false);
      const [datos,setDatos] =useState(null);
      const [usuario,setUsuario] =useState(null)
      const [descripcion,onChangeDescripcion] = useState('')


      const createTwoButtonAlert = (idtweet) =>
    Alert.alert('Alerta', 'Seguro que quieres borrar este Comentario ?', [
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
    fetch(`${env.SERVER.URI}/deletecomentario`,requestOptions)
    .then((response) => response.json())
    .then((data) =>{
      console.log(data)
      setState(true)
        setNuevo(true)
          
    } );}},
    ]);
    
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 200);
      }, []);

      async function finduser(){
        const requestOptions = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${Token}`
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
            setUsuario(result);
            console.log(result)
          }
        )
      }

      async function gettweet (){
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${Token}`
            },
            body: JSON.stringify({
              idTweet:`${idTweet}`
            })}
           await fetch(`${env.SERVER.URI}/showSingleTweet`,requestOptions)
     .then(res =>{
       if (res.status=="400"){
       }else{}
       return res.json();
     }).then(
       (result) =>{
         setDatos(result['Tweets'])
         console.log(datos&&datos);
       }
     )
      }

      async function getcomentarios (){
        const requestOptions = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${Token}`
            },
            body: JSON.stringify({
              idTweet:`${idTweet}`
            })}
           await fetch(`${env.SERVER.URI}/getcomentarios`,requestOptions)
     .then(res =>{
       if (res.status=="400"){
       }else{}
       return res.json();
     }).then(
       (result) =>{
         setComentarios(result)
       }
     )
      }
    
      const NewComentario = async (content)=>{
      const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Token}`
      },
      body: JSON.stringify({
        idTweet:`${datos._id}`,
        ownername:`${usuario.nombre} ${usuario.apellido}`,
        owneruser:`${usuario.usuario}`,
        owner:`${userid}`,
        descripcion:`${content}`,
        fotoperfil:`${usuario.foto}`,
        fecha:`${date}`
      })}
        //axios
        fetch(`${env.SERVER.URI}/newComentario`,requestOptions)
        console.log('ENVIADO')
        setNuevo(true)
        onChangeDescripcion("");
      
       }
    
      useEffect(() => {
        gettweet();
        finduser();
        getcomentarios();
        setState(false)
        setNuevo(false)
      },[nuevo]);
    
      const {userid,Token,idTweet} = route.params;
      return (
    
        <View style={styles.Body}>
          <View style={styles.header}>
        <Pressable onPress={()=>{navigation.navigate('Home',{
        userid:userid,
        Token:Token,
        nuevo:true,
      })}}><Ionicons style={styles.backbutton} name="arrow-back" size={30} color="white" /></Pressable>
        <Text style={styles.Titulo}>Comentarios</Text>
      </View>
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            
            
              <View style={styles.Carta}>
              <View style={styles.contenido}>
              <Pressable onPress={()=>{navigation.navigate('Drawer', {
      screen: 'Profile',
      params: { profileid: datos&&datos.owner,userid: userid },
    })}} style={styles.Foto}>
              <Image
            style={styles.tinyLogo}
            source={{
              uri: `${datos&&datos.fotoperfil}`,
            }}
          />
              </Pressable>
              <View style={styles.info}>
              <Text style={styles.NombreCompleto}>{datos&&datos.ownername} </Text>
              <Text style={styles.usuario}>@{datos&&datos.owneruser}</Text>
              </View>
    
              <Text style={styles.usuario}>{datos&&datos.fecha.slice(0, 10)}</Text>
              <Text style={styles.input}>{datos&&datos.descripcion}</Text>
              {(datos&&datos.foto!=="undefined") && <Image source={{ uri: `${datos&&datos.foto}` }} style={{ width: '100%', height: 310, position:'relative', marginBottom:5, borderRadius:10,marginTop:5 }} />}
              </View>     
              </View>

              <View style={styles.newcomentario}>
              <View onPress={()=>{navigation.navigate('Drawer', {
      screen: 'Profile',
      params: { profileid: datos&&datos.owner,userid: userid },
    })}} style={styles.Foto}>
              <Image
            style={styles.tinyLogo}
            source={{
              uri: `${usuario&&usuario.foto}`,
            }}
          />
              </View>
              <TextInput onChangeText={onChangeDescripcion} value={descripcion} multiline maxLength={280} placeholder='Escribe tu comentario' placeholderTextColor='white' style={styles.inputcomentario}></TextInput>
              <Pressable onPress={()=>{NewComentario(descripcion)}} style={styles.send}><Text>Enviar</Text></Pressable>
              </View>


              {comentarios&&comentarios.map((comentario) => {
        return (
          <View key={comentario._id} style={styles.newcomentario}>

            <View style={styles.contenido}>
            <View onPress={()=>{navigation.navigate('Drawer', {
      screen: 'Profile',
      params: { profileid: datos&&datos.owner,userid: userid },
    })}} style={styles.Foto}>
              <Image
            style={styles.tinyLogo}
            source={{
              uri: `${comentario.fotoperfil}`,
            }}
          />
              </View>
              <View style={styles.infocomentario}>
              <Text style={styles.NombreCompleto}>{comentario.ownername} </Text>
              <Text style={styles.usuario}>@{comentario.owneruser}</Text>
              </View>
    
              <Text style={styles.usuario}>{comentario.fecha.slice(0, 10)}</Text>
              {(comentario.owner==userid) &&<Pressable onPress={()=>{createTwoButtonAlert(comentario._id)}} style={{marginLeft:'10%'}}><Ionicons name="ios-trash" size={20} color="red" /></Pressable>}
              </View>
              <Text style={styles.input}>{comentario.descripcion}</Text>
              <Like idTweet={comentario._id} userid={userid} token={Token}></Like>

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
        width:'100%',
        height:60,
        top:0,
        flex:0,
        flexWrap:'wrap',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
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
        paddingBottom:10,
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
        marginTop:5
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
      infocomentario:{
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
        width:'100%',
        height:60,
        top:0,
        flex:0,
        flexWrap:'wrap',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
      },
      newcomentario:{
      backgroundColor:'#16202A',
      width:'98%',
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
      marginTop:10,
      left:5,
      display:'flex',
      flexWrap:'wrap',
      flexDirection:'row',
      paddingBottom:10,
      },
      inputcomentario:{
        color:"white",
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        width:'45%'
      },
      inputcomentariobig:{
        color:"white",
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        width:'80%'
      }
    })
    
    export default Comments