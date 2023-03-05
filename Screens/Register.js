import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native';
import {Cloudinary} from '@cloudinary/url-gen'
import {Resize} from '@cloudinary/url-gen/actions'
import ImagePicker from 'react-native-image-picker';
import React, {useState} from 'react'
import { ref,uploadBytes } from "firebase/storage";
import { storage } from '../components/config/config'

const Register = ({navigation}) => {

  const cldInstance = new Cloudinary({cloud: {cloudName: 'djkki9hz1'}});

  const [image, setImage] = useState(null);

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }


  let msg ="";
  
    const [state,setstate] = useState({
        nombre:'',
        apellido:'', 
        usuario:'',
        password:'',
        bio:'',
     })

     const createTwoButtonAlert = () =>
    Alert.alert('Alerta!', `${msg}`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

     
     let registrar = (name,LastName,user,pass,bio)=>{
      const requestOptions = {
        method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre:`${name}`,
      apellido:`${LastName}`,
      usuario:`${user}`,
      password:`${pass}`,
      bio:`${bio}`
    })}

    

      fetch("http://192.168.1.102:3000/signup",requestOptions)
      .then(res =>{
        console.log(res.status);
        if (res.status=="400"){
          console.log("error")
        }else{
          navigation.navigate('Login')

        }
        return res.json();
      }).then(
        (result) =>{
          console.log(result);
          msg=result.msg;
          createTwoButtonAlert();
        }
        
      )
     }

  return (
    <View style={styles.Body}>
      <Text style={styles.Titulo}> Registrar Usuario </Text>
      <View style={styles.Carta}>
        <Text style={styles.datos}>Ingrese Sus Datos</Text>

        <TextInput onChangeText={(value) => setstate({...state, nombre:value})} placeholder='Nombre' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, apellido:value})} placeholder='Apellido' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, usuario:value})} placeholder='Usuario' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, password:value})} secureTextEntry={true} placeholder='Password' style={styles.Input}></TextInput>
        <TextInput onChangeText={(value) => setstate({...state, bio:value})} 
        editable
        multiline
        numberOfLines={4}
        maxLength={50} placeholder='Biografia (Opcional)' style={styles.InputBio}></TextInput>
        
      <Pressable onPress={()=>{registrar(state.nombre,state.apellido,state.usuario,state.password,state.bio)}} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(6, 153, 240, 0.2)' : 'transparent',
            },
            styles.Registro,
          ]}>
          <Text style={styles.textRegistro}>Registro</Text>
          </Pressable>

          <Pressable onPress={chooseImage} style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgba(6, 153, 240, 0.2)' : 'transparent',
            },
            styles.Registro,
          ]}>
          <Text style={styles.textRegistro}>Elegir imagen</Text>
          </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    datos:{
        color:'white',
        marginBottom:10
    },
    Body:{
        flex: 1,
        backgroundColor: '#637885',
        alignItems: 'center',
        justifyContent: 'center',
    
      },
    Titulo:{
      color: '#FFFFFF',
      fontSize:24,
      fontWeight:"bold",
      marginBottom:12,
    
    
    },
    Carta:{
      backgroundColor:'#16202A',
      width:280,
      height:400,
      borderRadius:10,
      paddingTop:16,
      paddingRight:20,
      paddingLeft:20,
    
    
    },
    Input:{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      marginBottom:10,
      paddingLeft:5,
      height:35,
    },
    InputBio:{
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginBottom:20,
        paddingLeft:5,
        height:80,
      },
    
    Ingreso:{
      width:103,
      height:35,
      color:'#00FF38',
      borderColor:'#00FF38',
      borderRadius:5,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:69,
      marginBottom:10,
      
    
    },
    
    textIngresar:{
      color:'#00FF38',
    },
    
    Registro:{
      width:103,
      height:35,
      color:'#0699F0',
      borderColor:'#0699F0',
      borderRadius:5,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:69,
    },
    
    textRegistro:{
      color:'#0699F0',
    },
    
})

export default Register