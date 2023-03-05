import MainStack from "./Routes/Navigation";
import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native';
export default function App() {


  return (
      <MainStack></MainStack>
  );
}

const styles = StyleSheet.create({
  Body:{
    backgroundColor:'#637885',
    tintColor:'#637885',
    color:'#637885',
    shadowColor:'#637885',
    overlayColor:"#637885",
    color:'#637885',
      
  
    },
  Titulo:{
    color: '#FFFFFF',
    fontSize:24,
    fontWeight:"bold",
    marginBottom:12,
  
  
  },
  Carta:{
    backgroundColor:'#16202A',
    width:281,
    height:213,
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
  
  NewTweet:{
    position:"absolute",
    backgroundColor:'#239EEC',
    height:60,
    width:60,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:30,
    left:283,
    top:490,
  }
  
})