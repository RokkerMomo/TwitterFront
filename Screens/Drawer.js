import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Home from "./Home";
import NewTweet from "./NewTweet";
import Perfil from "./Profile";
import EditProfile from "./EditProfile";
import Following from "./Following";
import comments from "./comments";
import button from "../components/button";


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

<contenedor.Screen name="Following" initialParams={{userid: route.params.params.userid}} options={{
      unmountOnBlur:true,
      drawerIcon: ({focused, size}) => (
         <Ionicons
            name="ios-star"
            size={size}
            color={focused ? '#7cc' : '#ccc'}
         />
      )
      }} component={Following} />


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

<contenedor.Screen name="EditProfile" initialParams={{userid: route.params.params.userid ,profileid:route.params.params.userid}} options={{
      unmountOnBlur:true,
      drawerItemStyle:{height:0},
    drawerIcon: ({focused, size}) => (
       <Ionicons
          name="person"
          size={size}
          color={focused ? '#7cc' : '#ccc'}
       />
    )
    }} component={EditProfile} />


    <contenedor.Screen name="Profile" initialParams={{userid: route.params.params.userid}} options={{
      unmountOnBlur:true,drawerItemStyle:{height:0}}} component={Perfil} />

      

      <contenedor.Screen name='NewTweet' options={{
                    drawerItemStyle: { height: 0 },
                    headerShown:false,
                    unmountOnBlur:true
                }} 
                initialParams={{userid: route.params.params.userid}} component={NewTweet}/>


<contenedor.Screen name='comments' options={{
                    drawerItemStyle: { height: 0 },
                    headerShown:false,
                    unmountOnBlur:true
                }} 
                initialParams={{userid: route.params.params.userid}} component={comments}/>

<contenedor.Screen name='button' options={{
                    drawerItemStyle: { height: 0 },
                    headerShown:false,
                    unmountOnBlur:true
                }} 
               component={button}/>

      

    </contenedor.Navigator>
    
  )
}

export default Drawer