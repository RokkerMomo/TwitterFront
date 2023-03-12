import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Home from "./Home";
import Login from "./Login";
import NewTweet from "./NewTweet";
import Perfil from "./Profile";


const contenedor = createDrawerNavigator();

const Drawer = ({route, navigation}) => {
  return (
    <contenedor.Navigator initialRouteName='Home' backBehavior='initialRoute' screenOptions={{

headerShown:true,
headerTintColor:'#fff',
drawerActiveTintColor:'#16202A',
drawerInactiveTintColor:'#FFF',
swipeEnabled:true,

headerStyle:{
    backgroundColor:'#16202A',
    height:60,
},

drawerStyle:{
    backgroundColor:'#637885',
},
}}>
    <contenedor.Screen name="Home" initialParams={{userid: route.params.params.userid}} options={{
      
    drawerIcon: ({focused, size}) => (
       <Ionicons
          name="md-home"
          size={size}
          color={focused ? '#7cc' : '#ccc'}
       />
    )
    }} component={Home} />
    <contenedor.Screen name="MyProfile" initialParams={{userid: route.params.params.userid ,profileid:route.params.params.userid}} options={{
      unmountOnBlur:true,
    drawerIcon: ({focused, size}) => (
       <Ionicons
          name="person"
          size={size}
          color={focused ? '#7cc' : '#ccc'}
       />
    )
    }} component={Perfil} />


<contenedor.Screen name="Salir" options={{
   headerShown:false,
    drawerIcon: ({focused, size}) => (
       <Ionicons
          name="exit"
          size={size}
          color={focused ? '#7cc' : '#ccc'}
       />
    )
    }} component={Login} />



    <contenedor.Screen name="Profile" initialParams={{userid: route.params.params.userid}} options={{
      unmountOnBlur:true,drawerItemStyle:{height:0}}} component={Perfil} />

      <contenedor.Screen name='NewTweet' options={{
                    drawerItemStyle: { height: 0 },
                    headerShown:false,
                    unmountOnBlur:true
                }} 
                initialParams={{userid: route.params.params.userid}} component={NewTweet}/>

      

    </contenedor.Navigator>
    
  )
}

export default Drawer