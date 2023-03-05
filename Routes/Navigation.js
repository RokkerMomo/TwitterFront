import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Button, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native';
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import NewTweet from "../Screens/NewTweet";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = ()=>{
    return(
        <NavigationContainer>

            <Drawer.Navigator screenOptions={{

                headerShown:false,
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
                options={{
                    headerShown:false,
                    drawerItemStyle: { height: 0 }
                }}component={Register}></Stack.Screen>

                <Stack.Screen
                name="Home"
                options={{
                    title: 'Home',
                    headerRight: () => (
                        <Ionicons style={styles.search} name="ios-search" size={24} color="white" />
                      ),
                    drawerIcon: ({focused, size}) => (
                       <Ionicons
                          name="md-home"
                          size={size}
                          color={focused ? '#7cc' : '#ccc'}
                       />
                    ),headerShown:true,
                    
                 }}
                component={Home}></Stack.Screen>
                
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
                    drawerItemStyle: { height: 0 }
                }}
                component={NewTweet}></Stack.Screen>
                
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    search:{
        marginRight:10
    }
  })


export default MainStack   