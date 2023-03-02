import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Register from "../Screens/Register";


const Stack = createNativeStackNavigator();

const MainStack = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false,
            }}>
                <Stack.Screen 
                name="Login"
                component={Login}></Stack.Screen>
                <Stack.Screen
                name="Register"
                component={Register}></Stack.Screen>
                <Stack.Screen
                name="Home"
                component={Home}></Stack.Screen>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default MainStack   