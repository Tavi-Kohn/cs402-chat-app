import React, {useState,useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { ChatBubble } from "./components/ChatBubble";
import {Join} from "./components/Join";
import {CreateSession} from "./components/CreateSession";
import {ChatSession} from "./components/ChatSession";
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

export default function App() {
  const[screen,setScreen] = useState('join');

  var cur_view 
  switch (screen) {
    case 'join' :
      cur_view = <View style={styles.container}><Join setScreen={setScreen}></Join></View>
      break;
    case 'session' :
      cur_view = <View style={styles.container}><ChatSession></ChatSession></View>
      break;
    case 'create' : 
      cur_view = <View style={styles.container}><CreateSession></CreateSession></View>
      break;
  }
  
  
  return (
      cur_view
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
