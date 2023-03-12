import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import NewTweet from "../Screens/NewTweet";
import Perfil from "../Screens/Profile";
import Drawer from "../Screens/Drawer";


const Stack = createNativeStackNavigator();

const MainStack = ()=>{
    return(
        <NavigationContainer>

            <Stack.Navigator screenOptions={{

                headerShown:true,
                headerTintColor:'#fff',
                drawerActiveTintColor:'#16202A',
                drawerInactiveTintColor:'#FFF',
                swipeEnabled:false,

                headerStyle:{
                    backgroundColor:'#16202A',
                    height:60,
                },

                drawerStyle:{
                    backgroundColor:'#637885',
                },
            }}>
                <Stack.Screen 
                name="Login"
                options={{
                    headerShown:false,
                    drawerItemStyle: { height: 0 }
                }}component={Login}></Stack.Screen>

                <Stack.Screen
                name="Register"
                tittle='Registrar Usuario'
                options={{
                    headerShown:true,
                    drawerItemStyle: { height: 0 }
                }}component={Register}></Stack.Screen>

                <Stack.Screen
                name="Drawer"
                options={{
                    title: 'Drawer',
                    headerRight: () => (
                        <Ionicons style={styles.search} name="ios-search" size={24} color="white" />
                      ),
                    drawerIcon: ({focused, size}) => (
                       <Ionicons
                          name="md-home"
                          size={size}
                          color={focused ? '#7cc' : '#ccc'}
                       />
                    ),headerShown:false,
                    
                 }}
                component={Drawer}></Stack.Screen>
                
                <Stack.Screen
                name="Perfil"
                options={{
                    title: 'Perfil',
                    drawerIcon: ({focused, size}) => (
                       <Ionicons
                          name="person-outline"
                          size={size}
                          color={focused ? '#7cc' : '#ccc'}
                       />
                    ),headerShown:false,
                    
                 }}
                component={Perfil}></Stack.Screen>

                <Stack.Screen
                name="Salir"
                options={{
                    title: 'Salir',
                    drawerIcon: ({focused, size}) => (
                       <Ionicons
                          name="exit-outline"
                          size={size}
                          color={focused ? '#7cc' : '#ccc'}
                       />
                    ),headerShown:false,
                    
                 }}
                component={Login}></Stack.Screen>

                <Stack.Screen 
                name="NewTweet"
                options={{
                    drawerItemStyle: { height: 0 },
                    headerShown:false
                }}
                component={NewTweet}></Stack.Screen>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    search:{
        marginRight:10
    }
  })


export default MainStack   