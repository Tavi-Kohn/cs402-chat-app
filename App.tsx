import React, {useEffect,useState, createContext, useContext, ReactNode} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,SafeAreaView,ActivityIndicator } from "react-native";

import { registerRootComponent } from 'expo';

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {onAuthStateChanged } from 'firebase/auth';

import Chat from "./Screens/Chat"
import Login from "./Screens/Signup"
import Signup from "./Screens/Login"
import Home from "./Screens/Home"


import { ChatBubble } from "./components/ChatBubble";
import {Join} from "./components/Join";
import {CreateSession} from "./components/CreateSession";
import {ChatSession} from "./components/ChatSession";
import { auth } from './config/firebase';
/* commented out to build login page
export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage></LoginPage>
      <ChatBubble user="Person 1" tailDirection="left">Hello World</ChatBubble>
      <ChatBubble user="Person 2" tailDirection="right">Yes</ChatBubble>
      <StatusBar style="auto" />
    </View>
  );
}
*/


const Stack=createStackNavigator();
const AuthenticatedUserContext=createContext({});


const AuthenticatedUserProvider=({children}:any)=>{
  const [user,setUser]=useState(null);
  return(
    <AuthenticatedUserContext.Provider value={{user,setUser}}>
      {children}
      </AuthenticatedUserContext.Provider>
  )
}


// ==============// ==============// ==============// ==============// ==============// ==============
function ChatStack(){
  return(
<Stack.Navigator>
  <Stack.Screen name='Home' component={Home}/>
  <Stack.Screen name='Chat' component={Chat}/>
</Stack.Navigator>
  )
}

function AuthStack(){
  return(
<Stack.Navigator>
  <Stack.Screen name='Login' component={Login}/>
  <Stack.Screen name='Signup' component={Signup}/>
</Stack.Navigator>
  )
}

function RootNavigator(){
  const {user,setUser}=useContext(AuthenticatedUserContext);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const unsbscribe=onAuthStateChanged(auth,async authenticatedUser=>{authenticatedUser? setUser(authenticatedUser):setUser(null);
    setLoading(false);
    }) 
    return ()=>unsbscribe();
  },[user]);
  if(loading){
    return(
      <View>
        <ActivityIndicator/>
      </View>
    )
  }
  return(
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

// ==============// ==============// ==============// ==============// ==============// ==============

export default function App() {
  const[screen,setScreen] = useState('join');
  const[userName,setUserName] = useState('Rob');
  const[SessionID,setSessionID] = useState();

  var cur_view 
  switch (screen) {
    case 'join' :
      cur_view = <View style={styles.container}><Join setScreen={setScreen} setUserName={setUserName} setSessionID={setSessionID} userName={userName} SessionID={SessionID}></Join></View>
      break;
    case 'session' :
      cur_view = <View style={styles.container}><ChatSession setScreen={setScreen} userName={userName} SessionID={SessionID}></ChatSession></View>
      break;
    case 'create' : 
      cur_view = <View style={styles.container}><CreateSession setScreen={setScreen} setSessionID = {setSessionID} userName = {userName} SessionID= {SessionID}></CreateSession></View>
      break;
  }
  
  
  // return (
  //     cur_view
  // );

  return(
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>

  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
